import type { FindImages, FindImagesVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Images from 'src/components/Image/Images'

export const QUERY: TypedDocumentNode<FindImages, FindImagesVariables> = gql`
  query FindImages {
    images {
      id
      title
      url
      amphiId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="text-center">
      No images yet.{' '}
      <Link to={routes.newImage()} className="btn btn-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindImages>) => (
  <div className="alert alert-danger">{error?.message}</div>
)

export const Success = ({
  images,
}: CellSuccessProps<FindImages, FindImagesVariables>) => {
  return <Images images={images} />
}
