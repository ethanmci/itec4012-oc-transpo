import React, { useState } from 'react';
import HeaderTile from './HeaderTile';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';

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
    link: '/about',
  },
];

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const headerTiles = headerLinks.map((val, index) => {
    return <HeaderTile title={val.title} link={val.link} key={index}></HeaderTile>
  });

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (<><head>
<<<<<<< Updated upstream
    <link href="/dist/output.css" rel="stylesheet"></link></head><nav className='navBar'>
      <ul className={`menuNav ${navbarOpen ? 'showMenu' : ''}`}>
        <button onClick={handleToggle}>
          {navbarOpen ? (<MdClose style={{ color: '#7b7b7b', width: '60px', height: '60px' }} />) : (<FiMenu style={{ color: '#7b7b7b', width: '60px', height: '60px' }}/>)} </button>
          <div id="header">{headerTiles}</div>
      </ul>
=======
    <link href="/dist/output.css" rel="stylesheet"></link></head>
    <nav>
      <div className="grid grid-cols-3 gap-0 col-md-3 text-white text-center sm:text-xl">
        {headerTiles}
      </div>
>>>>>>> Stashed changes
    </nav></>
  );
};

export default Header;
