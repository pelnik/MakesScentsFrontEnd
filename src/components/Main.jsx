import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';


import { Navbar, Home, LoginRegister, Cart, Checkout, Products, SingleProduct, NewProduct } from './';
import { usersMe } from '../apiAdapters';

import { getTokenFromLocalStorage, saveToLocalStorage } from '../utils';

const Main = () => {
  const defaultUser = {
    email: null,
    id: null,
    is_active: null,
    is_admin: null,
    name: null,
    username: null,
  };

  const [cart, setCart] = useState({});
  const [token, setToken] = useState('');
  const [user, setUser] = useState(defaultUser);

  async function checkUser(token) {
    try {
      if (token) {
        const result = await usersMe(token);

        if (result.success) {
          return true;
        } else {
          console.error('Token in LS but user API failed.');
          return false;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getUsers(token) {
    try {
      if (token) {
        const result = await usersMe(token);

        if (result.success) {
          setUser(result.user);
          return true;
        } else {
          console.error('Token in LS but user API failed.');
          return false;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function firstLoad() {
    const localStorageToken = getTokenFromLocalStorage();

    if (localStorageToken) {
      const userUpdated = await checkUser(localStorageToken);
      if (userUpdated) {
        setToken(localStorageToken);
      }
    }
  }

  async function tokenChange() {
    if (user !== defaultUser) {
      setUser(defaultUser);
    }
    if (token) {
      const userUpdated = await getUsers(token);
      if (userUpdated) {
        saveToLocalStorage(token);
      }
    }
  }

  useEffect(() => {
    firstLoad();
  }, []);

  useEffect(() => {
    tokenChange();
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
          <Route
            path="/cart"
            element={<Cart token={token} cart={cart} setCart={setCart} />}
          />
          <Route
            path="/checkout"
            element={<Checkout token={token} cart={cart} setCart={setCart} />}
          />
          <Route path='/products' element={<Products token={token} user={user}/>}/>
          <Route path='/products/:product_id' element={<SingleProduct />}/>
          <Route path='/products/new' element={<NewProduct token={token} user={user}/>}/>
        </Routes>
      </div>
    </div>
  );
};
export default Main;
