import type {
  CreateSchoolMutation,
  CreateSchoolInput,
  CreateSchoolMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SchoolForm from 'src/components/School/SchoolForm'

const CREATE_SCHOOL_MUTATION: TypedDocumentNode<
  CreateSchoolMutation,
  CreateSchoolMutationVariables
> = gql`
  mutation CreateSchoolMutation($input: CreateSchoolInput!) {
    createSchool(input: $input) {
      id
    }
  }
`

const NewSchool = () => {
  const [createSchool, { loading, error }] = useMutation(
    CREATE_SCHOOL_MUTATION,
    {
      onCompleted: () => {
        toast.success('School created')
        navigate(routes.schools())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateSchoolInput) => {
    createSchool({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New School</h2>
      </header>
      <div className="rw-segment-main">
        <SchoolForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSchool
