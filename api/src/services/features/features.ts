import type {
  QueryResolvers,
  MutationResolvers,
  FeatureRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const features: QueryResolvers['features'] = () => {
  return db.feature.findMany()
}

export const feature: QueryResolvers['feature'] = ({ id }) => {
  return db.feature.findUnique({
    where: { id },
  })
}

export const createFeature: MutationResolvers['createFeature'] = ({
  input,
}) => {
  return db.feature.create({
    data: input,
  })
}

export const updateFeature: MutationResolvers['updateFeature'] = ({
  id,
  input,
}) => {
  return db.feature.update({
    data: input,
    where: { id },
  })
}

export const deleteFeature: MutationResolvers['deleteFeature'] = ({ id }) => {
  return db.feature.delete({
    where: { id },
  })
}

export const Feature: FeatureRelationResolvers = {
  amphis: (_obj, { root }) => {
    return db.feature.findUnique({ where: { id: root?.id } }).amphis()
  },
}
