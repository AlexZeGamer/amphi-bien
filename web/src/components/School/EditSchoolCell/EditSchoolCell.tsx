import type {
  EditSchoolById,
  UpdateSchoolInput,
  UpdateSchoolMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SchoolForm from 'src/components/School/SchoolForm'

export const QUERY: TypedDocumentNode<EditSchoolById> = gql`
  query EditSchoolById($id: Int!) {
    school: school(id: $id) {
      id
      name
    }
  }
`

const UPDATE_SCHOOL_MUTATION: TypedDocumentNode<
  EditSchoolById,
  UpdateSchoolMutationVariables
> = gql`
  mutation UpdateSchoolMutation($id: Int!, $input: UpdateSchoolInput!) {
    updateSchool(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ school }: CellSuccessProps<EditSchoolById>) => {
  const [updateSchool, { loading, error }] = useMutation(
    UPDATE_SCHOOL_MUTATION,
    {
      onCompleted: () => {
        toast.success('School updated')
        navigate(routes.schools())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateSchoolInput,
    id: EditSchoolById['school']['id']
  ) => {
    updateSchool({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit School {school?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <SchoolForm
          school={school}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
