import type {
  FindUniversityById,
  FindUniversityByIdVariables,
} from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import University from 'src/components/University/University'

export const QUERY: TypedDocumentNode<
  FindUniversityById,
  FindUniversityByIdVariables
> = gql`
  query FindUniversityById($id: Int!) {
    university: university(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Chargement...</div>

export const Empty = () => <div>Université non trouvée</div>

export const Failure = ({
  error,
}: CellFailureProps<FindUniversityByIdVariables>) => (
  <div className="alert alert-danger">{error?.message}</div>
)

export const Success = ({
  university,
}: CellSuccessProps<FindUniversityById, FindUniversityByIdVariables>) => {
  return <University university={university} />
}
