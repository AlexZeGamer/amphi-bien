export const schema = gql`
  type Image {
    id: Int!
    title: String!
    url: String!
    Amphi: Amphi
    amphiId: Int
  }

  type Query {
    images: [Image!]! @requireAuth
    image(id: Int!): Image @requireAuth
    imagesByAmphiId(amphiId: Int!): [Image!]! @requireAuth
  }

  type SignedUrlResponse {
    url: String!
    filename: String!
  }

  input CreateImageInput {
    title: String!
    url: String!
    amphiId: Int
  }

  input UpdateImageInput {
    title: String
    url: String
    amphiId: Int
  }

  type Mutation {
    createImage(input: CreateImageInput!): Image! @requireAuth
    createImagesForAmphi(
      images: [CreateImageInput!]!
      amphiId: Int!
    ): [Image!]! @requireAuth
    updateImage(id: Int!, input: UpdateImageInput!): Image! @requireAuth
    deleteImage(id: Int!): Image! @requireAuth

    # Generate a signed URL for uploading an image to GCP Storage
    generateSignedUrl(amphiId: Int!): SignedUrlResponse! @requireAuth

    # Register a GCP-uploaded image in the database
    registerUploadedImage(
      filename: String!
      title: String!
      amphiId: Int!
    ): Image! @requireAuth
  }
`
