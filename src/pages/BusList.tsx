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

  // a bit scuffed to look at but this bypasses some CORS rules that give trouble during dev, copy this for any api calls
  // the extra api.allorigins.win is bypassed when in production
  useEffect(() => {
    if (Object.keys(routeList).length !== 0) {
      return;
    }

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
      });
  }, []);

  const busDisplayTemp = routeList.Gtfs?.map((key, index) => {
    return (
      <BusCard
        key={index}
        busName={key.route_short_name}
        color={key.route_color}
        textColor={key.route_color}
      ></BusCard>
    );
  });

  return (
    <>
      The bus list would be here!
      { busDisplayTemp }
    </>
  );
};

export default BusList;
