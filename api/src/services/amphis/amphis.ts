import type {
  QueryResolvers,
  MutationResolvers,
  AmphiRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const amphis: QueryResolvers['amphis'] = () => {
  return db.amphi.findMany()
}

export const amphi: QueryResolvers['amphi'] = ({ id }) => {
  return db.amphi.findUnique({
    where: { id },
  })
}

export const createAmphi: MutationResolvers['createAmphi'] = ({ input }) => {
  const { images, ...rest } = input
  return db.amphi.create({
    data: {
      ...rest,
      images: {
        create: images,
      },
    },
  })
}

export const updateAmphi: MutationResolvers['updateAmphi'] = ({
  id,
  input,
}) => {
  const { images, ...rest } = input
  return db.amphi.update({
    data: {
      ...rest,
      images: {
        create: images,
      },
    },
    where: { id },
  })
}

export const deleteAmphi: MutationResolvers['deleteAmphi'] = ({ id }) => {
  return db.amphi.delete({
    where: { id },
  })
}

export const Amphi: AmphiRelationResolvers = {
  university: (_obj, { root }) => {
    return db.amphi.findUnique({ where: { id: root?.id } }).university()
  },
  images: (_obj, { root }) => {
    return db.amphi.findUnique({ where: { id: root?.id } }).images()
  },
  features: (_obj, { root }) => {
    return db.amphi.findUnique({ where: { id: root?.id } }).features()
  },
}
