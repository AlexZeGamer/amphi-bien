import type {
  EditAmphiById,
  UpdateAmphiInput,
  UpdateAmphiMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellFailureProps,
  CellSuccessProps,
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
      university {
        id
        name
      }
      images {
        id
        title
        url
      }
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
      description
      universityId
    }
  }
`

export const Loading = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Chargement...</span>
    </div>
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div className="mx-auto my-8 max-w-4xl rounded-md border border-red-200 bg-red-50 p-4">
    <h2 className="mb-2 text-xl font-bold text-red-700">Erreur</h2>
    <p className="text-red-600">{error?.message}</p>
  </div>
)

export const Success = ({ amphi }: CellSuccessProps<EditAmphiById>) => {
  const [updateAmphi, { loading, error }] = useMutation(UPDATE_AMPHI_MUTATION, {
    onCompleted: async () => {
      // With Filestack, image URLs are already provided in the form data
      // We just need to handle saving these to the database via our API

      toast.success('Amphi updated successfully')
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
    // Images from Filestack are handled directly in the input data
    updateAmphi({ variables: { id, input } })
  }

  return (
    <div className="mx-auto my-8 max-w-5xl overflow-hidden rounded-lg bg-white shadow-md">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">
          Modifier l&apos;amphithéâtre
        </h2>
        <p className="text-blue-100">{amphi?.name}</p>
      </header>

      <div className="px-6 py-8">
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
