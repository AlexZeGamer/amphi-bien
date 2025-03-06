import type { FindImageById, FindImageByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Image from 'src/components/Image/Image'

export const QUERY: TypedDocumentNode<FindImageById, FindImageByIdVariables> =
  gql`
    query FindImageById($id: Int!) {
      image: image(id: $id) {
        id
        title
        url
        amphiId
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Image not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindImageByIdVariables>) => (
  <div className="alert alert-danger">{error?.message}</div>
)

export const Success = ({
  image,
}: CellSuccessProps<FindImageById, FindImageByIdVariables>) => {
  return <Image image={image} />
}
