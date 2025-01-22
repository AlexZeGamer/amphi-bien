import type {
  CreateAmphiMutation,
  CreateAmphiInput,
  CreateAmphiMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AmphiForm from 'src/components/Amphi/AmphiForm'

const CREATE_AMPHI_MUTATION: TypedDocumentNode<
  CreateAmphiMutation,
  CreateAmphiMutationVariables
> = gql`
  mutation CreateAmphiMutation($input: CreateAmphiInput!) {
    createAmphi(input: $input) {
      id
    }
  }
`

const NewAmphi = () => {
  const [createAmphi, { loading, error }] = useMutation(CREATE_AMPHI_MUTATION, {
    onCompleted: () => {
      toast.success('Amphi created')
      navigate(routes.amphis())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateAmphiInput) => {
    createAmphi({ variables: { input } })
  }

  return (
    <div className="card border-primary mb-3">
      <header className="card-header">
        <h2 className="card-title">New Amphi</h2>
      </header>
      <div className="card-body">
        <AmphiForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewAmphi
