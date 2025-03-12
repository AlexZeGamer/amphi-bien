import type {
  ImageRelationResolvers,
  MutationResolvers,
  QueryResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import {
  countAmphiImages,
  deleteImage as deleteImageFromStorage,
  generateSignedUrl as gcpGenerateSignedUrl,
  getCroppedImageUrl,
} from 'src/lib/storage'

export const images: QueryResolvers['images'] = () => {
  return db.image.findMany()
}

export const image: QueryResolvers['image'] = ({ id }) => {
  return db.image.findUnique({
    where: { id },
  })
}

export const imagesByAmphiId: QueryResolvers['imagesByAmphiId'] = ({
  amphiId,
}) => {
  return db.image.findMany({
    where: { amphiId },
  })
}

export const createImage: MutationResolvers['createImage'] = ({ input }) => {
  return db.image.create({
    data: input,
  })
}

export const createImagesForAmphi = async ({ images, amphiId }) => {
  // Bulk create all images
  const createdImages = await Promise.all(
    images.map((image) =>
      db.image.create({
        data: {
          title: image.title,
          url: image.url,
          amphiId,
        },
      })
    )
  )

  return createdImages
}

export const updateImage: MutationResolvers['updateImage'] = ({
  id,
  input,
}) => {
  return db.image.update({
    data: input,
    where: { id },
  })
}

export const deleteImage: MutationResolvers['deleteImage'] = async ({ id }) => {
  // Get the image data first to get the URL for GCP deletion
  const image = await db.image.findUnique({
    where: { id },
  })

  if (image?.url) {
    // Delete from GCP buckets
    await deleteImageFromStorage(image.url)
  }

  // Delete from database
  return db.image.delete({
    where: { id },
  })
}

// New mutation resolvers for GCP storage

export const generateSignedUrl: MutationResolvers['generateSignedUrl'] =
  async ({ amphiId }) => {
    // Check if amphi exists
    const amphi = await db.amphi.findUnique({
      where: { id: amphiId },
    })

    if (!amphi) {
      throw new Error(`Amphi with ID ${amphiId} not found`)
    }

    // Check if the amphi already has the maximum number of images (10)
    const imageCount = await countAmphiImages(amphiId)
    if (imageCount >= 10) {
      throw new Error('Maximum number of images (10) reached for this amphi')
    }

    // Generate and return signed URL
    return gcpGenerateSignedUrl(amphiId)
  }

export const registerUploadedImage: MutationResolvers['registerUploadedImage'] =
  async ({ filename, title, amphiId }) => {
    // Get the URL for the cropped image from the cropped bucket
    const url = getCroppedImageUrl(filename)

    // Create a database record for the image
    return db.image.create({
      data: {
        title,
        url,
        amphiId,
      },
    })
  }

export const Image: ImageRelationResolvers = {
  Amphi: (_obj, { root }) => {
    return db.image.findUnique({ where: { id: root?.id } }).Amphi()
  },
}
