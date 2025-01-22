import type {
  QueryResolvers,
  MutationResolvers,
  SchoolRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const schools: QueryResolvers['schools'] = () => {
  return db.school.findMany()
}

export const school: QueryResolvers['school'] = ({ id }) => {
  return db.school.findUnique({
    where: { id },
  })
}

export const createSchool: MutationResolvers['createSchool'] = ({ input }) => {
  return db.school.create({
    data: input,
  })
}

export const updateSchool: MutationResolvers['updateSchool'] = ({
  id,
  input,
}) => {
  return db.school.update({
    data: input,
    where: { id },
  })
}

export const deleteSchool: MutationResolvers['deleteSchool'] = ({ id }) => {
  return db.school.delete({
    where: { id },
  })
}

export const School: SchoolRelationResolvers = {
  Amphi: (_obj, { root }) => {
    return db.school.findUnique({ where: { id: root?.id } }).Amphi()
  },
}
