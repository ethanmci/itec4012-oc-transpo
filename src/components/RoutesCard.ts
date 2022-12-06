import React from 'react';
// import BusInfoCard from './BusInfoCard';

// defining the component props
interface Props {
  routeID: string
  routeName: string
  color: string
  textColor: string
}

// this makes using this function MUCH cleaner
const e = React.createElement;

const RouteInfo: React.FC<Props> = ({ routeID, routeName, color, textColor }) => {
  return e('div', {
    onClick: () => getRoutes,
    className: 'p-5 rounded-sm hover:border-2 h-14 shadow-sm relative transition-opacity duration-75',
    style: { backgroundColor: `#${color}`, color: `#${textColor}` },
  }, e('p', { className: 'text-center text-xl' }, routeName + routeID))
}

export default RouteInfo;
