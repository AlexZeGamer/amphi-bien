import SchoolCell from 'src/components/School/SchoolCell'

type SchoolPageProps = {
  id: number
}

const SchoolPage = ({ id }: SchoolPageProps) => {
  return <SchoolCell id={id} />
}

export default SchoolPage
