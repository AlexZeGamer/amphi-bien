// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import NearbyCell from 'src/components/NearbyCell'
const NearbyPage = () => {
  return (
    <>
      <Metadata title="Nearby" description="Nearby page" />

      <NearbyCell />
    </>
  )
}

export default NearbyPage
