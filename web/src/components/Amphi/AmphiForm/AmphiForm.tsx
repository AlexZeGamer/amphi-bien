import type { EditAmphiById, UpdateAmphiInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

type FormAmphi = NonNullable<EditAmphiById['amphi']>

interface AmphiFormProps {
  amphi?: EditAmphiById['amphi']
  onSave: (data: UpdateAmphiInput, id?: FormAmphi['id']) => void
  error: RWGqlError
  loading: boolean
}

const AmphiForm = (props: AmphiFormProps) => {
  const onSubmit = (data: FormAmphi) => {
    props.onSave(data, props?.amphi?.id)
  }

  return (
    <div className="form-group">
      <Form<FormAmphi> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.amphi?.name}
          className="form-control"
          errorClassName="form-control is-invalid"
          validation={{ required: true }}
        />

        <FieldError name="name" className="invalid-feedback" />

        <Label
          name="lat"
          className="form-label"
          errorClassName="form-label text-danger"
        >
          Lat
        </Label>

        <TextField
          name="lat"
          defaultValue={props.amphi?.lat}
          className="form-control"
          errorClassName="form-control is-invalid"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="lat" className="invalid-feedback" />

        <Label
          name="lon"
          className="form-label"
          errorClassName="form-label text-danger"
        >
          Lon
        </Label>

        <TextField
          name="lon"
          defaultValue={props.amphi?.lon}
          className="form-control"
          errorClassName="form-control is-invalid"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="lon" className="invalid-feedback" />

        <Label
          name="seats"
          className="form-label"
          errorClassName="form-label text-danger"
        >
          Seats
        </Label>

        <NumberField
          name="seats"
          defaultValue={props.amphi?.seats}
          className="form-control"
          errorClassName="form-control is-invalid"
          validation={{ required: true }}
        />

        <FieldError name="seats" className="invalid-feedback" />

        <Label
          name="schoolId"
          className="form-label"
          errorClassName="form-label text-danger"
        >
          School id
        </Label>

        <NumberField
          name="schoolId"
          defaultValue={props.amphi?.schoolId}
          className="form-control"
          errorClassName="form-control is-invalid"
          validation={{ required: true }}
        />

        <FieldError name="schoolId" className="invalid-feedback" />

        <div className="mt-3">
          <Submit disabled={props.loading} className="btn btn-primary">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default AmphiForm
