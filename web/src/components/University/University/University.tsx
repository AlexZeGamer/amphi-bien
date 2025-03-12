import type {
  DeleteUniversityMutation,
  DeleteUniversityMutationVariables,
  FindUniversityById,
} from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { } from 'src/lib/formatters'

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

interface Props {
  university: NonNullable<FindUniversityById['university']>
}

const University = ({ university }: Props) => {
  const [deleteUniversity] = useMutation(DELETE_UNIVERSITY_MUTATION, {
    onCompleted: () => {
      toast.success('University deleted')
      navigate(routes.universities())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteUniversityMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete university ' + id + '?')) {
      deleteUniversity({ variables: { id } })
    }
  }

  return (
    <>
      <div className="card border-primary mb-3">
        <header className="card-header">
          <h2 className="card-title">
            Détail de l&apos;université {university.name}
          </h2>
        </header>
        <table className="table-hover table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{university.id}</td>
            </tr>
            <tr>
              <th>Nom</th>
              <td>{university.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="btn-group">
        <Link
          to={routes.editUniversity({ id: university.id })}
          className="btn btn-primary"
        >
          Modifier
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDeleteClick(university.id)}
        >
          Supprimer
        </button>
      </nav>
    </>
  )
}

export default University
