import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  Navbar,
  Home,
  LoginRegister,
  Cart,
  Checkout,
  Products,
  SingleProduct,
  NewProduct,
  UserProfile,
  EditProfile,
  EditProduct,
} from './';

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
  const [selectedProduct, setSelectedProduct] = useState({});

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
    <div id='main'>
      <Navbar />
      <div id='page'>
        <Routes>
          <Route exact path='/' element={<Home token={token} user={user} />} />
          <Route
            path='/loginregister'
            element={<LoginRegister setToken={setToken} setUser={setUser} />}
          />

          <Route
            path='/cart'
            element={<Cart token={token} cart={cart} setCart={setCart} />}
          />
          <Route
            path='/checkout'
            element={<Checkout token={token} cart={cart} setCart={setCart} />}
          />
          <Route
            path='/products'
            element={
              <Products
                token={token}
                user={user}
                setSelectedProduct={setSelectedProduct}
              />
            }
          />
          <Route
            path='/products/:product_id'
            element={
              <SingleProduct
                selectedProduct={selectedProduct}
              />
            }
          />
          <Route
            path='/products/new'
            element={<NewProduct token={token} user={user} />}
          />
          <Route
            path='/products/edit/:product_id'
            element={
              <EditProduct
                token={token}
                user={user}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
              />
            }
          />
          <Route path='/profile' element={<UserProfile user={user} />} />
          <Route
            path='/profile/edit-profile/:id'
            element={
              <EditProfile user={user} token={token} getUsers={getUsers} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};
export default Main;
