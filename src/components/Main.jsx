import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar, Home, LoginRegister, Cart } from './';
import { usersMe } from '../apiAdapters';

import { getTokenFromLocalStorage } from '../utils';

const Main = () => {
  const [cart, setCart] = useState({});
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  async function getUsers() {
    try {
      const localStorageToken = getTokenFromLocalStorage();
      console.log('local storage token', localStorageToken);

      if (localStorageToken) {
        const result = await usersMe(localStorageToken);

        if (result.success) {
          setToken(localStorageToken);
          setUser(result.user);
        } else {
          console.error('Token in LS but user API failed.');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, [token]);

  return (
    <div id="main">
      <Navbar />
      <div id="page">
        <Routes>
          <Route exact path="/" element={<Home token={token} user={user} />} />
          <Route
            path="/loginregister"
            element={<LoginRegister setToken={setToken} setUser={setUser} />}
          />
          <Route path="/cart" element={<Cart token={token} />} />
        </Routes>
      </div>
    </div>
  );
};
export default Main;
