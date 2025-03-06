import type {
  CreateImageMutation,
  CreateImageInput,
  CreateImageMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ImageForm from 'src/components/Image/ImageForm'

const CREATE_IMAGE_MUTATION: TypedDocumentNode<
  CreateImageMutation,
  CreateImageMutationVariables
> = gql`
  mutation CreateImageMutation($input: CreateImageInput!) {
    createImage(input: $input) {
      id
    }
  }
`

const NewImage = () => {
  const [createImage, { loading, error }] = useMutation(CREATE_IMAGE_MUTATION, {
    onCompleted: () => {
      toast.success('Image created')
      navigate(routes.images())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateImageInput) => {
    createImage({ variables: { input } })
  }

  return (
    <div className="card border-primary mb-3">
      <header className="card-header">
        <h2 className="card-title">New Image</h2>
      </header>
      <div className="card-body">
        <ImageForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewImage
