import type {
  DeleteSchoolMutation,
  DeleteSchoolMutationVariables,
  FindSchools,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/School/SchoolsCell'
import { truncate } from 'src/lib/formatters'

const DELETE_SCHOOL_MUTATION: TypedDocumentNode<
  DeleteSchoolMutation,
  DeleteSchoolMutationVariables
> = gql`
  mutation DeleteSchoolMutation($id: Int!) {
    deleteSchool(id: $id) {
      id
    }
  }
`

const SchoolsList = ({ schools }: FindSchools) => {
  const [deleteSchool] = useMutation(DELETE_SCHOOL_MUTATION, {
    onCompleted: () => {
      toast.success('School deleted')
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

  const onDeleteClick = (id: DeleteSchoolMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete school ' + id + '?')) {
      deleteSchool({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school.id}>
              <td>{truncate(school.id)}</td>
              <td>{truncate(school.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.school({ id: school.id })}
                    title={'Show school ' + school.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSchool({ id: school.id })}
                    title={'Edit school ' + school.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete school ' + school.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(school.id)}
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

export default SchoolsList
