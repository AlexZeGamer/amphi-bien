import type {
  DeleteAmphiMutation,
  DeleteAmphiMutationVariables,
  FindAmphis,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
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

const ListeAmphis = ({ amphis }: FindAmphis) => {
  const [supprimerAmphi] = useMutation(DELETE_AMPHI_MUTATION, {
    onCompleted: () => {
      toast.success('Amphi supprimé')
    },
    onError: (erreur) => {
      toast.error(erreur.message)
    },
    // Cette opération relance la requête sur la page de liste. En savoir plus sur d'autres façons de
    // mettre à jour le cache ici :
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onSupprimerClique = (id: DeleteAmphiMutationVariables['id']) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer l'amphi " + id + ' ?')) {
      supprimerAmphi({ variables: { id } })
    }
  }

  return (
    <div className="table-responsive">
      <table className="table-hover table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Places</th>
            <th>Université</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {amphis.map((amphi) => (
            <tr key={amphi.id}>
              <td className="bg-red-600">{truncate(amphi.id)}</td>
              <td>{truncate(amphi.name)}</td>
              <td>{truncate(amphi.seats)}</td>
              <td>{truncate(amphi.university.name)}</td>
              <td>
                <nav className="btn-group btn-group-sm">
                  <Link
                    to={routes.amphi({ id: amphi.id })}
                    title={"Afficher les détails de l'amphi " + amphi.id}
                    className="btn btn-info"
                  >
                    Afficher
                  </Link>
                  <Link
                    to={routes.editAmphi({ id: amphi.id })}
                    title={"Modifier l'amphi " + amphi.id}
                    className="btn btn-dark"
                  >
                    Modifier
                  </Link>
                  <button
                    type="button"
                    title={"Supprimer l'amphi " + amphi.id}
                    className="btn btn-danger"
                    onClick={() => onSupprimerClique(amphi.id)}
                  >
                    Supprimer
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

export default ListeAmphis
