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
  NotFound,
  AdminUsersPage,
  EditUser,
  EditProduct,
} from './';

import { usersMe, getActiveCart } from '../apiAdapters';
import { getTokenFromLocalStorage, saveToLocalStorage } from '../utils';

let loads = 0;

// React docs recommend checking the first load like this
// https://react.dev/learn/you-might-not-need-an-effect
let initialLoad = true;
const initialLocalToken = getTokenFromLocalStorage();

const Main = () => {
  loads += 1;
  console.log('loads', loads);

  const [cart, setCart] = useState({});
  const [token, setToken] = useState(initialLocalToken);
  const [user, setUser] = useState({});
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

  async function getUser(token) {
    try {
      const result = await usersMe(token);

      if (result.success) {
        return result.user;
      } else {
        console.error('Could not get user.');
        return {};
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getCart(token) {
    try {
      const response = await getActiveCart(token);
      const cart = response.cart;

      if (response.success) {
        return cart;
      } else {
        console.error('error getting cart');
        return {};
      }
    } catch (error) {
      console.error('error getting cart', error);
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
        getCart(token);
      }
    }
  }

  async function firstLoad() {
    let user = {};
    let cart = {};

    if (token) {
      user = await getUser(token);
      if (user) {
        cart = await getCart(token);
      }
      setUser(user);
      setCart(cart);
    }
    loading = false;
    console.log('loading', loading);
  }

  useEffect(() => {
    firstLoad();
  }, []);

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
          <Route
            path="/products"
            element={
              <Products
                token={token}
                user={user}
                setSelectedProduct={setSelectedProduct}
              />
            }
          />
          <Route
            path="/products/:product_id"
            element={<SingleProduct selectedProduct={selectedProduct} />}
          />
          <Route
            path="/products/new"
            element={<NewProduct token={token} user={user} />}
          />
          <Route
            path="/products/edit/:product_id"
            element={
              <EditProduct
                token={token}
                user={user}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
              />
            }
          />
          <Route path="/profile" element={<UserProfile user={user} />} />
          <Route
            path="/profile/edit-profile/:id"
            element={
              <EditProfile user={user} token={token} getUser={getUser} />
            }
          />
          <Route
            path="/admin-users"
            element={<AdminUsersPage token={token} />}
          />
          <Route
            path="/admin-users/edit-user/:id"
            element={<EditUser user={user} token={token} getUser={getUser} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};
export default Main;
