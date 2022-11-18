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
    className: 'p-5 rounded-md hover:border-2 h-14 shadow-sm relative',
    style: { backgroundColor: `#${color}`, color: `#${textColor}` }
  }, e('p', { className: 'text-center text-xl' }, busName));
}

export default BusTile;
