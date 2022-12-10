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
    className: 'flex justify-center bg-gray-900 text-white text-2xl',
  }, e('a', { className: 'text-center text', href: link }, title));
}

export default HeaderTile;
