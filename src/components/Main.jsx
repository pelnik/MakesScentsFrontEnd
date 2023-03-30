import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Home } from './';

import { getTokenFromLocalStorage } from '../utils';

const Main = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(getTokenFromLocalStorage());
  }, []);

    return(
        <div id="main">
            <Navbar />
            <div id="page">
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/loginregister" element={<LoginRegister/>}/>
                </Routes>
            </div>
        </div>
    )
    }
