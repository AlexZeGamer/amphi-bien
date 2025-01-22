import type { FindSchoolById, FindSchoolByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import School from 'src/components/School/School'

export const QUERY: TypedDocumentNode<FindSchoolById, FindSchoolByIdVariables> =
  gql`
    query FindSchoolById($id: Int!) {
      school: school(id: $id) {
        id
        name
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>School not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindSchoolByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  school,
}: CellSuccessProps<FindSchoolById, FindSchoolByIdVariables>) => {
  return <School school={school} />
}
