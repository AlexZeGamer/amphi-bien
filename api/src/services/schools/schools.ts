import type {
  QueryResolvers,
  MutationResolvers,
  UniversityRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const universitys: QueryResolvers['universitys'] = () => {
  return db.university.findMany()
}

export const university: QueryResolvers['university'] = ({ id }) => {
  return db.university.findUnique({
    where: { id },
  })
}

export const createUniversity: MutationResolvers['createUniversity'] = ({ input }) => {
  return db.university.create({
    data: input,
  })
}

export const updateUniversity: MutationResolvers['updateUniversity'] = ({
  id,
  input,
}) => {
  return db.university.update({
    data: input,
    where: { id },
  })
}

export const deleteUniversity: MutationResolvers['deleteUniversity'] = ({ id }) => {
  return db.university.delete({
    where: { id },
  })
}

export const University: UniversityRelationResolvers = {
  Amphi: (_obj, { root }) => {
    return db.university.findUnique({ where: { id: root?.id } }).Amphi()
  },
}
