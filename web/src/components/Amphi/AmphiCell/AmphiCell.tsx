import type { FindAmphiById, FindAmphiByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Amphi from 'src/components/Amphi/Amphi'

export const QUERY: TypedDocumentNode<FindAmphiById, FindAmphiByIdVariables> =
  gql`
    query FindAmphiById($id: Int!) {
      amphi: amphi(id: $id) {
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

export const Empty = () => <div>Amphi not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindAmphiByIdVariables>) => (
  <div className="alert alert-danger">{error?.message}</div>
)

export const Success = ({
  amphi,
}: CellSuccessProps<FindAmphiById, FindAmphiByIdVariables>) => {
  return <Amphi amphi={amphi} />
}
