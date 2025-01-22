import type {
  DeleteAmphiMutation,
  DeleteAmphiMutationVariables,
  FindAmphis,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Amphi/AmphisCell'
import { truncate } from 'src/lib/formatters'

const DELETE_AMPHI_MUTATION: TypedDocumentNode<
  DeleteAmphiMutation,
  DeleteAmphiMutationVariables
> = gql`
  mutation DeleteAmphiMutation($id: Int!) {
    deleteAmphi(id: $id) {
      id
    }
  }
`

const AmphisList = ({ amphis }: FindAmphis) => {
  const [deleteAmphi] = useMutation(DELETE_AMPHI_MUTATION, {
    onCompleted: () => {
      toast.success('Amphi deleted')
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

  const onDeleteClick = (id: DeleteAmphiMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete amphi ' + id + '?')) {
      deleteAmphi({ variables: { id } })
    }
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Lat</th>
            <th>Lon</th>
            <th>Seats</th>
            <th>School id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {amphis.map((amphi) => (
            <tr key={amphi.id}>
              <td className="bg-red-600">{truncate(amphi.id)}</td>
              <td>{truncate(amphi.name)}</td>
              <td>{truncate(amphi.lat)}</td>
              <td>{truncate(amphi.lon)}</td>
              <td>{truncate(amphi.seats)}</td>
              <td>{truncate(amphi.schoolId)}</td>
              <td>
                <nav className="btn-group btn-group-sm">
                  <Link
                    to={routes.amphi({ id: amphi.id })}
                    title={'Show amphi ' + amphi.id + ' detail'}
                    className="btn btn-info"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editAmphi({ id: amphi.id })}
                    title={'Edit amphi ' + amphi.id}
                    className="btn btn-dark"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete amphi ' + amphi.id}
                    className="btn btn-danger"
                    onClick={() => onDeleteClick(amphi.id)}
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

export default AmphisList
