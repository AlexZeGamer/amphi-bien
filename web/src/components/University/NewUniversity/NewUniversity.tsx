import type {
  CreateUniversityInput,
  CreateUniversityMutation,
  CreateUniversityMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UniversityForm from 'src/components/University/UniversityForm'

const CREATE_UNIVERSITY_MUTATION: TypedDocumentNode<
  CreateUniversityMutation,
  CreateUniversityMutationVariables
> = gql`
  mutation CreateUniversityMutation($input: CreateUniversityInput!) {
    createUniversity(input: $input) {
      id
    }
  }
`

const NewUniversity = () => {
  const [createUniversity, { loading, error }] = useMutation(
    CREATE_UNIVERSITY_MUTATION,
    {
      onCompleted: () => {
        toast.success('University created')
        navigate(routes.universities())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateUniversityInput) => {
    createUniversity({ variables: { input } })
  }

  return (
    <div className="card border-primary mb-3">
      <header className="card-header">
        <h2 className="card-title">Nouvelle université</h2>
      </header>
      <div className="card-body">
        <UniversityForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewUniversity
