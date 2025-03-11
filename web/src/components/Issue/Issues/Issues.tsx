import type { IssueSeverity, IssuesQuery } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import IssueForm from 'src/components/Issue/IssueForm'

const UPVOTE_ISSUE = gql`
  mutation UpvoteIssueMutation($id: Int!) {
    upvoteIssue(id: $id) {
      id
      upvotes
    }
  }
`

const UPDATE_ISSUE = gql`
  mutation UpdateIssueMutation($id: Int!, $input: UpdateIssueInput!) {
    updateIssue(id: $id, input: $input) {
      id
      isFixed
    }
  }
`

const getSeverityIcon = (severity: IssueSeverity) => {
  switch (severity) {
    case 'DANGER':
      return 'bi-exclamation-triangle-fill text-danger'
    case 'PROBLEM':
      return 'bi-exclamation-circle-fill text-warning'
    case 'NOTE':
      return 'bi-info-circle-fill text-info'
  }
}

const getSeverityBorder = (severity: IssueSeverity) => {
  switch (severity) {
    case 'DANGER':
      return 'border-2 border-danger'
    case 'PROBLEM':
      return 'border-2 border-warning'
    case 'NOTE':
      return 'border-2 border-info'
  }
}

interface IssuesProps {
  issues: IssuesQuery['issues']
  amphiId: number
  onNew: () => void
}

const Issues = ({ issues, amphiId, onNew }: IssuesProps) => {
  const { isAuthenticated } = useAuth()
  const [upvoteIssue] = useMutation(UPVOTE_ISSUE)
  const [updateIssue] = useMutation(UPDATE_ISSUE)

  const handleUpvote = (id: number) => {
    if (!isAuthenticated) {
      toast.error('Vous devez être connecté pour voter')
      return
    }
    upvoteIssue({ variables: { id } })
  }

  const handleToggleFixed = (id: number, currentFixed: boolean) => {
    updateIssue({
      variables: {
        id,
        input: { isFixed: !currentFixed },
      },
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Problèmes signalés</h3>
      </div>
      <IssueForm amphiId={amphiId} onComplete={onNew} />

      <div className="space-y-3">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className={`bg-base-200 rounded-lg p-3 ${issue.isFixed ? 'opacity-50' : ''} ${getSeverityBorder(issue.severity)}`}
          >
            <div className="flex items-start gap-3">
              <i
                className={`bi ${getSeverityIcon(issue.severity)} text-xl`}
              ></i>
              <div className="flex-grow">
                <p className="mb-2">{issue.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600">
                    {new Date(issue.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleUpvote(issue.id)}
                    className="btn btn-ghost btn-xs gap-1"
                    disabled={!isAuthenticated}
                  >
                    <i className="bi bi-hand-thumbs-up"></i>
                    {issue.upvotes}
                  </button>
                  {isAuthenticated && (
                    <button
                      onClick={() => handleToggleFixed(issue.id, issue.isFixed)}
                      className="btn btn-ghost btn-xs gap-1"
                    >
                      <i
                        className={`bi ${
                          issue.isFixed
                            ? 'bi-check-circle-fill text-success'
                            : 'bi-circle'
                        }`}
                      ></i>
                      {issue.isFixed ? 'Résolu' : 'Marquer comme résolu'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Issues
