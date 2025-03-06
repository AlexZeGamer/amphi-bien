import { useEffect, useState } from 'react'

import { PickerOverlay } from 'filestack-react'
import { LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import type { EditAmphiById, UpdateAmphiInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import { useQuery } from '@redwoodjs/web'

import 'leaflet/dist/leaflet.css'

type FormAmphi = NonNullable<EditAmphiById['amphi']>

interface AmphiFormProps {
  amphi?: EditAmphiById['amphi']
  onSave: (data: UpdateAmphiInput, id?: FormAmphi['id']) => void
  error: RWGqlError
  loading: boolean
}

const UNIVERSITIES_QUERY = gql`
  query UniversitiesQuery {
    universities {
      id
      name
    }
  }
`

// Your Filestack API key - should be stored in environment variable
const FILESTACK_API_KEY =
  process.env.REDWOOD_ENV_FILESTACK_API_KEY || 'YOUR_API_KEY'
console.log('FILESTACK_API_KEY:', FILESTACK_API_KEY)
const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng])
    },
  })

  return position ? <Marker position={position} /> : null
}

const AmphiForm = (props: AmphiFormProps) => {
  // Default location (use amphi's location or Paris as fallback)
  const defaultLat = props.amphi?.lat || 48.8566
  const defaultLon = props.amphi?.lon || 2.3522

  const [position, setPosition] = useState<LatLngTuple>([
    defaultLat,
    defaultLon,
  ])
  const [uploadedImages, setUploadedImages] = useState<
    Array<{ url: string; handle: string; filename: string }>
  >([])
  const [existingImages, setExistingImages] = useState<any[]>([])
  const [isPickerOverlayOpen, setIsPickerOverlayOpen] = useState<boolean>(false)

  const { data: universitiesData } = useQuery(UNIVERSITIES_QUERY)

  useEffect(() => {
    // If there's an amphi being edited, use images from props
    if (props.amphi?.images?.length) {
      setExistingImages(props.amphi.images)
    }
  }, [props.amphi?.images])

  const handleFilestackSuccess = (result) => {
    // Process filestack result
    const filesUploaded = result.filesUploaded.map((file) => ({
      url: file.url,
      handle: file.handle,
      filename: file.filename,
    }))

    setUploadedImages((prev) => [...prev, ...filesUploaded])
    setIsPickerOverlayOpen(false)
  }

  const removeUploadedImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  const removeExistingImage = (id: number) => {
    // This would typically make an API call to delete the image
    setExistingImages(existingImages.filter((img) => img.id !== id))
  }
  const onSubmit = (data: FormAmphi) => {
    // Update the lat and lon with the values from the map
    const updatedData = {
      ...data,
      // Convert universityId string to integer
      universityId: parseInt(data.universityId.toString()),
      lat: position[0],
      lon: position[1],
      // Add image data to the submission
      images: uploadedImages.map((img) => ({
        title: img.filename,
        url: img.url,
      })),
    }

    // Save amphi data along with image references
    props.onSave(updatedData, props?.amphi?.id)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Form<FormAmphi>
        onSubmit={onSubmit}
        error={props.error}
        className="space-y-6"
      >
        <FormError
          error={props.error}
          wrapperClassName="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          titleClassName="font-bold"
          listClassName="list-disc ml-4"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Basic Info Section */}
          <div className="space-y-4">
            <h3 className="border-b pb-2 text-lg font-medium">
              Basic Information
            </h3>

            <div>
              <Label
                name="name"
                className="block text-sm font-medium text-gray-700"
                errorClassName="block text-sm font-medium text-red-700"
              >
                Name
              </Label>
              <TextField
                name="name"
                defaultValue={props.amphi?.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                errorClassName="mt-1 block w-full rounded-md border-red-300 text-red-900 shadow-sm focus:border-red-500 focus:ring-red-500"
                validation={{ required: true }}
              />
              <FieldError name="name" className="mt-1 text-sm text-red-600" />
            </div>

            <div>
              <Label
                name="seats"
                className="block text-sm font-medium text-gray-700"
                errorClassName="block text-sm font-medium text-red-700"
              >
                Seats
              </Label>
              <NumberField
                name="seats"
                defaultValue={props.amphi?.seats}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                errorClassName="mt-1 block w-full rounded-md border-red-300 text-red-900 shadow-sm focus:border-red-500 focus:ring-red-500"
                validation={{ required: true }}
              />
              <FieldError name="seats" className="mt-1 text-sm text-red-600" />
            </div>

            <div>
              <Label
                name="description"
                className="block text-sm font-medium text-gray-700"
                errorClassName="block text-sm font-medium text-red-700"
              >
                Description
              </Label>
              <TextField
                name="description"
                defaultValue={props.amphi?.description}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                errorClassName="mt-1 block w-full rounded-md border-red-300 text-red-900 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
              <FieldError
                name="description"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <Label
                name="universityId"
                className="block text-sm font-medium text-gray-700"
                errorClassName="block text-sm font-medium text-red-700"
              >
                University
              </Label>
              <SelectField
                name="universityId"
                defaultValue={props.amphi?.universityId?.toString()}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                errorClassName="mt-1 block w-full rounded-md border-red-300 text-red-900 shadow-sm focus:border-red-500 focus:ring-red-500"
                validation={{ required: true }}
              >
                <option value="">Select a university</option>
                {universitiesData?.universities?.map((uni) => (
                  <option key={+uni.id} value={+uni.id}>
                    {uni.name}
                  </option>
                ))}
              </SelectField>
              <FieldError
                name="universityId"
                className="mt-1 text-sm text-red-600"
              />
            </div>
          </div>

          {/* Location Section */}
          <div className="space-y-4">
            <h3 className="border-b pb-2 text-lg font-medium">Location</h3>
            <p className="text-sm text-gray-500">
              Click on the map to set the amphitheater location
            </p>

            <div className="h-[300px] w-full overflow-hidden rounded-md border border-gray-300 shadow-md">
              <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={position} setPosition={setPosition} />
              </MapContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  name="lat"
                  className="block text-sm font-medium text-gray-700"
                  errorClassName="block text-sm font-medium text-red-700"
                >
                  Latitude
                </Label>
                <NumberField
                  name="lat"
                  value={position[0]}
                  onChange={(e) =>
                    setPosition([parseFloat(e.target.value), position[1]])
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  errorClassName="mt-1 block w-full rounded-md border-red-300 text-red-900 shadow-sm focus:border-red-500 focus:ring-red-500"
                  validation={{ required: true }}
                  step="any"
                />
                <FieldError name="lat" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <Label
                  name="lon"
                  className="block text-sm font-medium text-gray-700"
                  errorClassName="block text-sm font-medium text-red-700"
                >
                  Longitude
                </Label>
                <NumberField
                  name="lon"
                  value={position[1]}
                  onChange={(e) =>
                    setPosition([position[0], parseFloat(e.target.value)])
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  errorClassName="mt-1 block w-full rounded-md border-red-300 text-red-900 shadow-sm focus:border-red-500 focus:ring-red-500"
                  validation={{ required: true }}
                  step="any"
                />
                <FieldError name="lon" className="mt-1 text-sm text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="space-y-4">
          <h3 className="border-b pb-2 text-lg font-medium">Images</h3>

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-700">
                Current Images
              </h4>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {existingImages.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="h-32 w-full rounded-md object-cover shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(image.id)}
                      className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white hover:bg-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filestack Uploaded Images */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-700">
              Add New Images
            </h4>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt={image.filename}
                    className="h-32 w-full rounded-md object-cover shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeUploadedImage(index)}
                    className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white hover:bg-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setIsPickerOverlayOpen(true)}
                className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 hover:border-blue-500"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="mt-2 text-sm text-gray-500">Add images</span>
                </div>
              </button>
            </div>

            {isPickerOverlayOpen && (
              <PickerOverlay
                apikey={FILESTACK_API_KEY}
                onSuccess={handleFilestackSuccess}
                onError={(error) => console.error('Filestack error:', error)}
                onUploadDone={() => setIsPickerOverlayOpen(false)}
                pickerOptions={{
                  maxFiles: 10,
                  accept: ['image/*'],
                }}
              />
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <Submit
            disabled={props.loading}
            className="ml-3 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {props.amphi ? 'Update Amphi' : 'Create Amphi'}
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default AmphiForm
