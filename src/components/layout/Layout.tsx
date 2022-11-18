import React from 'react';
import Header from '../Header';
import { Outlet } from 'react-router-dom';
import './Layout.css';

// this component wraps everything, we can put headers or footers here
const Layout: React.FC = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
}

export default Layout;
