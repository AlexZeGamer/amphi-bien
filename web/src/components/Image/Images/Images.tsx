import type {
  DeleteImageMutation,
  DeleteImageMutationVariables,
  FindImages,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Image/ImagesCell'
import { truncate } from 'src/lib/formatters'

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

const ImagesList = ({ images }: FindImages) => {
  const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION, {
    onCompleted: () => {
      toast.success('Image deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteImageMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete image ' + id + '?')) {
      deleteImage({ variables: { id } })
    }
  }

  return (
    <div className="table-responsive">
      <table className="table-hover table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Url</th>
            <th>Amphi id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr key={image.id}>
              <td>{truncate(image.id)}</td>
              <td>{truncate(image.title)}</td>
              <td>{truncate(image.url)}</td>
              <td>{truncate(image.amphiId)}</td>
              <td>
                <nav className="btn-group btn-group-sm flex">
                  <Link
                    to={routes.image({ id: image.id })}
                    title={'Show image ' + image.id + ' detail'}
                    className="btn btn-info"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editImage({ id: image.id })}
                    title={'Edit image ' + image.id}
                    className="btn btn-dark"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete image ' + image.id}
                    className="btn btn-danger"
                    onClick={() => onDeleteClick(image.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ImagesList
