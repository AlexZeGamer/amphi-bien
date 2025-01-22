import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useState } from 'react'

import L from 'leaflet'
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvent,
} from 'react-leaflet'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import { useQuery } from '@redwoodjs/web'

import styles from './location-button.module.css'

const LocationButton = () => {
  const map = useMap()

  useEffect(() => {
    // create custom button
    const CustomControl = L.Control.extend({
      // button position
      options: {
        position: 'topleft',
        className: `${styles.locateButton} leaflet-bar`,
        html: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>',
        style:
          'width: 34px; height: 34px; left: 0; margin-top: 0; display: flex; cursor: pointer; justify-content: center; font-size: 2rem;',
      },

      // method
      onAdd: function (map) {
        this._map = map
        const button = L.DomUtil.create('div')
        L.DomEvent.disableClickPropagation(button)

        button.title = 'locate'
        button.innerHTML = this.options.html
        button.className = this.options.className
        button.setAttribute('style', this.options.style)

        L.DomEvent.on(button, 'click', this._clicked, this)

        return button
      },
      _clicked: function (e) {
        L.DomEvent.stopPropagation(e)

        // this.removeLocate();

        this._checkLocate()

        return
      },
      _checkLocate: function () {
        return this._locateMap()
      },

      _locateMap: function () {
        const locateActive = document.querySelector(`.${styles.locateButton}`)
        const locate = locateActive.classList.contains(styles.locateActive)
        // add/remove class from locate button
        locateActive.classList[locate ? 'remove' : 'add'](styles.locateActive)

        // remove class from button
        // and stop watching location
        if (locate) {
          this.removeLocate()
          this._map.stopLocate()
          return
        }

        // location on found
        this._map.on('locationfound', this.onLocationFound, this)
        // locataion on error
        this._map.on('locationerror', this.onLocationError, this)

        // start locate
        this._map.locate({ setView: true, enableHighAccuracy: true })
      },
      onLocationFound: function (e) {
        // add circle
        this.addCircle(e).addTo(this.featureGroup()).addTo(map)

        // add marker
        this.addMarker(e).addTo(this.featureGroup()).addTo(map)

        // add legend
      },
      // on location error
      onLocationError: function (_) {
        this.addLegend('Location access denied.')
      },
      // feature group
      featureGroup: function () {
        return new L.FeatureGroup()
      },
      // add legend
      addLegend: function (text) {
        const checkIfDescriotnExist = document.querySelector('.description')

        if (checkIfDescriotnExist) {
          checkIfDescriotnExist.textContent = text
          return
        }

        const legend = L.control({ position: 'bottomleft' })

        legend.onAdd = function () {
          const div = L.DomUtil.create('div', 'description')
          L.DomEvent.disableClickPropagation(div)
          const textInfo = text
          div.insertAdjacentHTML('beforeend', textInfo)
          return div
        }
        legend.addTo(this._map)
      },
      addCircle: function ({ accuracy, latitude, longitude }) {
        return L.circle([latitude, longitude], accuracy / 2, {
          className: 'circle-test',
          weight: 2,
          stroke: false,
          fillColor: '#136aec',
          fillOpacity: 0.15,
        })
      },
      addMarker: function ({ latitude, longitude }) {
        return L.marker([latitude, longitude], {
          icon: L.divIcon({
            className: styles.locatedAnimation,
            iconSize: L.point(17, 17),
            popupAnchor: [0, -15],
          }),
        })
      },
      removeLocate: function () {
        this._map.eachLayer(function (layer) {
          if (layer instanceof L.Marker) {
            const { icon } = layer.options
            if (icon?.options.className === styles.locatedAnimation) {
              map.removeLayer(layer)
            }
          }
          if (layer instanceof L.Circle) {
            if (layer.options.className === 'circle-test') {
              map.removeLayer(layer)
            }
          }
        })
      },
    })

    // adding new button to map control
    map.addControl(new CustomControl())
  }, [map])

  return null
}

const MarkerManager = ({ position, setPosition, ...props }) => {
  const handleMapClick = (e: L.LeafletMouseEvent) => {
    setPosition([e.latlng.lat, e.latlng.lng])
    props.onChange({ target: { value: `${e.latlng.lat},${e.latlng.lng}` } })
  }
  useMapEvent('click', handleMapClick)
  return <Marker position={position}></Marker>
}

const Search = ({ adress: address, setAdress, setPosition, map, ...props }) => {
  const SEARCH_ADDRESS_QUERY = gql`
    query SearchAddress($address: String!) {
      searchAddress(address: $address) {
        address {
          label
          location {
            lat
            lng
          }
        }
        score
      }
    }
  `

  const { data, refetch } = useQuery(SEARCH_ADDRESS_QUERY, {
    variables: { address },
  })
  const items = data
    ? data.searchAddress.map((res) => ({
        name: res.address.label,
        location: res.address.location,
      }))
    : []
  const handleOnSelect = (item) => {
    map.setView([item.location.lat, item.location.lng])
    setPosition([item.location.lat, item.location.lng])
    setAdress(item.name)
    props.onChange({ target: { value: item.name } })
  }
  return (
    <ReactSearchAutocomplete
      items={items}
      onSearch={async (text) => {
        await refetch({ address: text })
      }}
      onSelect={handleOnSelect}
      fuseOptions={{ keys: ['name'] }}
      resultStringKeyName="name"
      placeholder="Search"
    />
  )
}
const MapPicker = ({ ...props }) => {
  const [address, setAddress] = useState('')
  const [map, setMap] = useState(null)
  const [position, setPosition] = useState([48.8582, 2.2944])
  const displayMap = useMemo(
    () => (
      <MapContainer
        center={[48.8582, 2.2944]}
        zoom={17}
        scrollWheelZoom={true}
        style={{ height: '100%' }}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerManager
          position={position}
          setPosition={setPosition}
          {...props}
        />
        <LocationButton />
      </MapContainer>
    ),
    [props, position]
  )

  return (
    <>
      {displayMap}
      <Search
        adress={address}
        setAdress={setAddress}
        setPosition={setPosition}
        map={map}
        {...props}
      />
    </>
  )
}

export default MapPicker
