import React, { useEffect, useState } from 'react'
import BusMap from '../components/BusMap'
import BusTile from '../components/BusTile'
import { Bus } from '../interfaces'
// import SearchBar from '../components/SearchBar'; reimport later
interface Props {
  tempProp?: object
}
interface GtfsBusQuery {
  Query?: object
  Gtfs?: Bus[]
}

const BusList: React.FC<Props> = ({ tempProp }) => {
  // const radius: number = 8;

  const [routeList, setRouteList] = useState<GtfsBusQuery>({})
  const [filteredRouteList, setFilteredRouteList] = useState<GtfsBusQuery>({})
  const [location, setLocation] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });

  // a bit scuffed to look at but this bypasses some CORS rules that give trouble during dev, copy this for any api calls
  // the extra api.allorigins.win is bypassed when in production
  useEffect(() => {
    if (Object.keys(routeList).length !== 0) return

    void fetch(`${
      (process.env.NODE_ENV ?? 'development') === 'development'
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
        setFilteredRouteList(JSON.parse(data.contents))
      })
  }, [])

  // setting the current position
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
      setLocation({ ...location, lat: pos.coords.latitude, lng: pos.coords.longitude });
    })
  }, [])

  const busDisplayTemp = filteredRouteList.Gtfs?.map((item, index) => {
    return (
      <BusTile
        key={index}
        busName={item.route_short_name}
        color={item.route_color}
        textColor={item.route_text_color}
      ></BusTile>
    )
  })

  const filterBuses = (input: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(input.target.value)
    const inputValue = input.target.value.trim()
    const returnArr: Bus[] = []
    routeList.Gtfs?.forEach((e) => {
      if (e.route_short_name.includes(inputValue)) returnArr.push(e)
    })
    setFilteredRouteList({ ...setFilteredRouteList, Gtfs: [...returnArr] })
  }

  return (
    <div className='overflow-hidden grow'>
      <div className='w-full h-3/5 shadow-inner'>
        <BusMap selectedBus={'none'} location={ location }></BusMap>
      </div>
      <div className="relative">
        <form
          className="absolute w-2/3 flex grow items-start gap-1 z-50 inset-x-1/2"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <input
            onChange={(e) => filterBuses(e)}
            className="flex-auto h-14 p-2 border-solid border-2 text-xl border-slate-600 rounded-md shadow-md"
            type="text"
            name="bus-search"
          />
        </form>
      </div>
      {/* TODO FIX THIS OML */}
      <div className="w-full pb-10 md:px-44 px-4">
        <div className="p-10 bg-slate-900 rounded-lg">
          <div className="bg-slate-900 h-56 rounded-lg overflow-hidden overflow-y-scroll">
            <div className="grid md:grid-cols-5 grid-cols-1 grid-rows-min gap-2 p-4 h-fit">
              { busDisplayTemp }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusList;
