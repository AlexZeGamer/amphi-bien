import { Storage } from '@google-cloud/storage'
import { v4 as uuidv4 } from 'uuid'

if (!process.env.GCP_PROJECT_ID) {
  console.error('GCP_PROJECT_ID environment variable not set')
}
if (!process.env.GCP_SERVICE_ACCOUNT_KEY_FILE) {
  console.error('GCP_SERVICE_ACCOUNT_KEY_FILE environment variable not set')
}

// Initialize storage
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_SERVICE_ACCOUNT_KEY_FILE,
})

// Get bucket names from environment variables
const SOURCE_BUCKET_NAME = process.env.GCP_SOURCE_BUCKET || ''
const CROPPED_BUCKET_NAME = process.env.GCP_CROPPED_BUCKET || ''

// Get source and cropped buckets
const sourceBucket = storage.bucket(SOURCE_BUCKET_NAME)
const croppedBucket = storage.bucket(CROPPED_BUCKET_NAME)

if (!SOURCE_BUCKET_NAME || !CROPPED_BUCKET_NAME) {
  console.error('GCP bucket names not set in environment variables')
}

/**
 * Generate a signed URL for uploading an image
 * @param amphiId - The ID of the amphi
 * @returns Object containing the signed URL and the filename
 */
export const generateSignedUrl = async (
  amphiId: number
): Promise<{ url: string; filename: string }> => {
  const filename = `amphi-${amphiId}-${uuidv4()}`

  const [url] = await sourceBucket.file(filename).getSignedUrl({
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: 'application/octet-stream',
  })

  return { url, filename }
}

/**
 * Get the URL of a cropped image
 * @param filename - The filename of the image
 * @returns The URL of the cropped image
 */
export const getCroppedImageUrl = (filename: string): string => {
  return `https://storage.googleapis.com/${CROPPED_BUCKET_NAME}/${filename}.png`
}

/**
 * Count the number of images for an amphi
 * @param amphiId - The ID of the amphi
 * @returns The number of images
 */
export const countAmphiImages = async (amphiId: number): Promise<number> => {
  const [files] = await sourceBucket.getFiles({
    prefix: `amphi-${amphiId}-`,
  })

  return files.length
}

/**
 * Delete an image from both source and cropped buckets
 * @param url - The URL of the image
 * @returns Promise resolving to true if deletion was successful
 */
export const deleteImage = async (url: string): Promise<boolean> => {
  try {
    // Extract the filename from the URL
    const urlParts = url.split('/')
    const filename = urlParts[urlParts.length - 1]

    // Delete from both buckets
    await Promise.all([
      sourceBucket
        .file(filename)
        .delete()
        .catch(() => {}), // Ignore error if not found
      croppedBucket
        .file(filename)
        .delete()
        .catch(() => {}), // Ignore error if not found
    ])

    return true
  } catch (error) {
    console.error('Failed to delete image from bucket:', error)
    return false
  }
}

/**
 * Extract the filename from a GCP storage URL
 * @param url - The URL of the image
 * @returns The filename
 */
export const getFilenameFromUrl = (url: string): string => {
  const urlParts = url.split('/')
  return urlParts[urlParts.length - 1]
}
