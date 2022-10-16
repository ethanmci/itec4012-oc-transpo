import React from 'react';
import Header from '../Header';
import { Outlet } from 'react-router-dom';
import './Layout.css';

// defining the component props
interface Props {
  children?: React.ReactNode
}

// this component wraps everything, we can put headers or footers here
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
}

export default Layout;
