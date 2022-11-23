import React, { useEffect, useState } from 'react';

interface Stop {
  id: string
  stop_id: string
  stop_code: string
  stop_name: string
  stop_desc: string
  stop_lat: string
  stop_lon: string
  stop_street: string
  stop_city: string
  stop_region: string
  stop_postcode: string
  stop_country: string
  zone_id: string
}

interface GtfsStopQuery {
  Query?: object
  Gtfs?: Stop[]
}

const Home: React.FC = () => {
  const [location, setLocation] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
  const [stopList, setStopList] = useState<GtfsStopQuery>({})

  useEffect(() => {
    if (Object.keys(stopList).length !== 0) return

    void fetch(`${
      (process.env.NODE_ENV ?? 'development') === 'development'
        ? 'https://api.allorigins.win/get?url='
        : ''
    }
    ${encodeURIComponent(
      `https://api.octranspo1.com/v2.0/Gtfs?${new URLSearchParams({
        appID: process.env.REACT_APP_OC_APP_ID ?? 'KEY_NOT_FOUND',
        apiKey: process.env.REACT_APP_OC_API_KEY ?? 'KEY_NOT_FOUND',
        table: 'stops',
        format: 'json',
      }).toString()}`,
    )}`)
      .then(async (response) => {
        if (response.ok) return await response.json()
        throw new Error('Network response was not ok.')
      })
      .then((data) => {
        setStopList(JSON.parse(data.contents))
      })
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
      setLocation({ ...location, lat: pos.coords.latitude, lng: pos.coords.longitude });
    })
  }, [])

  const withinRange = (curLat: number, lat: number, curLon: number, lon: number): boolean => {
    const radius: number = 0.00225225
    if (lat < (curLat + radius) && lat > (curLat - radius) &&
        lon < (curLon + radius) && lon > (curLon - radius)) return true;
    return false;
  }

  const simpleStopDisplay = (): void => {
    return (
      stopList.Gtfs?.forEach((e) => {
        const lat: number = parseFloat(e.stop_lat)
        const lon: number = parseFloat(e.stop_lon)

        if (withinRange(location.lat, lat, location.lng, lon)) {
          console.log(e.stop_name, e.stop_lat, e.stop_lon)
        }
      })
    )
  }

  const simpleLocationDisplay = (): void => {
    return (
      console.log(location.lat, location.lng)
    )
  }

  return (
    <div>Home page!<br></br>
      <button onClick={simpleStopDisplay}>Stops in range</button>
      <br></br>
      <button onClick={simpleLocationDisplay}>Current Lat</button>
    </div>
  )
};

export default Home;
