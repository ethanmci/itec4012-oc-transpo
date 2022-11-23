import React, { useEffect, useState, useContext } from 'react';
import ToggleSwitch from './ToggleSwitch'
import { AppCtx } from '../contexts/CardInfoContext'
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isChecked, changeValue } = useContext(AppCtx);
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
    changeValue(true)
    console.log('isChecked = ' + isChecked.toString())
  }, [checked])
  /*
  return e('div', {
    className: 'p-5 rounded-md h-16 hover:border-2 hover:border-white relative transition ease-in-out delay-75 flex justify-between ',
    style: { backgroundColor: `#${color}`, color: `#${textColor}` },
  }, e('p', { className: 'align-middle text-l p-5' }, busName),
  e('p', { className: ' text-l p-5' }, givenName),
  e('p', { className: ' text-l p-5' }, direction),
  e('label', { className: 'inline-flex relative items-center cursor-pointer' },
    e('input', { type: 'checkbox', className: ' sr-only peer', value: '' }),
    e('div', { className: ' w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600' }),
    e('span', { className: ' ml-3 text-sm font-medium text-gray-900 dark:text-gray-300' }), direction)); */
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
