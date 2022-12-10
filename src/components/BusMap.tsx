import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  CircleF,
  DirectionsRenderer,
} from '@react-google-maps/api'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Stop, Trip } from '../interfaces'
import { style } from '../resources/mapStyling'

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
  styles: style,
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
