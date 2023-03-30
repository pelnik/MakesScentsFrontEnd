import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar, Home, LoginRegister, Cart } from './';

import { getTokenFromLocalStorage } from '../utils';

const Main = () => {
  const [token, setToken] = useState('');
  const [cart, setCart] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    setToken(getTokenFromLocalStorage());
  }, []);

    return(
        <div id="main">
            <Navbar />
            <div id="page">
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/loginregister" element={<LoginRegister setToken={setToken} setUser={setUser}/>}/>
                    <Route path="/cart" element={<Cart token={token} />} />
                </Routes>
            </div>
        </div>
    )
    }
    export default Main
