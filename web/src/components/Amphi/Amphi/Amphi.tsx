import { LatLngTuple } from 'leaflet'
import AliceCarousel from 'react-alice-carousel'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Tooltip } from 'react-tooltip'
import type { FindAmphiById } from 'types/graphql'

import 'leaflet/dist/leaflet.css'
import 'react-alice-carousel/lib/alice-carousel.css'

interface Props {
  amphi: NonNullable<FindAmphiById['amphi']>
}

const Amphi = ({ amphi }: Props) => {
  const position = [amphi.lat, amphi.lon] as LatLngTuple
  const handleDragStart = (e) => e.preventDefault()
  const renderCarouselItems = () => {
    if (!amphi.images || amphi.images.length === 0) return []

    return amphi.images.map((image, index) => (
      <div key={index} className="pr-4">
        <img
          src={image.url}
          alt={image.title || `Image ${index + 1}`}
          onDragStart={handleDragStart}
          className="h-48 rounded-lg"
        />
      </div>
    ))
  }

  return (
    <div className="flex flex-col gap-4">
      <section>
        <h1 className="mt-4 text-4xl ">{amphi.name}</h1>
        <h3 className="font-light">{amphi.university.name}</h3>
      </section>
      <section>
        {/* Image Carousel - Using AliceCarousel */}
        {amphi.images && amphi.images.length > 0 && (
          <div className="relative mt-3" style={{ height: '250px' }}>
            <AliceCarousel
              mouseTracking
              items={renderCarouselItems()}
              controlsStrategy="responsive"
              autoWidth
            />
          </div>
        )}
      </section>

      <section className="mt-6">
        <h2 className="mb-4 text-2xl">Équipements et caractéristiques</h2>
        <div className="bg-base-100 flex flex-wrap gap-6">
          {/* Seats feature with seat icon */}
          <div className="" data-tip="Capacité">
            <div className="bg-base-200 flex items-center gap-3 rounded-lg px-4 py-3">
              <svg
                height="2rem"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.9643 2.25H12.0359C12.9401 2.24999 13.6694 2.24998 14.2577 2.3033C14.8641 2.35826 15.3939 2.47455 15.8751 2.75241C16.4452 3.08154 16.9186 3.55493 17.2477 4.125C17.5256 4.60625 17.6418 5.13605 17.6968 5.7424C17.7501 6.3307 17.7501 7.05998 17.7501 7.96423V11.371C18.2441 11.4754 18.6911 11.6795 19.052 12.0919C19.4975 12.6011 19.6428 13.2365 19.703 13.9366C19.7044 13.9525 19.7058 13.9684 19.7071 13.9843C19.7424 14.3935 19.7758 14.7811 19.7541 15.105C19.7292 15.4762 19.6285 15.855 19.3273 16.1833C19.0162 16.5223 18.6255 16.6485 18.2514 16.702C18.099 16.7237 17.9306 16.7357 17.7501 16.7422V21C17.7501 21.4142 17.4143 21.75 17.0001 21.75C16.5859 21.75 16.2501 21.4142 16.2501 21V16.75H7.75011V21C7.75011 21.4142 7.41432 21.75 7.00011 21.75C6.58589 21.75 6.25011 21.4142 6.25011 21V16.7422C6.06959 16.7357 5.9012 16.7237 5.74883 16.702C5.37467 16.6485 4.98401 16.5223 4.67291 16.1833C4.37169 15.855 4.27099 15.4762 4.24614 15.105C4.22445 14.7811 4.25785 14.3934 4.29309 13.9842C4.29446 13.9684 4.29583 13.9525 4.2972 13.9366C4.35737 13.2365 4.50268 12.6011 4.94824 12.0919C5.30912 11.6795 5.75609 11.4754 6.25011 11.371L6.25011 7.96421C6.2501 7.05997 6.25009 6.33069 6.30341 5.7424C6.35836 5.13605 6.47466 4.60625 6.75251 4.125C7.08164 3.55493 7.55503 3.08154 8.12511 2.75241C8.60636 2.47455 9.13616 2.35826 9.7425 2.3033C10.3308 2.24998 11.0601 2.24999 11.9643 2.25ZM8.44372 11.25C8.40708 11.25 8.37069 11.25 8.33454 11.25H7.75011V8C7.75011 7.05158 7.75082 6.39041 7.79729 5.87779C7.84281 5.37549 7.92748 5.0899 8.05155 4.875C8.24903 4.53296 8.53306 4.24892 8.87511 4.05144C9.09001 3.92737 9.37559 3.84271 9.8779 3.79718C10.3905 3.75072 11.0517 3.75 12.0001 3.75C12.9485 3.75 13.6097 3.75072 14.1223 3.79718C14.6246 3.84271 14.9102 3.92737 15.1251 4.05144C15.4671 4.24892 15.7512 4.53296 15.9487 4.875C16.0727 5.0899 16.1574 5.37549 16.2029 5.87779C16.2494 6.39041 16.2501 7.05158 16.2501 8V11.25H15.6657C15.6295 11.25 15.5931 11.25 15.5565 11.25H8.44372ZM8.50011 12.75C7.65102 12.75 7.10025 12.7521 6.69378 12.8145C6.32028 12.8719 6.17689 12.9656 6.0771 13.0797C5.95089 13.2239 5.84334 13.4641 5.79168 14.065C5.75092 14.5393 5.72974 14.8098 5.74279 15.0048C5.74859 15.0915 5.76004 15.1324 5.76595 15.1487C5.76977 15.1592 5.77186 15.1623 5.77805 15.169L5.77924 15.1703C5.77921 15.1703 5.77925 15.1703 5.77924 15.1703L5.78231 15.1723C5.78409 15.1733 5.78721 15.1749 5.79206 15.1771C5.81294 15.1863 5.86142 15.2028 5.96095 15.2171C6.17899 15.2482 6.48501 15.25 7.00011 15.25H17.0001C17.5152 15.25 17.8212 15.2482 18.0393 15.2171C18.1388 15.2028 18.1873 15.1863 18.2082 15.1771C18.213 15.1749 18.2161 15.1733 18.2179 15.1723L18.2206 15.1707C18.2206 15.1706 18.2206 15.1706 18.2206 15.1707L18.2222 15.169C18.2284 15.1623 18.2304 15.1592 18.2343 15.1487C18.2402 15.1324 18.2516 15.0915 18.2574 15.0048C18.2705 14.8098 18.2493 14.5393 18.2085 14.065C18.1569 13.4641 18.0493 13.2239 17.9231 13.0797C17.8233 12.9656 17.6799 12.8719 17.3064 12.8145C16.9 12.7521 16.3492 12.75 15.5001 12.75H8.50011Z"
                  fill="#1C274C"
                />
              </svg>
              <span className="text-lg">{amphi.seats} places</span>
            </div>
          </div>

          {/* Display all other features */}
          <Tooltip id="feature-tooltip" />
          {amphi.features &&
            amphi.features.map((feature) => (
              <div
                key={feature.id}
                className="bg-base-200 flex items-center gap-3 rounded-lg px-4 py-3"
              >
                <i
                  className={`${feature.icon} text-2xl`}
                  data-tooltip-id="feature-tooltip"
                  data-tooltip-content={feature.name}
                  data-tooltip-place="top"
                ></i>
                <span className="text-lg">{feature.value}</span>
              </div>
            ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-2xl">A propos</h2>
        <p className="font-medium">{amphi.description}</p>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-2xl">S&apos;y rendre</h2>
        <MapContainer center={position} zoom={18} style={{ height: 320 }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>Nom: {amphi.name}</Popup>
          </Marker>
        </MapContainer>
        <button className="btn btn-primary mt-3 w-full">
          Ouvrir dans Google Maps
        </button>
      </section>
    </div>
  )
}

export default Amphi
