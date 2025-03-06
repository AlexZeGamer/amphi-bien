import type {
  EditImageById,
  UpdateImageInput,
  UpdateImageMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ImageForm from 'src/components/Image/ImageForm'

export const QUERY: TypedDocumentNode<EditImageById> = gql`
  query EditImageById($id: Int!) {
    image: image(id: $id) {
      id
      title
      url
      amphiId
    }
  }
`

const UPDATE_IMAGE_MUTATION: TypedDocumentNode<
  EditImageById,
  UpdateImageMutationVariables
> = gql`
  mutation UpdateImageMutation($id: Int!, $input: UpdateImageInput!) {
    updateImage(id: $id, input: $input) {
      id
      title
      url
      amphiId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="alert alert-danger">{error?.message}</div>
)

export const Success = ({ image }: CellSuccessProps<EditImageById>) => {
  const [updateImage, { loading, error }] = useMutation(UPDATE_IMAGE_MUTATION, {
    onCompleted: () => {
      toast.success('Image updated')
      navigate(routes.images())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (
    input: UpdateImageInput,
    id: EditImageById['image']['id']
  ) => {
    updateImage({ variables: { id, input } })
  }

  return (
    <div className="card border-primary mb-3">
      <header className="card-header">
        <h2 className="card-title">Edit Image {image?.id}</h2>
      </header>
      <div className="card-body">
        <ImageForm
          image={image}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
