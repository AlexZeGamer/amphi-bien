import { useState } from 'react'

import { useMutation } from '@redwoodjs/web'

import { GENERATE_SIGNED_URL, REGISTER_UPLOADED_IMAGE } from './index'

type ImageUploaderProps = {
  amphiId: number
  onUploadComplete: (image: { id: number; title: string; url: string }) => void
  onUploadError: (error: Error) => void
  maxFiles?: number
}

const ImageUploader = ({
  amphiId,
  onUploadComplete,
  onUploadError,
  maxFiles = 10,
}: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [errors, setErrors] = useState<string[]>([])

  const [generateSignedUrl] = useMutation(GENERATE_SIGNED_URL, {
    onError: (error) => {
      setErrors([...errors, `Failed to generate upload URL: ${error.message}`])
      onUploadError(error)
    },
  })

  const [registerUploadedImage] = useMutation(REGISTER_UPLOADED_IMAGE, {
    onCompleted: (data) => {
      onUploadComplete(data.registerUploadedImage)
    },
    onError: (error) => {
      setErrors([...errors, `Failed to register image: ${error.message}`])
      onUploadError(error)
    },
  })

  const handleFileSelection = async (event) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setIsUploading(true)
      setUploadProgress(0)

      try {
        // 1. Get a signed URL for this file
        const { data } = await generateSignedUrl({
          variables: { amphiId },
        })

        // 2. Upload the file to the signed URL
        const { url, filename } = data.generateSignedUrl

        const xhr = new XMLHttpRequest()
        xhr.open('PUT', url, true)
        xhr.setRequestHeader('Content-Type', 'application/octet-stream')

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100
            setUploadProgress(percentComplete)
          }
        }

        xhr.onload = async () => {
          if (xhr.status === 200) {
            // 3. Register the uploaded image in our database
            await registerUploadedImage({
              variables: {
                filename,
                title: file.name,
                amphiId,
              },
            })
          } else {
            throw new Error(`Upload failed with status: ${xhr.status}`)
          }
        }

        xhr.onerror = () => {
          throw new Error('Upload failed due to network error')
        }

        xhr.send(file)
      } catch (error) {
        setErrors([...errors, `Upload failed: ${error.message}`])
        onUploadError(error)
      } finally {
        setIsUploading(false)
        setUploadProgress(0)
      }
    }

    // Reset the file input
    event.target.value = null
  }

  return (
    <div className="image-uploader">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelection}
        disabled={isUploading}
        multiple
        className="block w-full text-sm text-gray-500
          file:mr-4 file:rounded-full file:border-0
          file:bg-blue-50 file:px-4
          file:py-2 file:text-sm
          file:font-semibold file:text-blue-700
          hover:file:bg-blue-100"
      />

      {isUploading && (
        <div className="mt-2">
          <div className="relative pt-1">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="inline-block rounded-full bg-blue-200 px-2 py-1 text-xs font-semibold uppercase text-blue-600">
                  Envoi...
                </span>
              </div>
              <div className="text-right">
                <span className="inline-block text-xs font-semibold text-blue-600">
                  {Math.round(uploadProgress)}%
                </span>
              </div>
            </div>
            <div className="mb-4 flex h-2 overflow-hidden rounded bg-blue-200 text-xs">
              <div
                style={{ width: `${uploadProgress}%` }}
                className="flex flex-col justify-center whitespace-nowrap bg-blue-500 text-center text-white shadow-none transition-all duration-300"
              ></div>
            </div>
          </div>
        </div>
      )}

      {errors.length > 0 && (
        <div className="mt-2 rounded border border-red-200 bg-red-50 p-2">
          <p className="text-sm font-semibold text-red-700">Errors:</p>
          <ul className="list-disc pl-5">
            {errors.map((error, index) => (
              <li key={index} className="text-xs text-red-600">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ImageUploader
