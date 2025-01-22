import AmphiCell from 'src/components/Amphi/AmphiCell'

type AmphiPageProps = {
  id: number
}

const AmphiPage = ({ id }: AmphiPageProps) => {
  return <AmphiCell id={id} />
}

export default AmphiPage
