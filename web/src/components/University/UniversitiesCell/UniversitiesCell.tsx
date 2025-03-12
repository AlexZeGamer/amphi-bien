import type { FindUniversities, FindUniversitiesVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Universities from 'src/components/University/Universities'

export const QUERY: TypedDocumentNode<
  FindUniversities,
  FindUniversitiesVariables
> = gql`
  query FindUniversities {
    universities {
      id
      name
    }
  }
`

export const Loading = () => <div>Chargement...</div>

export const Empty = () => {
  return (
    <div className="text-center">
      Pas encore d&apos;universités.{' '}
      <Link to={routes.newUniversity()} className="btn btn-link">
        En créer une ?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindUniversities>) => (
  <div className="alert alert-danger">{error?.message}</div>
)

export const Success = ({
  universities,
}: CellSuccessProps<FindUniversities, FindUniversitiesVariables>) => {
  return <Universities universities={universities} />
}
