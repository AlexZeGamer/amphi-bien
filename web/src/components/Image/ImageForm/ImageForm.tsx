import { useState } from 'react'

import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  TextField,
} from '@redwoodjs/forms'

import ImageUploader from 'src/components/ImageUploader/ImageUploader'

const ImageForm = (props) => {
  const [imageUrl, setImageUrl] = useState(props.image?.url || '')
  const [imageId, setImageId] = useState(props.image?.id || null)

  const onSubmit = (data) => {
    const input = {
      ...data,
      url: imageUrl, // Use the URL from our uploaded image
    }
    props.onSave(input, props?.image?.id)
  }

  const handleUploadComplete = (uploadedImage) => {
    setImageUrl(uploadedImage.url)
    setImageId(uploadedImage.id)
  }

  const handleUploadError = (error) => {
    console.error('Image upload failed:', error)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>
        <TextField
          name="title"
          defaultValue={props.image?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="title" className="rw-field-error" />

        <div className="mt-6">
          <Label
            name="image"
            className="rw-label mb-2"
            errorClassName="rw-label rw-label-error"
          >
            Image
          </Label>

          {/* Display current image if available */}
          {(imageUrl || props.image?.url) && (
            <div className="mb-4">
              <p className="mb-2 text-sm text-gray-600">Current image:</p>
              <img
                src={imageUrl || props.image?.url}
                alt="Current"
                className="h-48 w-auto rounded border border-gray-300 object-contain"
              />
            </div>
          )}

          <p className="mb-2 text-sm text-gray-600">Upload new image:</p>
          <ImageUploader
            amphiId={props.image?.amphiId || 1} // Default to 1 if no amphiId available
            onUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            maxFiles={1}
          />

          {/* Hidden field to validate that we have an image */}
          <input
            type="hidden"
            name="url"
            value={imageUrl}
            required
            aria-hidden="true"
          />
        </div>

        <div className="rw-button-group mt-8">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ImageForm
