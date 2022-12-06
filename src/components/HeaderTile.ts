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
    className: 'inline-block w-100% p-5 rounded-md hover:bg-slate-200 font-medium text-gray-900 dark:text-gray-300',
  }, e('a', { className: 'text-center text', href: link }, title));
}

export default HeaderTile;
