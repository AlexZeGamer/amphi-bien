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
    <div className="flex flex-col gap-4">
      <section>
        <h1 className="mt-4 text-4xl ">{amphi.name}</h1>
        <h3 className="font-light">{amphi.school.name}</h3>
      </section>
      <section>
        <h2>A propos</h2>
        <p className="font-medium">{amphi.description}</p>
      </section>
      <section>
        <h2>S&apos;y rendre</h2>
        <MapContainer center={position} zoom={18} style={{ height: 320 }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>Nom: {amphi.name}</Popup>
          </Marker>
        </MapContainer>
        <button className="btn btn-primary w-full">
          Ouvrir dans Google Maps
        </button>
      </section>
    </div>
  )
}

export default Amphi
