import type {
  DeleteImageMutation,
  DeleteImageMutationVariables,
  FindImageById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

const DELETE_IMAGE_MUTATION: TypedDocumentNode<
  DeleteImageMutation,
  DeleteImageMutationVariables
> = gql`
  mutation DeleteImageMutation($id: Int!) {
    deleteImage(id: $id) {
      id
    }
  }
`

interface Props {
  image: NonNullable<FindImageById['image']>
}

const Image = ({ image }: Props) => {
  const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION, {
    onCompleted: () => {
      toast.success('Image deleted')
      navigate(routes.images())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteImageMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete image ' + id + '?')) {
      deleteImage({ variables: { id } })
    }
  }

  return (
    <>
      <div className="card border-primary mb-3">
        <header className="card-header">
          <h2 className="card-title">Image {image.id} Detail</h2>
        </header>
        <table className="table-hover table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{image.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{image.title}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{image.url}</td>
            </tr>
            <tr>
              <th>Amphi id</th>
              <td>{image.amphiId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="btn-group">
        <Link
          to={routes.editImage({ id: image.id })}
          className="btn btn-primary"
        >
          Edit
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDeleteClick(image.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Image
