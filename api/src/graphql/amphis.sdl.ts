export const schema = gql`
  type Amphi {
    id: Int!
    name: String!
    lat: Float!
    lon: Float!
    seats: Int!
    description: String!
    universityId: Int!
    university: University!
  }

  type Query {
    amphis: [Amphi!]! @requireAuth
    amphi(id: Int!): Amphi @requireAuth
  }

  input CreateAmphiInput {
    name: String!
    lat: Float!
    lon: Float!
    description: String
    seats: Int!
    universityId: Int!
  }

  input UpdateAmphiInput {
    name: String
    lat: Float
    lon: Float
    seats: Int
    description: String
    universityId: Int
  }

  type Mutation {
    createAmphi(input: CreateAmphiInput!): Amphi! @requireAuth
    updateAmphi(id: Int!, input: UpdateAmphiInput!): Amphi! @requireAuth
    deleteAmphi(id: Int!): Amphi! @requireAuth
  }
`
