import React, { useEffect, useState } from 'react';
import BusCard from '../components/BusCard';

// nothing for now, just setting this up for later(?)
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
  const [routeList, setRouteList] = useState<GtfsQuery>({});
  const [filteredRouteList, setFilteredRouteList] = useState<GtfsQuery>({});

  // a bit scuffed to look at but this bypasses some CORS rules that give trouble during dev, copy this for any api calls
  // the extra api.allorigins.win is bypassed when in production
  useEffect(() => {
    if (Object.keys(routeList).length !== 0) return;

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
        format: 'json'
      }).toString()}`
    )}`)
      .then(async (response) => {
        if (response.ok) return await response.json();
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        setRouteList(JSON.parse(data.contents));
        setFilteredRouteList(JSON.parse(data.contents));
      });
  }, []);

  console.log(routeList);

  const busDisplayTemp = filteredRouteList.Gtfs?.map((key, index) => {
    return (
      <BusCard
        key={index}
        busName={key.route_short_name}
        color={key.route_color}
        textColor={key.route_text_color}
      ></BusCard>
    );
  });

  const filterBuses = (input: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(input.target.value);
    const inputValue = input.target.value.trim();
    const returnArr: Bus[] = [];
    routeList.Gtfs?.forEach(e => {
      if (e.route_short_name.includes(inputValue)) returnArr.push(e);
    });
    setFilteredRouteList({ ...setFilteredRouteList, Gtfs: [...returnArr] });
  }

  return (
    <>
      <div className='relative'>
        <form className='absolute w-2/3 flex grow items-start gap-1 z-50 inset-x-1/2' style={{ transform: 'translate(-50%, 0)' }}>
          <input onChange={(e) => filterBuses(e)} className='flex-auto h-14 p-2 border-solid border-2 text-xl border-slate-600 rounded-md shadow-md' type='text' name='bus-search' />
        </form>
      </div>
      { /* TODO FIX THIS OML */ }
      <div className='w-full py-10 md:px-44 px-4'>
        <div className='pt-10 bg-slate-900 rounded-lg h-64 overflow-y'>
          <div className='grid md:grid-cols-5 grid-cols-1 gap-2 p-4 h-full'>
            { busDisplayTemp }
          </div>
        </div>
      </div>
    </>
  );
};

export default BusList;
