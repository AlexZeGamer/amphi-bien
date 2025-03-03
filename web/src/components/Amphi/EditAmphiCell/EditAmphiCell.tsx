import type {
  EditAmphiById,
  UpdateAmphiInput,
  UpdateAmphiMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AmphiForm from 'src/components/Amphi/AmphiForm'

export const QUERY: TypedDocumentNode<EditAmphiById> = gql`
  query EditAmphiById($id: Int!) {
    amphi: amphi(id: $id) {
      id
      name
      lat
      lon
      seats
      description
      universityId
    }
  }
`

const UPDATE_AMPHI_MUTATION: TypedDocumentNode<
  EditAmphiById,
  UpdateAmphiMutationVariables
> = gql`
  mutation UpdateAmphiMutation($id: Int!, $input: UpdateAmphiInput!) {
    updateAmphi(id: $id, input: $input) {
      id
      name
      lat
      lon
      seats
      universityId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="alert alert-danger">{error?.message}</div>
)

export const Success = ({ amphi }: CellSuccessProps<EditAmphiById>) => {
  const [updateAmphi, { loading, error }] = useMutation(UPDATE_AMPHI_MUTATION, {
    onCompleted: () => {
      toast.success('Amphi updated')
      navigate(routes.amphis())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (
    input: UpdateAmphiInput,
    id: EditAmphiById['amphi']['id']
  ) => {
    updateAmphi({ variables: { id, input } })
  }

  return (
    <div className="card border-primary mb-3">
      <header className="card-header">
        <h2 className="card-title">Edit Amphi {amphi?.id}</h2>
      </header>
      <div className="card-body">
        <AmphiForm
          amphi={amphi}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
