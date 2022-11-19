import React from 'react';
// import BusInfoCard from './BusInfoCard';

// defining the component props
interface Props {
  busName: string
  color: string
  textColor: string
}

// this makes using this function MUCH cleaner
const e = React.createElement;

const BusTile: React.FC<Props> = ({ busName, color, textColor }) => {
  return e('div', {
    onClick: () => console.log(`Click handled for: ${busName}!`),
    className: 'p-5 rounded-sm hover:border-2 h-14 shadow-sm relative transition-opacity duration-75',
    style: { backgroundColor: `#${color}`, color: `#${textColor}` },
  }, e('p', { className: 'text-center text-xl' }, busName));
}

export default BusTile;
