import EditSchoolCell from 'src/components/School/EditSchoolCell'

type SchoolPageProps = {
  id: number
}

const EditSchoolPage = ({ id }: SchoolPageProps) => {
  return <EditSchoolCell id={id} />
}

export default EditSchoolPage
