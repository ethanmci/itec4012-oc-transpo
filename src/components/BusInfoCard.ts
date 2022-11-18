import React from 'react';

// defining the component props
interface Props {
  busName: string
  color: string
  textColor: string
}

// this makes using this function MUCH cleaner
const e = React.createElement;

const BusInfoCard: React.FC<Props> = ({ busName, color, textColor }) => {
  return e('div', {
    className: 'p-5 inline-block m-1 rounded-md md:w-1/12 w-1/3 h-14 shadow-sm relative',
    style: { backgroundColor: `#${color}`, color: `#${textColor}` }
  }, e('p', { className: 'text-center' }, busName));
}

export default BusInfoCard;
