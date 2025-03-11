export const schema = gql`
  enum IssueSeverity {
    DANGER
    PROBLEM
    NOTE
  }

  type Issue {
    id: Int!
    severity: IssueSeverity!
    description: String!
    upvotes: Int!
    isFixed: Boolean!
    createdAt: DateTime!
    amphi: Amphi!
    amphiId: Int!
  }

  type Query {
    issues(amphiId: Int!): [Issue!]! @skipAuth
    issue(id: Int!): Issue @skipAuth
  }

  input CreateIssueInput {
    severity: IssueSeverity!
    description: String!
    amphiId: Int!
  }

  input UpdateIssueInput {
    severity: IssueSeverity
    description: String
    isFixed: Boolean
  }

  type Mutation {
    createIssue(input: CreateIssueInput!): Issue! @requireAuth
    updateIssue(id: Int!, input: UpdateIssueInput!): Issue! @requireAuth
    deleteIssue(id: Int!): Issue! @requireAuth
    upvoteIssue(id: Int!): Issue! @requireAuth
  }
`
