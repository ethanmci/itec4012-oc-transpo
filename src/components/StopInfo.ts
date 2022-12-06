import React from 'react';
// import BusInfoCard from './BusInfoCard';

// defining the component props
interface Props {
  stopName: string
  color: string
  textColor: string
}

// this makes using this function MUCH cleaner
const e = React.createElement;

const StopInfo: React.FC<Props> = ({ stopName, color, textColor }) => {
  return e('div', {
    onClick: () => console.log(`Click handled for: ${stopName}!`),
    className: 'p-5 rounded-sm hover:border-2 h-14 shadow-sm relative transition-opacity duration-75',
    style: { backgroundColor: `#${color}`, color: `#${textColor}` },
  }, e('button', { className: 'text-center text-xl' }, stopName))
}

export default StopInfo;
