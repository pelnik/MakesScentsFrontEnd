import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Home, Products, SingleProduct } from './';

import { getTokenFromLocalStorage } from '../utils';

const Main = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(getTokenFromLocalStorage());
  }, []);

  return (
    <div id="main">
      <Navbar />
      <div id="page">
        <Routes>
          <Route exact path="/" token={token} element={<Home />} />
          <Route path='/products' token={token} element={<Products />}/>
          <Route path='/products/:product_id' element={<SingleProduct />}/>
        </Routes>
      </div>
    </div>
  );
};

export default Main;
