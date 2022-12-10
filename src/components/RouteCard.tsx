import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch'
// defining the component props

interface Props {
  busNumber: string // this is actually the bus number
  busName: string[]
  color: string
  textColor: string
  multiDirection: boolean
  stopTime: string
}

const RouteInfoCard: React.FC<Props> = ({ busName, busNumber, color, textColor, stopTime, multiDirection }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ backgroundColor: `#${color}`, color: `#${textColor}` }} className='flex-col rounded-md justify-between'>
      <div className='p-5 mx-auto relative transition ease-in-out delay-75 flex justify-between'>
          <p className='text-l'>{ busNumber }</p>
          <p className='text-l'>{ multiDirection ? checked ? busName[1] : busName[0] : busName[0]}</p>
          <p className='text-l'>{stopTime}</p>
          {<ToggleSwitch enabled={multiDirection} checked={checked} onChange={ setChecked }/>}
      </div>
    </div>
  );
}

export default RouteInfoCard;
