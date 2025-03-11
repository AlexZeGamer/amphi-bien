import { useState } from 'react'

import type { IssueSeverity } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const CREATE_ISSUE = gql`
  mutation CreateIssueMutation($input: CreateIssueInput!) {
    createIssue(input: $input) {
      id
    }
  }
`

interface IssueFormProps {
  amphiId: number
  onComplete?: () => void
}

const IssueForm = ({ amphiId, onComplete }: IssueFormProps) => {
  const { isAuthenticated } = useAuth()

  const [showForm, setShowForm] = useState(false)
  const [newIssue, setNewIssue] = useState({
    severity: 'PROBLEM' as IssueSeverity,
    description: '',
  })

  const [createIssue] = useMutation(CREATE_ISSUE, {
    onCompleted: () => {
      setShowForm(false)
      setNewIssue({ severity: 'PROBLEM', description: '' })
      toast.success('Problème signalé')
      onComplete?.()
    },
  })

  const handleCreateIssue = (e) => {
    e.preventDefault()
    if (!newIssue.description) return

    createIssue({
      variables: {
        input: {
          ...newIssue,
          amphiId,
        },
      },
    })
  }

  if (!isAuthenticated)
    return (
      <div className="text-center text-gray-500">
        <Link to={routes.auth()}>Connectez-vous pour signaler un problème</Link>
      </div>
    )

  return (
    <>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary btn-sm"
        >
          Signaler un problème
        </button>
      )}

      {showForm && (
        <form
          onSubmit={handleCreateIssue}
          className="bg-base-200 rounded-lg p-4"
        >
          <div className="space-y-3">
            <div>
              <label htmlFor="severity" className="form-label">
                Sévérité
              </label>
              <select
                id="severity"
                className="form-select"
                value={newIssue.severity}
                onChange={(e) =>
                  setNewIssue({
                    ...newIssue,
                    severity: e.target.value as IssueSeverity,
                  })
                }
              >
                <option value="DANGER">Danger</option>
                <option value="PROBLEM">Problème</option>
                <option value="NOTE">Note</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                className="form-control"
                value={newIssue.description}
                onChange={(e) =>
                  setNewIssue({ ...newIssue, description: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setShowForm(false)}
              >
                Annuler
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Signaler
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default IssueForm
