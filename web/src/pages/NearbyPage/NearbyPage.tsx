// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import NearbyCell from 'src/components/NearbyCell'
const NearbyPage = () => {
  return (
    <>
      <Metadata title="À Proximité" description="Page à proximité" />

      <NearbyCell />
    </>
  )
}

export default NearbyPage
