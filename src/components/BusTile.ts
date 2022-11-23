import React, { useState } from 'react';
// import BusInfoCard from './BusInfoCard';

// defining the component props
interface Props {
  busName: string
  busId: string
  color: string
  textColor: string
}

// this makes using this function MUCH cleaner
const e = React.createElement;

const BusTile: React.FC<Props> = ({ busName, color, textColor, busId }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);

  const openCard = (): void => {
    setIsCardOpen(!isCardOpen);
    console.log(`Click handled for: ${busName} ${busId}!`);
    console.log(isCardOpen)
  }

  return e('div', {
    onClick: openCard,
    className: 'p-5 rounded-sm hover:border-2 h-14 shadow-sm relative transition-opacity duration-75',
    style: { backgroundColor: `#${color}`, color: `#${textColor}` },
  }, e('p', { className: 'text-center text-xl' }, busName));
}

export default BusTile;
