import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch'
import { TimedTrip } from '../interfaces'
// defining the component props

interface Props {
  busNumber: string // this is actually the bus number
  busName: string
  color: string
  textColor: string
  trips: TimedTrip[]
}

const RouteInfoCard: React.FC<Props> = ({ busName, busNumber, color, textColor, trips }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ backgroundColor: `#${color}`, color: `#${textColor}` }} className='flex-col rounded-md justify-between'>
      <div className='p-5 mx-auto relative transition ease-in-out delay-75 flex justify-between'>
          <p className='text-l'>{ busNumber }</p>
          <p className='text-l'>{ busName }</p>
          <p className='text-l'>10:10</p>
          {<ToggleSwitch checked={checked} onChange={ setChecked }/>}
      </div>
    </div>
  );
}

export default RouteInfoCard;
