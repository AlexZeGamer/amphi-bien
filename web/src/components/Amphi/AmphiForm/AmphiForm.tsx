import { useEffect, useState } from 'react'

import { LatLngTuple } from 'leaflet'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import type { EditAmphiById, UpdateAmphiInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  FieldError,
  Form,
  FormError,
  Label,
  NumberField,
  SelectField,
  Submit,
  TextField,
} from '@redwoodjs/forms'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ImageUploader from 'src/components/ImageUploader/ImageUploader'

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

const DELETE_IMAGE_MUTATION = gql`
  mutation DeleteImageMutation($id: Int!) {
    deleteImage(id: $id) {
      id
    }
  }
`

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
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
    Array<{ id: number; title: string; url: string }>
  >([])
  const [existingImages, setExistingImages] = useState<any[]>([])

  const { data: universitiesData } = useQuery(UNIVERSITIES_QUERY)

  const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION, {
    onCompleted: () => {
      toast.success('Image deleted')
    },
    onError: (error) => {
      toast.error(`Error deleting image: ${error.message}`)
    },
  })

  useEffect(() => {
    // If there's an amphi being edited, use images from props
    if (props.amphi?.images?.length) {
      setExistingImages(props.amphi.images)
    }
  }, [props.amphi?.images])

  const handleUploadComplete = (image) => {
    setUploadedImages((prev) => [...prev, image])
  }

  const handleUploadError = (error) => {
    console.error('Image upload error:', error.message)
    toast.error(`Upload error: ${error.message}`)
  }

  const removeUploadedImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  const removeExistingImage = (id: number) => {
    deleteImage({
      variables: { id },
    }).then(() => {
      // Only update the UI if the API call was successful
      setExistingImages(existingImages.filter((img) => img.id !== id))
    })
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
      // We don't need to send the images as part of the amphi mutation anymore
      // since they are created separately via the ImageUploader
    }

    // Save amphi data
    props.onSave(updatedData, props?.amphi?.id)
  }

  const amphiId = props.amphi?.id || 0
  const imageCount = uploadedImages.length + existingImages.length
  const maxImagesReached = imageCount >= 10

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
          {/* Section Informations de base */}
          <div className="space-y-4">
            <h3 className="border-b pb-2 text-lg font-medium">
              Informations de base
            </h3>

            <div>
              <Label
                name="name"
                className="block text-sm font-medium text-gray-700"
                errorClassName="block text-sm font-medium text-red-700"
              >
                Nom
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
                Places
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
                Université
              </Label>
              <SelectField
                name="universityId"
                defaultValue={props.amphi?.universityId?.toString()}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                errorClassName="mt-1 block w-full rounded-md border-red-300 text-red-900 shadow-sm focus:border-red-500 focus:ring-red-500"
                validation={{ required: true }}
              >
                <option value="">Sélectionner une université</option>
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

          {/* Section Localisation */}
          <div className="space-y-4">
            <h3 className="border-b pb-2 text-lg font-medium">Localisation</h3>
            <p className="text-sm text-gray-500">
              Cliquez sur la carte pour définir l&apos;emplacement de
              l&apos;amphithéâtre
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

        {/* Section Images */}
        <div className="space-y-4">
          <h3 className="border-b pb-2 text-lg font-medium">Images</h3>

          {/* Images actuelles */}
          {existingImages.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-700">
                Images actuelles ({existingImages.length}/10)
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
                      aria-label="Supprimer l'image"
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

          {/* Nouvelles images */}
          {uploadedImages.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-700">
                Nouvelles images
              </h4>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {uploadedImages.map((image, index) => (
                  <div key={image.id || index} className="relative">
                    <img
                      src={image.url}
                      alt={image.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        let retries = 0
                        const interval = setInterval(() => {
                          if (retries < 20) {
                            target.src = image.url
                            retries++
                          } else {
                            clearInterval(interval)
                          }
                        }, 1000)
                      }}
                      className="h-32 w-full rounded-md object-cover shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeUploadedImage(index)}
                      className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white hover:bg-red-700"
                      aria-label="Supprimer l'image"
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

          {/* Section Ajouter de nouvelles images */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-700">
              Ajouter de nouvelles images ({imageCount}/10)
            </h4>

            {maxImagesReached ? (
              <div className="rounded-md bg-yellow-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Nombre maximum d&apos;images atteint
                    </h3>
                    <p className="mt-2 text-sm text-yellow-700">
                      Vous avez atteint la limite de 10 images par amphithéâtre.
                      Veuillez supprimer des images avant d&apos;en ajouter
                      d&apos;autres.
                    </p>
                  </div>
                </div>
              </div>
            ) : amphiId > 0 ? (
              <ImageUploader
                amphiId={amphiId}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                maxFiles={10 - imageCount}
              />
            ) : (
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Enregistrez d&apos;abord l&apos;amphithéâtre pour activer
                      le téléchargement d&apos;images.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Annuler
          </button>
          <Submit
            disabled={props.loading}
            className="ml-3 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {props.amphi ? 'Mettre à jour' : 'Créer'}
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default AmphiForm
