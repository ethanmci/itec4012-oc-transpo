import React from 'react';
// import BusInfoCard from './BusInfoCard';

// defining the component props
interface Props {
  title: string
  link: string
}

// this makes using this function MUCH cleaner
const e = React.createElement;

const HeaderTile: React.FC<Props> = ({ title, link }) => {
  return e('div', {
    className: 'p-5 rounded-md hover:border-2 h-14 shadow-sm relative'
  }, e('a', { className: 'text-center text-xl', href: link }, title));
}

export default HeaderTile;
