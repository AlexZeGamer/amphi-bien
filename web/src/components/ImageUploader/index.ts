import { gql } from '@redwoodjs/web'

export const GENERATE_SIGNED_URL = gql`
  mutation GenerateSignedUrlMutation($amphiId: Int!) {
    generateSignedUrl(amphiId: $amphiId) {
      url
      filename
    }
  }
`

export const REGISTER_UPLOADED_IMAGE = gql`
  mutation RegisterUploadedImageMutation(
    $filename: String!
    $title: String!
    $amphiId: Int!
  ) {
    registerUploadedImage(
      filename: $filename
      title: $title
      amphiId: $amphiId
    ) {
      id
      title
      url
    }
  }
`
