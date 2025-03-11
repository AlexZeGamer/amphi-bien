import type { IssuesQuery, IssuesQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Issues from 'src/components/Issue/Issues'

import IssueForm from '../IssueForm/IssueForm'

export const QUERY: TypedDocumentNode<IssuesQuery, IssuesQueryVariables> = gql`
  query IssuesQuery($amphiId: Int!) {
    issues(amphiId: $amphiId) {
      id
      severity
      description
      upvotes
      isFixed
      createdAt
      amphiId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = ({ amphiId }: { amphiId: number }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Problèmes signalés</h3>
      </div>
      <IssueForm amphiId={amphiId} />

      <div className="text-center text-gray-500">Aucun problème signalé</div>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="alert alert-danger">Error: {error?.message}</div>
)

export const Success = ({
  issues,
  amphiId,
  queryResult,
}: CellSuccessProps<IssuesQuery> & { amphiId: number }) => {
  return (
    <Issues
      issues={issues}
      amphiId={amphiId}
      onNew={() => queryResult.refetch()}
    />
  )
}
