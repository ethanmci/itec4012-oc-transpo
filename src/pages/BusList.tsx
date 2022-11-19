import React, { useEffect, useState } from 'react'
import BusTile from '../components/BusTile'
// import SearchBar from '../components/SearchBar'; reimport later
interface Props {
  tempProp?: object
}

interface Bus {
  route_color: string
  route_desc: string
  route_id: string
  route_long_name: string
  route_short_name: string
  route_text_color: string
  route_type: string
  route_url: string
}

interface GtfsQuery {
  Query?: object
  Gtfs?: Bus[]
}

const BusList: React.FC<Props> = ({ tempProp }) => {
  // const radius: number = 8;

  const [routeList, setRouteList] = useState<GtfsQuery>({})
  const [filteredRouteList, setFilteredRouteList] = useState<GtfsQuery>({})

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

  // temporary
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos)
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
      <div className='w-full h-3/5 bg-slate-500 shadow-inner'>
        the map will be here!
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
