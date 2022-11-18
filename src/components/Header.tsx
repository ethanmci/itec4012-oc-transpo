import React from 'react';
import HeaderTile from './HeaderTile';

const headerLinks = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'Bus Search',
    link: '/list'
  }
];

const Header: React.FC = () => {
  const headerTiles = headerLinks.map((val, index) => {
    return <HeaderTile title={val.title} link={val.link} key={index}></HeaderTile>
  });
  return (
    <div>
      { headerTiles }
    </div>
  );
};

export default Header;
