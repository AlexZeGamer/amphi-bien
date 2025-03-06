import type {
  DeleteUniversityMutation,
  DeleteUniversityMutationVariables,
  FindUniversities,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/University/UniversitiesCell'
import { truncate } from 'src/lib/formatters'

const DELETE_UNIVERSITY_MUTATION: TypedDocumentNode<
  DeleteUniversityMutation,
  DeleteUniversityMutationVariables
> = gql`
  mutation DeleteUniversityMutation($id: Int!) {
    deleteUniversity(id: $id) {
      id
    }
  }
`

const UniversitiesList = ({ universities }: FindUniversities) => {
  const [deleteUniversity] = useMutation(DELETE_UNIVERSITY_MUTATION, {
    onCompleted: () => {
      toast.success('University deleted')
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

  const onDeleteClick = (id: DeleteUniversityMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete university ' + id + '?')) {
      deleteUniversity({ variables: { id } })
    }
  }

  return (
    <div className="table-responsive">
      <table className="table-hover table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((university) => (
            <tr key={university.id}>
              <td>{truncate(university.id)}</td>
              <td>{truncate(university.name)}</td>
              <td>
                <nav className="btn-group btn-group-sm flex">
                  <Link
                    to={routes.university({ id: university.id })}
                    title={'Show university ' + university.id + ' detail'}
                    className="btn btn-info"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUniversity({ id: university.id })}
                    title={'Edit university ' + university.id}
                    className="btn btn-dark"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete university ' + university.id}
                    className="btn btn-danger"
                    onClick={() => onDeleteClick(university.id)}
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

export default UniversitiesList
