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
  return db.amphi.create({
    data: input,
  })
}

export const updateAmphi: MutationResolvers['updateAmphi'] = ({
  id,
  input,
}) => {
  return db.amphi.update({
    data: input,
    where: { id },
  })
}

export const deleteAmphi: MutationResolvers['deleteAmphi'] = ({ id }) => {
  return db.amphi.delete({
    where: { id },
  })
}

export const Amphi: AmphiRelationResolvers = {
  school: (_obj, { root }) => {
    return db.amphi.findUnique({ where: { id: root?.id } }).school()
  },
}
