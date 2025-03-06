export const schema = gql`
  type Feature {
    id: Int!
    name: String!
    value: String
    icon: String!
    amphis: [Amphi]!
  }

  type Query {
    features: [Feature!]! @requireAuth
    feature(id: Int!): Feature @requireAuth
  }

  input ConnectFeatureInput {
    id: Int!
  }

  input CreateFeatureInput {
    name: String!
    value: String
    icon: String!
  }

  input UpdateFeatureInput {
    name: String
    value: String
    icon: String
  }

  type Mutation {
    createFeature(input: CreateFeatureInput!): Feature! @requireAuth
    updateFeature(id: Int!, input: UpdateFeatureInput!): Feature! @requireAuth
    deleteFeature(id: Int!): Feature! @requireAuth
  }
`
