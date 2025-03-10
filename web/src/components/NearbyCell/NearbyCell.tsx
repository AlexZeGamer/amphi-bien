import { useEffect, useRef, useState } from 'react'

import { Icon } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import type { FindNearbyQuery, FindNearbyQueryVariables } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'

import 'leaflet/dist/leaflet.css'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'

// Create a custom tile layer component for Google Maps
const GoogleMapsLayer = () => {
  const map = useMap()

  useEffect(() => {
    console.log('Google Maps layer effect')
    console.log('Google Maps API key:', process.env.MAPS_API_KEY)
    console.log('Google Maps script loaded:', window.google)
    console.log(
      'Google Maps Leaflet plugin loaded:',
      window.L.gridLayer.googleMutant
    )
    if (!window.google || !window.L.gridLayer.googleMutant) return

    const googleLayer = window.L.gridLayer.googleMutant({
      type: 'roadmap',
    })

    googleLayer.addTo(map)

    return () => {
      map.removeLayer(googleLayer)
    }
  }, [map])

  return null
}

// This component handles map events like "flyto"
const MapEventHandler = () => {
  const map = useMap()

  useEffect(() => {
    const handleFlyTo = (e: CustomEvent) => {
      const { lat, lng, zoom } = e.detail
      map.flyTo([lat, lng], zoom)
    }

    const mapContainer = document.querySelector('.leaflet-container')
    mapContainer?.addEventListener('flyto', handleFlyTo as EventListener)

    return () => {
      mapContainer?.removeEventListener('flyto', handleFlyTo as EventListener)
    }
  }, [map])

  return null
}

export const QUERY: TypedDocumentNode<
  FindNearbyQuery,
  FindNearbyQueryVariables
> = gql`
  query FindNearbyQuery {
    amphis {
      id
      name
      lat
      lon
    }
  }
`

export const Loading = () => <div>Chargement...</div>

export const Empty = () => <div>Aucun amphithéâtre trouvé à proximité.</div>

export const Failure = ({
  error,
}: CellFailureProps<FindNearbyQueryVariables>) => (
  <div style={{ color: 'red' }}>Erreur: {error?.message}</div>
)

export const Success = ({
  amphis,
}: CellSuccessProps<FindNearbyQuery, FindNearbyQueryVariables>) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  )
  const [isLocating, setIsLocating] = useState(true)
  const mapRef = useRef<HTMLDivElement>(null)

  // Get user's current location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
          setIsLocating(false)
        },
        (error) => {
          console.error('Erreur de localisation:', error)
          setIsLocating(false)
        },
        { enableHighAccuracy: true }
      )
    } else {
      setIsLocating(false)
    }
  }, [])

  // Function to focus map on specific amphi
  const handleFocusOnMap = (lat: number, lon: number) => {
    // First scroll the map into view
    mapRef.current?.scrollIntoView({ behavior: 'smooth' })

    // Then dispatch the flyto event after a slight delay to ensure the map is visible
    setTimeout(() => {
      document.querySelector('.leaflet-container')?.dispatchEvent(
        new CustomEvent('flyto', {
          detail: {
            lat: lat,
            lng: lon,
            zoom: 16,
          },
        })
      )
    }, 500) // 500ms delay gives time for the scroll to complete
  }

  // Calculate distance between user and each amphi
  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Add distance property and sort by proximity if user location available
  const amphisWithDistance: (FindNearbyQuery['amphis'][0] & {
    distance?: number
  })[] = userLocation
    ? amphis
        .map((amphi) => ({
          ...amphi,
          distance: getDistance(
            userLocation[0],
            userLocation[1],
            amphi.lat,
            amphi.lon
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
    : amphis

  // Custom icons
  const userIcon = new Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  const amphiIcon = new Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  // Default center if user location not available
  const defaultCenter: [number, number] = [48.8566, 2.3522] // Paris

  // Load Google Maps scripts if API key is available
  useEffect(() => {
    if (process.env.MAPS_API_KEY && !window.google) {
      const loadGoogleMapsScript = () => {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_API_KEY}`
        script.async = true
        script.defer = true
        document.head.appendChild(script)

        script.onload = () => {
          const mutantScript = document.createElement('script')
          mutantScript.src =
            'https://unpkg.com/leaflet.gridlayer.googlemutant@latest/dist/Leaflet.GoogleMutant.js'
          document.head.appendChild(mutantScript)
        }
      }
      loadGoogleMapsScript()
    }
  }, [])

  return (
    <div>
      {isLocating ? (
        <div className="py-4 text-center">Localisation en cours...</div>
      ) : (
        <>
          <div ref={mapRef} style={{ height: '400px', marginBottom: '20px' }}>
            <MapContainer
              center={userLocation || defaultCenter}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              {process.env.MAPS_API_KEY ? (
                <GoogleMapsLayer />
              ) : (
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              )}

              <MapEventHandler />

              {userLocation && (
                <Marker position={userLocation} icon={userIcon}>
                  <Popup>Votre position actuelle</Popup>
                </Marker>
              )}

              {amphisWithDistance.map((amphi) => (
                <Marker
                  key={amphi.id}
                  position={[amphi.lat, amphi.lon]}
                  icon={amphiIcon}
                >
                  <Popup>
                    <strong>{amphi.name}</strong>
                    {userLocation && (
                      <p>{amphi.distance.toFixed(1)} km de distance</p>
                    )}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <h2 className="mb-4 text-2xl font-bold">Amphithéâtres à proximité</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {amphisWithDistance.map((amphi) => (
              <div
                key={amphi.id}
                className="rounded-lg border p-4 shadow-md transition-shadow hover:shadow-lg"
              >
                <h3 className="mb-2 text-xl font-bold">{amphi.name}</h3>
                {userLocation && (
                  <p className="mb-3 font-medium text-blue-600">
                    {amphi.distance.toFixed(1)} km de distance
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${amphi.lat},${amphi.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Itinéraire
                  </a>
                  <button
                    className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleFocusOnMap(amphi.lat, amphi.lon)}
                  >
                    Voir sur la carte
                  </button>
                  <button
                    className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    onClick={() => navigate(routes.amphi({ id: amphi.id }))}
                  >
                    Voir détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
