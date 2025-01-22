import type { FindAmphis, FindAmphisVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Amphis from 'src/components/Amphi/Amphis'

export const QUERY: TypedDocumentNode<FindAmphis, FindAmphisVariables> = gql`
  query FindAmphis {
    amphis {
      id
      name
      lat
      lon
      seats
      schoolId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="text-center">
      No amphis yet.{' '}
      <Link to={routes.newAmphi()} className="btn btn-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindAmphis>) => (
  <div className="alert alert-danger">{error?.message}</div>
)

export const Success = ({
  amphis,
}: CellSuccessProps<FindAmphis, FindAmphisVariables>) => {
  return <Amphis amphis={amphis} />
}
