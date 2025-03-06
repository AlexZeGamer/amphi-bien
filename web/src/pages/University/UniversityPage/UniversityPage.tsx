import UniversityCell from 'src/components/University/UniversityCell'

type UniversityPageProps = {
  id: number
}

const UniversityPage = ({ id }: UniversityPageProps) => {
  return <UniversityCell id={id} />
}

export default UniversityPage
