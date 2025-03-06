import EditUniversityCell from 'src/components/University/EditUniversityCell'

type UniversityPageProps = {
  id: number
}

const EditUniversityPage = ({ id }: UniversityPageProps) => {
  return <EditUniversityCell id={id} />
}

export default EditUniversityPage
