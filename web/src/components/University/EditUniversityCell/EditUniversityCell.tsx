import type {
  EditUniversityById,
  UpdateUniversityInput,
  UpdateUniversityMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UniversityForm from 'src/components/University/UniversityForm'

export const QUERY: TypedDocumentNode<EditUniversityById> = gql`
  query EditUniversityById($id: Int!) {
    university: university(id: $id) {
      id
      name
    }
  }
`

const UPDATE_UNIVERSITY_MUTATION: TypedDocumentNode<
  EditUniversityById,
  UpdateUniversityMutationVariables
> = gql`
  mutation UpdateUniversityMutation($id: Int!, $input: UpdateUniversityInput!) {
    updateUniversity(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="alert alert-danger">{error?.message}</div>
)

export const Success = ({
  university,
}: CellSuccessProps<EditUniversityById>) => {
  const [updateUniversity, { loading, error }] = useMutation(
    UPDATE_UNIVERSITY_MUTATION,
    {
      onCompleted: () => {
        toast.success('University updated')
        navigate(routes.universities())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateUniversityInput,
    id: EditUniversityById['university']['id']
  ) => {
    updateUniversity({ variables: { id, input } })
  }

  return (
    <div className="card border-primary mb-3">
      <header className="card-header">
        <h2 className="card-title">Edit University {university?.id}</h2>
      </header>
      <div className="card-body">
        <UniversityForm
          university={university}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
