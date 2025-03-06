export const schema = gql`
  type University {
    id: Int!
    name: String!
    Amphi: [Amphi]!
  }

  type Query {
    universities: [University!]! @requireAuth
    university(id: Int!): University @requireAuth
  }

  input CreateUniversityInput {
    name: String!
  }

  input UpdateUniversityInput {
    name: String
  }

  type Mutation {
    createUniversity(input: CreateUniversityInput!): University! @requireAuth
    updateUniversity(id: Int!, input: UpdateUniversityInput!): University!
      @requireAuth
    deleteUniversity(id: Int!): University! @requireAuth
  }
`
