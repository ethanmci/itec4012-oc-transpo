import React, { useEffect, useState } from 'react';
import StopInfo from '../components/StopInfo'
import RouteInfoCard from '../components/RouteCard'
import BusMap from '../components/BusMap';
import { Route, Trip, Stop, GtfsStopQuery, GtfsRouteQuery } from '../interfaces';
// import StopInfoCard, { IStopInfoCard } from '../components/StopInfoCard'
// import { StopContextProvider } from '../contexts/StopCardContext';
/*
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
*/
interface GtfsTripQuery {
  Query?: object
  Gtfs?: Trip[]
}

const refreshMS: number = 30000
const radius: number = 0.00225225 * 2 // increased bc I don't think that's 500m w/o the multiplier

const Home: React.FC = () => {
  const [location, setLocation] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
  const [stopList, setStopList] = useState<GtfsStopQuery>({});
  const [filteredStopList, setFilteredStopList] = useState<GtfsStopQuery>({});
  const [routeList, setRouteList] = useState<GtfsRouteQuery>({});
  const [selectedStop, setSelectedStop] = useState<Stop>();
  const [isStopSelected, setIsStopSelected] = useState<boolean>(false)
  const [tripList, setTripList] = useState<GtfsTripQuery>({})
  const [activeStopRoutes, setActiveStopRoutes] = useState<Route[]>()
  // const [filteredRouteList, setFilteredRouteList] = useState<GtfsRouteQuery>({});
  // const [inboundTrip, setInboundTrip] = useState<GtfsTripQuery>({});
  /* const [isStopCardOpen, setStopCardOpen] = useState<boolean>(false)
  const [activeStopCard, setActiveStopCard] = useState<IStopInfoCard>({
    stopName: '',
    textColor: '',
    color: '',
  }) */
  // isStopCardOpen, setStopCardOpen, activeStopCard, setActiveStopCard

  const updateLocation = (): void => {
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
      setLocation({ ...location, lat: pos.coords.latitude, lng: pos.coords.longitude });
    })
  }

  const getStops = (): void => {
    const returnArr: Stop[] = []
    stopList.Gtfs?.forEach((e) => {
      const lat: number = parseFloat(e.stop_lat)
      const lon: number = parseFloat(e.stop_lon)
      if (withinRange(location.lat, lat, location.lng, lon)) {
        returnArr.push(e)
      }
    })
    setFilteredStopList({ ...setFilteredStopList, Gtfs: [...returnArr] })
  }

  // called by the bus map component
  const setStop = (stop: Stop): void => {
    setSelectedStop({ ...stop })
    setIsStopSelected(true)
    console.log(selectedStop)
  }

  // getting all stops
  useEffect(() => {
    if (Object.keys(stopList).length !== 0) return

    void fetch(`${(process.env.NODE_ENV ?? 'development') === 'development'
      ? 'https://damp-falls-69769.herokuapp.com/'
      : ''
      }${encodeURI(
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
        setStopList(JSON.parse(JSON.stringify(data)))
      })
  }, [])

  // Fetching the trips (to get the bus names) here so that it is not done each time a bus card is fetched
  useEffect(() => {
    if (Object.keys(tripList).length !== 0) return

    void fetch(`${
      (process.env.NODE_ENV ?? 'development') === 'development'
        ? 'https://damp-falls-69769.herokuapp.com/'
        : ''
    }${encodeURI(
      `https://api.octranspo1.com/v2.0/Gtfs?${new URLSearchParams({
        appID: process.env.REACT_APP_OC_APP_ID ?? 'KEY_NOT_FOUND',
        apiKey: process.env.REACT_APP_OC_API_KEY ?? 'KEY_NOT_FOUND',
        table: 'trips',
        format: 'json',
      }).toString()}`,
    )}`)
      .then(async (response) => {
        if (response.ok) return await response.json()
        throw new Error('Network response was not ok.')
      })
      .then((data) => {
        setTripList(JSON.parse(JSON.stringify(data)))
      })
  }, [])

  // For routes
  useEffect(() => {
    if (Object.keys(routeList).length !== 0) return

    void fetch(`${(process.env.NODE_ENV ?? 'development') === 'development'
      ? 'https://damp-falls-69769.herokuapp.com/'
      : ''
      }${encodeURI(
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
        setRouteList(JSON.parse(JSON.stringify(data)))
      })
  }, [])

  // initializing position on load
  useEffect(() => {
    updateLocation();
    getStops();
    findClosestStop();
  }, [stopList])

  useEffect(() => {
    if (selectedStop === undefined) return
    void fetch(`${
      (process.env.NODE_ENV ?? 'development') === 'development'
        ? 'https://damp-falls-69769.herokuapp.com/'
        : ''
    }${encodeURI(
      `https://api.octranspo1.com/v2.0/GetNextTripsForStopAllRoutes?${new URLSearchParams({
        appID: process.env.REACT_APP_OC_APP_ID ?? 'KEY_NOT_FOUND',
        apiKey: process.env.REACT_APP_OC_API_KEY ?? 'KEY_NOT_FOUND',
        stopNo: selectedStop.stop_code,
        format: 'json',
      }).toString()}`,
    )}`)
      .then(async (response) => {
        if (response.ok) return await response.json()
        throw new Error('Network response was not ok.')
      })
      .then((data) => {
        const routeData = JSON.parse(JSON.stringify(data)).GetRouteSummaryForStopResult.Routes.Route
        console.log(routeData)
        if (Array.isArray(routeData)) {
          setActiveStopRoutes(routeData)
        } else {
          setActiveStopRoutes([routeData])
        }
      })
  }, [selectedStop])

  useEffect(() => {
    console.log(activeStopRoutes)
  }, [activeStopRoutes])
  // refreshing the location + stops in range
  // stopList dependency is so that it starts when the stopList is properly loaded
  useEffect(() => {
    const interval = setInterval(() => {
      updateLocation();
      getStops();
    }, refreshMS);

    return () => clearInterval(interval)
  }, [stopList]);

  const withinRange = (curLat: number, lat: number, curLon: number, lon: number): boolean => {
    // moved radius to another value
    if (lat <= (curLat + radius) && lat >= (curLat - radius) &&
      lon <= (curLon + radius) && lon >= (curLon - radius)) return true;
    return false;
  }

  const findClosestStop = (): void => {
    if (filteredStopList.Gtfs === undefined) return
    if (filteredStopList.Gtfs.length === 0) return
    let closestStop = filteredStopList.Gtfs?.[0]
    let shortestDistance = calculateDistanceBetweenPoints(location, { lat: parseFloat(closestStop.stop_lat), lng: parseFloat(closestStop.stop_lon) });
    filteredStopList.Gtfs.forEach((stop) => {
      const distance = calculateDistanceBetweenPoints(location, { lat: parseFloat(stop.stop_lat), lng: parseFloat(stop.stop_lon) })
      if (distance < shortestDistance) {
        shortestDistance = distance
        closestStop = stop
      }
    })
    console.log(closestStop)
    setSelectedStop(closestStop)
    setIsStopSelected(true)
  }

  const calculateDistanceBetweenPoints = (loc1: google.maps.LatLngLiteral, loc2: google.maps.LatLngLiteral): number => {
    return Math.hypot(loc2.lat - loc1.lat, loc2.lng - loc1.lng)
  }

  /*
  const getRoutes = (): void => {
    const returnArr: Route[] = []
    routeList.Gtfs?.forEach((e) => {
      returnArr.push(e)
    })
    setFilteredRouteList({ ...setFilteredRouteList, Gtfs: [...returnArr] })
  }
  */

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stopDisplayTemp = filteredStopList.Gtfs?.map((item, index) => {
    return (
      <StopInfo
        key={index}
        stopName={item.stop_name}
        color={'DA291C'}
        textColor={'FFFFFF'}
      ></StopInfo>
    )
  })

  // Fine to make this O(n2) because this will only ever be used for arrays of size 3 (returned from API call)
  const getMultiDirectionNames = (routeNo: string): string[] => {
    const foundItems: string[] = []
    activeStopRoutes?.forEach((item) => {
      if (item.RouteNo === routeNo) foundItems.push(item.RouteHeading)
      if (foundItems.length === 2) return foundItems
    })
    return foundItems
  }

  const routesDisplay = activeStopRoutes?.map((item) => {
    if (item.Trips === undefined) return null
    console.log(item.Trips)
    const retVal: any = [];
    let index = 0
    if (Array.isArray(item.Trips)) {
      item.Trips.forEach((trip) => {
        retVal.push(
          <RouteInfoCard
           key={index++}
           busName={ getMultiDirectionNames(item.RouteNo)} // checks if both directions go to this stop and if so allows toggling
           busNumber={item.RouteNo}
           color='DA291C'
           textColor='FFFFFF'
           multiDirection={true}
           stopTime={ trip.TripStartTime }></RouteInfoCard>)
      })
    } else {
      item.Trips?.Trip.forEach((trip) => {
        retVal.push(
          <RouteInfoCard
           key={index++}
           busName={ getMultiDirectionNames(item.RouteNo)} // checks if both directions go to this stop and if so allows toggling
           busNumber={item.RouteNo}
           color='DA291C'
           textColor='FFFFFF'
           multiDirection={true}
           stopTime={ trip.TripStartTime }></RouteInfoCard>)
      })
    }
    return retVal
  })
  /*
  // commented out for now
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
  */

  return (
    <div className="overflow-hidden grow">
      <div className="w-full h-3/5 shadow-inner">
        <BusMap
          stops={filteredStopList.Gtfs}
          setStop={setStop}
          location={location}
        />
      </div>
      <div className="relative">
        <div
          className="absolute w-2/3 flex grow items-start gap-1 z-50 inset-x-1/2"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className="flex-auto h-14 p-2 border-solid border-2 text-xl bg-slate-100 align-middle rounded-md shadow-md">
            <div className='flex justify-between'>
              <h2 className='px-5'>{isStopSelected && selectedStop?.stop_name }</h2>
              <h2 className='px-5'>{isStopSelected && selectedStop?.stop_code }</h2>
            </div>
          </div>
          {isStopSelected &&
            <div onClick={() => setIsStopSelected(false)} className="grow-0 h-14 w-16 p-2 border-solid border-2 text-xl bg-red-700 hover:bg-red-900 align-middle rounded-md shadow-md">
              <a className='text-center align-middle h-full'>Close</a>
            </div>
          }
        </div>
      </div>
      <div className="w-full pb-10 md:px-44 px-4">
        <div className="p-10 bg-slate-900 rounded-lg">
        {/* isStopCardOpen && (
              <StopInfoCard
                stopName={activeStopCard.stopName}
                color={activeStopCard.color}
                textColor={activeStopCard.textColor}
              ></StopInfoCard>
        ) */}
          <div className="bg-slate-900 h-56 rounded-lg overflow-hidden overflow-y-scroll">
            <div className="grid md:grid-cols-1 grid-cols-1 grid-rows-min gap-2 p-4 h-fit">
              { isStopSelected && routesDisplay }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;
