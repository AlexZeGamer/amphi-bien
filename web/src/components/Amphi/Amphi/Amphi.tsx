import { useState, useRef } from 'react'

import { LatLngTuple } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import type { FindAmphiById } from 'types/graphql'

import 'leaflet/dist/leaflet.css'

interface Props {
  amphi: NonNullable<FindAmphiById['amphi']>
}

const Amphi = ({ amphi }: Props) => {
  const position = [amphi.lat, amphi.lon] as LatLngTuple
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handlePrevious = () => {
    if (amphi.images && amphi.images.length > 0) {
      setActiveIndex((prev) =>
        prev === 0 ? amphi.images.length - 1 : prev - 1
      )

      // Scroll to the appropriate image
      if (scrollContainerRef.current) {
        const imageWidth = scrollContainerRef.current.offsetWidth / 3
        const newScrollPosition =
          imageWidth *
          (activeIndex === 0 ? amphi.images.length - 1 : activeIndex - 1)
        scrollContainerRef.current.scrollTo({
          left: newScrollPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  const handleNext = () => {
    if (amphi.images && amphi.images.length > 0) {
      setActiveIndex((prev) =>
        prev === amphi.images.length - 1 ? 0 : prev + 1
      )

      // Scroll to the appropriate image
      if (scrollContainerRef.current) {
        const imageWidth = scrollContainerRef.current.offsetWidth / 3
        const newScrollPosition =
          imageWidth *
          (activeIndex === amphi.images.length - 1 ? 0 : activeIndex + 1)
        scrollContainerRef.current.scrollTo({
          left: newScrollPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <section>
        <h1 className="mt-4 text-4xl ">{amphi.name}</h1>
        <h3 className="font-light">{amphi.university.name}</h3>

        {/* Image Carousel - Side-by-side */}
        {amphi.images && amphi.images.length > 0 && (
          <div className="relative mt-3">
            <div
              ref={scrollContainerRef}
              className="flex snap-x gap-2 overflow-x-auto scroll-smooth py-2"
              style={{ height: '250px' }}
            >
              {amphi.images.map((image, index) => (
                <div
                  key={index}
                  className={`flex-none snap-start rounded-lg ${index === activeIndex ? 'ring-primary ring-2' : ''}`}
                  style={{ height: '100%' }}
                >
                  <img
                    src={image.url}
                    alt={image.title || `Image ${index + 1}`}
                    className="h-full rounded-lg object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Controls */}
            {amphi.images.length > 3 && (
              <>
                <button
                  className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black bg-opacity-30 p-2 text-white hover:bg-opacity-50"
                  type="button"
                  onClick={handlePrevious}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className="sr-only">Previous</span>
                </button>
                <button
                  className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black bg-opacity-30 p-2 text-white hover:bg-opacity-50"
                  type="button"
                  onClick={handleNext}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span className="sr-only">Next</span>
                </button>
              </>
            )}
          </div>
        )}
      </section>

      <section className="mt-6">
        <h2 className="mb-4 text-2xl">Équipements et caractéristiques</h2>
        <div className="bg-base-100 flex flex-wrap gap-6 p-4">
          {/* Seats feature with seat icon */}
          <div className="tooltip" data-tip="Capacité">
            <div className="bg-base-200 flex items-center gap-3 rounded-lg px-4 py-3">
              <i className="bi bi-person-seat text-2xl"></i>
              <span className="text-lg">{amphi.seats} places</span>
            </div>
          </div>

          {/* Display all other features */}
          {amphi.features &&
            amphi.features.map((feature) => (
              <div key={feature.id} className="tooltip" data-tip={feature.name}>
                <div className="bg-base-200 flex items-center gap-3 rounded-lg px-4 py-3">
                  <i className={`${feature.icon} text-2xl`}></i>
                  <span className="text-lg">{feature.value}</span>
                </div>
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
