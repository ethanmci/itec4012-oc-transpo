import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  CircleF,
  DirectionsRenderer,
} from '@react-google-maps/api'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Stop, Trip } from '../interfaces'

// defining the component props
interface Props {
  location: google.maps.LatLngLiteral
  busSelected?: boolean
  selectedBus?: String
  stops?: Stop[]
  setStop?: Function
  trips?: Trip[]
}

const options: google.maps.MapOptions = {
  disableDefaultUI: true,
  styles: [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi.park',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#263c3f',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#6b9a76',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#38414e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#212a37',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9ca5b3',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#1f2835',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#f3d19c',
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#2f3948',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#17263c',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#515c6d',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#17263c',
        },
      ],
    },
  ],
}

const radius: number = 500 // measured in meters

// TODO: Move location to a context variable?
const BusMap: React.FC<Props> = ({
  location,
  busSelected,
  selectedBus,
  stops,
  setStop,
  trips,
}) => {
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([])
  // console.log(busSelected)
  console.log(selectedBus)
  // const [busRouteData, setBusRouteData] = useState({})
  const mapRef = useRef<GoogleMap>()
  const onLoad = useCallback((map: any) => (mapRef.current = map), [])

  useEffect(() => {}, [selectedBus])

  useEffect(() => {
    if (!(busSelected ?? false)) return
    const tempFilteredTrips: Trip[] = []
    trips?.forEach((e) => {
      if (e.route_id === selectedBus) {
        tempFilteredTrips.push(e)
      }
    })
    console.log(filteredTrips)
    setFilteredTrips([...tempFilteredTrips])
  }, [trips, selectedBus])

  const onMarkerLoad = (marker: any): void => {
    console.log(marker)
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY ?? 'KEY_UNDEFINED',
  })

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!isLoaded) return <p>Loading...</p>
  return (
    <GoogleMap
      zoom={15}
      center={location}
      clickableIcons={false}
      options={options}
      mapContainerClassName="map-container"
      onLoad={onLoad}
    >
      <MarkerF position={location} onLoad={onMarkerLoad}></MarkerF>
      <CircleF center={location} radius={radius}></CircleF>
      {stops?.map((stop, index) => {
        const stopLocation = new google.maps.LatLng(
          parseFloat(stop.stop_lat),
          parseFloat(stop.stop_lon),
        )
        return (
          <MarkerF
            key={index}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              strokeColor: 'red',
              fillColor: 'red',
              scale: 7,
            }}
            label={{
              text: '\ue530',
              fontFamily: 'Material Icons',
              color: '#ffffff',
              fontSize: '18px',
            }}
            onClick={() => setStop?.(stop)}
            position={stopLocation}
          />
        )
      })}
      {(busSelected ?? false) && <DirectionsRenderer></DirectionsRenderer>}
    </GoogleMap>
  )
}

export default BusMap
