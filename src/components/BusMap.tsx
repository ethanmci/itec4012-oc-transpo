import { useLoadScript, GoogleMap, MarkerF, CircleF, DirectionsRenderer } from '@react-google-maps/api'
import React, { useCallback, useRef } from 'react'
import { Stop } from '../interfaces';

// defining the component props
interface Props {
  location: google.maps.LatLngLiteral
  selectedBus?: String
  stops?: Stop[]
}

/*
interface MapProps extends google.maps.MapOptions {
  location: google.maps.LatLngLiteral
  onClick?: (e: google.maps.MapMouseEvent) => void
  onIdle?: (map: google.maps.Map) => void
  rangeCircle?: any
}
*/

const options: google.maps.MapOptions = {
  disableDefaultUI: true,
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }],
    },
  ],
}

const radius: number = 500; // measured in meters

// TODO: Move location to a context variable?
const BusMap: React.FC<Props> = ({ location, selectedBus }) => {
  const mapRef = useRef<GoogleMap>();
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const onMarkerLoad = (marker: any): void => {
    console.log(marker);
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY ?? 'KEY_UNDEFINED',
  })

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
      <DirectionsRenderer></DirectionsRenderer>
    </GoogleMap>
  )
}

export default BusMap
