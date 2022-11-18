import React from 'react';

// defining the component props
interface Props {
  busName: string
  color: string
  textColor: string
}

// this makes using this function MUCH cleaner
const e = React.createElement;

const BusCard: React.FC<Props> = ({ busName, color, textColor }) => {
  return e('form', {
    className: 'p-5 rounded-md h-16 hover:border-2 hover:border-white relative transition ease-in-out delay-75',
    style: { backgroundColor: `#${color}`, color: `#${textColor}` }
  }, e('p', { className: 'text-center text-l' }, busName));
}

export default BusCard;
