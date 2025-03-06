import type {
  QueryResolvers,
  MutationResolvers,
  ImageRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const images: QueryResolvers['images'] = () => {
  return db.image.findMany()
}

export const image: QueryResolvers['image'] = ({ id }) => {
  return db.image.findUnique({
    where: { id },
  })
}

export const getImagesByAmphiId = async ({ amphiId }) => {
  return await db.image.findMany({
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

export const deleteImage: MutationResolvers['deleteImage'] = ({ id }) => {
  return db.image.delete({
    where: { id },
  })
}

export const Image: ImageRelationResolvers = {
  Amphi: (_obj, { root }) => {
    return db.image.findUnique({ where: { id: root?.id } }).Amphi()
  },
}
