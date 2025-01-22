import type {
  DeleteSchoolMutation,
  DeleteSchoolMutationVariables,
  FindSchoolById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

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

interface Props {
  school: NonNullable<FindSchoolById['school']>
}

const School = ({ school }: Props) => {
  const [deleteSchool] = useMutation(DELETE_SCHOOL_MUTATION, {
    onCompleted: () => {
      toast.success('School deleted')
      navigate(routes.schools())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteSchoolMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete school ' + id + '?')) {
      deleteSchool({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            School {school.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{school.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{school.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSchool({ id: school.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(school.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default School
