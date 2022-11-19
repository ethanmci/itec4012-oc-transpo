import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/layout/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BusList from './pages/BusList';
import ComponentLab from './pages/ComponentLab'; // will never appear in header, must be manually accessed
import './index.css';

const devIncludes =
  (process.env.NODE_ENV ?? 'development') === 'development' ? <Route path='/component_lab' element={<ComponentLab/>}/> : <></>

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/list' element={<BusList/>}/>
          { devIncludes }
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
