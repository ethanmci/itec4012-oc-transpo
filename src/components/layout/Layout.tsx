import React from 'react';
import Header from '../Header';
import { Outlet } from 'react-router-dom';
import './Layout.css';

// this component wraps everything, we can put headers or footers here
const Layout: React.FC = () => {
  return (
    <div id='layout' className='h-screen flex flex-col'>
      <Header/>
      <Outlet/>
    </div>
  );
}

export default Layout;
