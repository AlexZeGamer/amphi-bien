import { LatLngTuple } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import type { FindAmphiById } from 'types/graphql'

import 'leaflet/dist/leaflet.css'

interface Props {
  amphi: NonNullable<FindAmphiById['amphi']>
}

const Amphi = ({ amphi }: Props) => {
  const position = [amphi.lat, amphi.lon] as LatLngTuple

  return (
    <>
      <h1>{amphi.name}</h1>
      <MapContainer center={position} zoom={18} style={{ height: 320 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Nom: {amphi.name}</Popup>
        </Marker>
      </MapContainer>
    </>
  )
}

export default Amphi
