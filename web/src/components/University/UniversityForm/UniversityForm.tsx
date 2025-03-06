import type { EditUniversityById, UpdateUniversityInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

type FormUniversity = NonNullable<EditUniversityById['university']>

interface UniversityFormProps {
  university?: EditUniversityById['university']
  onSave: (data: UpdateUniversityInput, id?: FormUniversity['id']) => void
  error: RWGqlError
  loading: boolean
}

const UniversityForm = (props: UniversityFormProps) => {
  const onSubmit = (data: FormUniversity) => {
    props.onSave(data, props?.university?.id)
  }

  return (
    <div className="form-group">
      <Form<FormUniversity> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="alert alert-danger"
          titleClassName="alert-heading"
          listClassName="list-unstyled"
        />

        <Label
          name="name"
          className="form-label"
          errorClassName="form-label text-danger"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.university?.name}
          className="form-control"
          errorClassName="form-control is-invalid"
          validation={{ required: true }}
        />

        <FieldError name="name" className="invalid-feedback" />

        <div className="mt-3">
          <Submit disabled={props.loading} className="btn btn-primary">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UniversityForm
