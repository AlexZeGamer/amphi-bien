import EditAmphiCell from 'src/components/Amphi/EditAmphiCell'

type AmphiPageProps = {
  id: number
}

const EditAmphiPage = ({ id }: AmphiPageProps) => {
  return <EditAmphiCell id={id} />
}

export default EditAmphiPage
