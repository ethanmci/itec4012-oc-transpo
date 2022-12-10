import React, { useEffect, useState } from 'react';
import { useCardContext } from '../contexts/BusCardContext';
import ToggleSwitch from './ToggleSwitch'
import { BusName, IBusInfoCard } from '../interfaces';
// defining the component props

const BusInfoCard: React.FC<IBusInfoCard> = ({ busName, color, textColor, busId, tripList }) => {
  const [busTrips, setBusTrips] = useState<BusName[]>([]);
  const [checked, setChecked] = useState(false);
  const [directionName, setDirectionName] = useState('')
  const cardContext = useCardContext()

  useEffect(() => {
    busTrips.length = 0
    if (tripList === undefined) return
    tripList.every((item) => {
      if (item.route_id === busId) {
        const newName: BusName = { direction: item.direction_id, name: item.trip_headsign, number: busName, id: busId }
        if (busTrips.length === 0) {
          busTrips.push(newName)
        } else {
          if (item.direction_id !== busTrips[0].direction) {
            busTrips.push(newName)
            return false
          }
        }
      }
      return true
    })
    setBusTrips(busTrips)
    setDirectionName(displayBusName())
    setChecked(false)
  }, [cardContext?.activeBusCard])

  useEffect(() => {
    setDirectionName(displayBusName())
    // Do other things that would change when the bus directions changes
  }, [checked])

  const displayBusName = (): string => {
    if (busTrips.length === 0) return ''
    if (checked) {
      return busTrips[0].name
    } else {
      return busTrips[1].name
    }
  }

  const closeCard = (): void => {
    cardContext?.setCardOpen(false)
  }

  return (
    <div style={{ backgroundColor: `#${color}`, color: `#${textColor}` }} className='flex-col rounded-md justify-between'>
      <div className='py-5 mx-auto relative transition ease-in-out delay-75 flex justify-around'>
          <p className='text-l'>{ busName }</p>
          <p className='text-l'>{ directionName }</p>
          {<ToggleSwitch enabled={true} checked={checked} onChange={ setChecked }/>}
          <button
            onClick={closeCard}
            style={{ backgroundColor: `#${textColor}`, color: `#${color}` }}
            className='hover:bg-grey-100 font-bold rounded-full px-5'> X
          </button>
      </div>
      <div className='p-5'>
        Information about the Busses goes here
      </div>
    </div>
  );
}

export default BusInfoCard;
