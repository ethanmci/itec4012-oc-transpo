import React, { useEffect, useState } from 'react';
import ToggleSwitch from './ToggleSwitch'
import { useSelectedContext } from '../contexts/CardInfoContext'
// defining the component props
interface Props {
  busName: string // this is actually the bus number
  busId: string
  color: string
  textColor: string
}
// this makes using this function MUCH cleaner
// const e = React.createElement;

interface Trip {
  route_id: string
  service_id: string
  trip_id: string
  trip_headsign: string
  direction_id: string
  block_id: string
  shape_id: string
}

interface BusName {
  number: string
  id: string
  direction: string
  name: string
}

interface GtfsQuery {
  Query?: object
  Gtfs?: Trip[]
}

const BusCard: React.FC<Props> = ({ busName, color, textColor, busId }) => {
  const { val, changeValue } = useSelectedContext();
  // query trips and filter by ID, get name and direciton
  const [busTrips, setBusTrips] = useState<BusName[]>([]);
  const [tripList, setTripList] = useState<GtfsQuery>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (Object.keys(tripList).length !== 0) return

    void fetch(`${
      (process.env.NODE_ENV ?? 'development') === 'development'
        ? 'https://api.allorigins.win/get?url='
        : ''
    }
    ${encodeURIComponent(
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
        setTripList(JSON.parse(data.contents))
      })
  }, [])

  useEffect(() => {
    tripList.Gtfs?.forEach((item) => {
      // const test: BusName = { direction: '', name: '', id: '', number: '' };
      if (item.route_id === busId) {
        const newName: BusName = { direction: item.direction_id, name: item.trip_headsign, number: busName, id: busId }
        busTrips.push(newName)
      }
    });
    if (busTrips.length > 1) {
      setBusTrips([busTrips[0], busTrips[busTrips.length - 1]])
    }
  }, [tripList])

  useEffect(() => {
    console.log('checked = ' + checked.toString());
    // No idea why this doesn't work
    if (changeValue !== undefined) changeValue(!val)
    console.log('Context checked value = ' + val.toString())
  }, [checked])
  return (
    <div>
      <div style={{ backgroundColor: `#${color}`, color: `#${textColor}` }} className='p-5 rounded-md h-16 hover:border-2 hover:border-white relative transition ease-in-out delay-75 flex justify-between'>
        <p className='text-l p-5'>{ busTrips.length !== 0 ? checked ? busTrips[0].number : busTrips[1].number : null}</p>
        <p className='text-l p-5'>{ busTrips.length !== 0 ? checked ? busTrips[0].name : busTrips[1].name : null}</p>
        {<ToggleSwitch checked={checked} onChange={ setChecked }/>}
      </div>
    </div>
  );
}

export default BusCard;
