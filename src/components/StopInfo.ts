import React from 'react';
import '../styles/StopInfo.css'

// defining the component props
interface Props {
  stopName: string
  color: string
  textColor: string
}

// this makes using this function MUCH cleaner
const e = React.createElement;

const StopInfo: React.FC<Props> = ({ stopName, color, textColor }) => {
  const openCard = (): void => {
    console.log(`Click handled for: ${stopName}!`)
  }

  return e('div', {
    onClick: openCard,
    className: 'p-3 rounded-sm hover:border-2 h-14 shadow-sm relative transition-opacity duration-75',
    style: { backgroundColor: `#${color}`, color: `#${textColor}` },
  }, e('p', { className: 'text-center text-xs' }, stopName))
}

export default StopInfo;
