import React from 'react';
import { useCardContext } from '../contexts/BusCardContext';
// import BusInfoCard from './BusInfoCard';
import { IBusInfoCard } from '../components/BusInfoCard'

// defining the component props

// this makes using this function MUCH cleaner
const e = React.createElement;

const BusTile: React.FC<IBusInfoCard> = ({ busName, color, textColor, busId, tripList }) => {
  const cardContext = useCardContext();
  const openCard = (): void => {
    /* Add this code to allow switching between bus cards without closing them first
    if (cardContext?.activeBusCard.busId === busId) {
      cardContext?.setCardOpen(!cardContext?.isCardOpen)
      return
    } */
    const newActiveBus: IBusInfoCard = { busName, color, textColor, busId, tripList }
    cardContext?.setActiveBusCard(newActiveBus)
    cardContext?.setCardOpen(true)
  }

  return e('div', {
    onClick: openCard,
    className: 'p-5 rounded-sm hover:border-2 h-14 shadow-sm relative transition-opacity duration-75',
    style: { backgroundColor: `#${color}`, color: `#${textColor}` },
  }, e('p', { className: 'text-center text-xl' }, busName));
}

export default BusTile;
