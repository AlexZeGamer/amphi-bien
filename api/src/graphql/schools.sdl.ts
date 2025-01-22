export const schema = gql`
  type School {
    id: Int!
    name: String!
    Amphi: [Amphi]!
  }

  type Query {
    schools: [School!]! @requireAuth
    school(id: Int!): School @requireAuth
  }

  input CreateSchoolInput {
    name: String!
  }

  input UpdateSchoolInput {
    name: String
  }

  type Mutation {
    createSchool(input: CreateSchoolInput!): School! @requireAuth
    updateSchool(id: Int!, input: UpdateSchoolInput!): School! @requireAuth
    deleteSchool(id: Int!): School! @requireAuth
  }
`
