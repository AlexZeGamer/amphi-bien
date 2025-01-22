import type { FindSchools, FindSchoolsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Schools from 'src/components/School/Schools'

export const QUERY: TypedDocumentNode<FindSchools, FindSchoolsVariables> = gql`
  query FindSchools {
    schools {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No schools yet.{' '}
      <Link to={routes.newSchool()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindSchools>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  schools,
}: CellSuccessProps<FindSchools, FindSchoolsVariables>) => {
  return <Schools schools={schools} />
}
