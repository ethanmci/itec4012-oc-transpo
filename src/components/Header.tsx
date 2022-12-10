import React from 'react';
import HeaderTile from './HeaderTile';

const headerLinks = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Bus Search',
    link: '/list',
  },
  {
    title: 'About',
    link: '/About',
  },
];

const Header: React.FC = () => {
  const headerTiles = headerLinks.map((val, index) => {
    return <HeaderTile title={val.title} link={val.link} key={index}></HeaderTile>
  });

  return (<><head>
    <link href="/dist/output.css" rel="stylesheet"></link></head><nav>
      {headerTiles}
    </nav></>
  );
};

export default Header;
