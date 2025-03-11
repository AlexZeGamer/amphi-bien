import { LatLngTuple } from 'leaflet'
import AliceCarousel from 'react-alice-carousel'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Tooltip } from 'react-tooltip'
import type { FindAmphiById } from 'types/graphql'

import IssuesCell from 'src/components/Issue/IssuesCell'

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
                  d="M11.9643 2.25H12.0359C12.9401 2.24999 13.6694 2.24998 14.2577 2.3033C14.8641 2.35826 15.3939 2.47455 15.8751 2.75241C16.4452 3.08154 16.9186 3.55493 17.2477 4.125C17.5256 4.60625 17.6418 5.13605 17.6968 5.7424C17.7501 6.3307 17.7501 7.05998 17.7501 7.96423V11.371C18.2441 11.4754 18.6911 11.6795 19.052 12.0919C19.4975 12.6011 19.6428 13.2365 19.703 13.9323C19.7501 14.4877 19.7501 15.1439 19.7501 15.9603V16.0397V16.0397C19.7501 16.8561 19.7501 17.5123 19.703 18.0677C19.6428 18.7635 19.4975 19.3989 19.052 19.9081C18.6065 20.4173 17.9711 20.5626 17.2753 20.6228C16.7199 20.6699 16.0637 20.6699 15.2473 20.6699H8.75275C7.93637 20.6699 7.28014 20.6699 6.72474 20.6228C6.02889 20.5626 5.39355 20.4173 4.94804 19.9081C4.50254 19.3989 4.35721 18.7635 4.29703 18.0677C4.24995 17.5123 4.24995 16.8561 4.24995 16.0397V15.9603C4.24995 15.1439 4.24995 14.4877 4.29703 13.9323C4.35721 13.2365 4.50254 12.6011 4.94804 12.0919C5.30894 11.6795 5.75589 11.4754 6.24995 11.371V7.96424C6.24995 7.05998 6.24995 6.3307 6.30327 5.7424C6.35823 5.13605 6.47451 4.60625 6.75237 4.125C7.0815 3.55493 7.55489 3.08154 8.12495 2.75241C8.60621 2.47455 9.136 2.35826 9.74236 2.3033C10.3307 2.24998 11.0599 2.24999 11.9643 2.25ZM8.03713 11.25H15.9629C15.9418 10.4273 15.8911 9.91726 15.7881 9.47325C15.5828 8.61939 15.1616 7.84912 14.4633 7.34701C13.7649 6.84489 12.9185 6.6766 12.0359 6.67501H11.9643C11.0816 6.6766 10.2352 6.84489 9.53688 7.34701C8.83857 7.84912 8.41735 8.61939 8.21204 9.47325C8.10904 9.91726 8.05835 10.4273 8.03713 11.25ZM6.74995 13.75C6.59197 13.75 6.38875 13.7516 6.18544 13.9143C5.98213 14.0771 5.87931 14.2615 5.83794 14.5883C5.79452 14.9333 5.78693 15.4106 5.78693 16.0175C5.78693 16.6244 5.79452 17.1018 5.83794 17.4467C5.87931 17.7735 5.98213 17.9579 6.18544 18.1207C6.38875 18.2834 6.59197 18.285 6.74995 18.285H17.25C17.408 18.285 17.6112 18.2834 17.8145 18.1207C18.0178 17.9579 18.1206 17.7735 18.162 17.4467C18.2054 17.1018 18.213 16.6244 18.213 16.0175C18.213 15.4106 18.2054 14.9333 18.162 14.5883C18.1206 14.2615 18.0178 14.0771 17.8145 13.9143C17.6112 13.7516 17.408 13.75 17.25 13.75H6.74995Z"
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
        <h2 className="mb-3 text-2xl">À propos</h2>
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

      <section className="mt-6">
        <IssuesCell amphiId={amphi.id} />
      </section>
    </div>
  )
}

export default Amphi
