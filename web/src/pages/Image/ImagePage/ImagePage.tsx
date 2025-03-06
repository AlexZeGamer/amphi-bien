import ImageCell from 'src/components/Image/ImageCell'

type ImagePageProps = {
  id: number
}

const ImagePage = ({ id }: ImagePageProps) => {
  return <ImageCell id={id} />
}

export default ImagePage
