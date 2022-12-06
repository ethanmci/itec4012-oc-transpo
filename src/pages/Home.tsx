import React, { useEffect, useState } from 'react';
import StopInfo from '../components/StopInfo'
import RoutesCards from '../components/RoutesCard'

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

interface Route {
  id: string
  route_id: string
  route_short_name: string
  route_long_name: string
  route_desc: string
  route_type: string
}

interface GtfsRouteQuery {
  Query?: object
  Gtfs?: Route[]
}

interface inboundTrip {
  StopNo: string
  StopLabel: string
  error: string
  RouteDirection_RouteNo: string
  RouteDirection_RouteLabel: string
  RouteDirection_Direction: string
  RouteDirection_Error: string
  RRouteDirection_RequestProcessingTime: string
  Trip_Longitude: string
  Trip_Latitude: string
  Trip_GPSSpeed: string
  Trip_TripDestination: string
  Trip_TripStartTime: string
  Trip_AdjustedScheduleTime: string
  Trip_AdjustmentAge: string
  Trip_LastTripOfSchedule: string
  Trip_BusType: string
}

interface GtfsTripQuery {
  Query?: object
  Gtfs?: inboundTrip[]
}

const Home: React.FC = () => {
  const [location, setLocation] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
  const [stopList, setStopList] = useState<GtfsStopQuery>({});
  const [filteredStopList, setFilteredStopList] = useState<GtfsStopQuery>({});
  const [routeList, setRouteList] = useState<GtfsRouteQuery>({});
  const [filteredRouteList, setFilteredRouteList] = useState<GtfsRouteQuery>({});
  const [inboundTrip, setInbountTrip] = useState<GtfsTripQuery>({});

  useEffect(() => {
    if (Object.keys(stopList).length !== 0) return

    void fetch(`${(process.env.NODE_ENV ?? 'development') === 'development'
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

  // For routes
  useEffect(() => {
    if (Object.keys(routeList).length !== 0) return

    void fetch(`${(process.env.NODE_ENV ?? 'development') === 'development'
      ? 'https://api.allorigins.win/get?url='
      : ''
      }
    ${encodeURIComponent(
        `https://api.octranspo1.com/v2.0/Gtfs?${new URLSearchParams({
          appID: process.env.REACT_APP_OC_APP_ID ?? 'KEY_NOT_FOUND',
          apiKey: process.env.REACT_APP_OC_API_KEY ?? 'KEY_NOT_FOUND',
          table: 'routes',
          format: 'json',
        }).toString()}`,
      )}`)
      .then(async (response) => {
        if (response.ok) return await response.json()
        throw new Error('Network response was not ok.')
      })
      .then((data) => {
        setRouteList(JSON.parse(data.contents))
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

  useEffect(() => {
    const getStops = (): void => {
      const returnArr: Stop[] = []
      stopList.Gtfs?.forEach((e) => {
        const lat: number = parseFloat(e.stop_lat)
        const lon: number = parseFloat(e.stop_lon)
        if (withinRange(location.lat, lat, location.lng, lon)) {
          returnArr.push(e)
          // getRoutes()
        }
      })
      setFilteredStopList({ ...setFilteredStopList, Gtfs: [...returnArr] })
    }
    setTimeout(() => {
      getStops();
    }, 30000);
  }, [filteredStopList, location.lat, location.lng]);

  const getRoutes = (): void => {
    const returnArr: Route[] = []
    routeList.Gtfs?.forEach((e) => {
      returnArr.push(e)
    })
    setFilteredRouteList({ ...setFilteredRouteList, Gtfs: [...returnArr] })
  }

  const stopDisplayTemp = filteredStopList.Gtfs?.map((item, index) => {
    return (
      <StopInfo
        key={index}
        stopName={item.stop_name}
        color={'00000'}
        textColor={'black'}
      ></StopInfo>
    )
  })

  const routesDisplayTemp = filteredRouteList.Gtfs?.map((item, index) => {
    return (
      <RoutesCards
        key={index}
        routeName={item.route_long_name}
        routeID={item.route_id}
        color={'00000'}
        textColor={'black'}
      ></RoutesCards>
    )
  })

  return (
      <div>Home page!<br></br>
        <div className='inline-block mx-auto'>List of Stops:
          <div className='border-2 border-red-500 rounded-lg align-center'>{stopDisplayTemp}</div>
        </div>
      </div>
  )
};

export default Home;
