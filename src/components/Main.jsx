import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import {
  Navbar,
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

import { usersMe, getActiveCart, getAllCategories } from '../apiAdapters';
import { getTokenFromLocalStorage, saveToLocalStorage } from '../utils';

// React docs recommend checking the first load like this
// https://react.dev/learn/you-might-not-need-an-effect
let initialLoad = true;
const initialLocalToken = getTokenFromLocalStorage();

const Main = () => {
  const [cart, setCart] = useState({});
  const hasCart = Object.keys(cart).length > 0;
  const hasItems = hasCart && cart.items.length > 0;

  const [token, setToken] = useState(initialLocalToken);
  const [user, setUser] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  const [cartQuantities, setCartQuantities] = useState(
    createCartQuantities(cart)
  );

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

  // Cart stuff
  const [prevCartItems, setPrevCartItems] = useState(cart?.items);
  if (cart?.items !== prevCartItems) {
    setPrevCartItems(cart?.items);
    setCartQuantities(createCartQuantities(cart));
  }

  function createCartQuantities(cart) {
    if (hasCart) {
      const items = cart.items;
      const newCartQuantity = {};

      items.forEach((item) => {
        newCartQuantity[item.id] = {
          quantity: item.quantity,
          showEdit: false,
          error: '',
        };
      });
      return newCartQuantity;
    } else {
      return {};
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

  async function logUserOut() {
    setToken('');
    setCart({});
    setUser({});
    saveToLocalStorage('');
    navigate('/loginregister');
  }

  async function mainLogUserIn(token) {
    const allPromises = await Promise.all([getUser(token), getCart(token)]);

    const user = allPromises[0];
    const cart = allPromises[1];

    setToken(token);
    setCart(cart);
    setUser(user);
    saveToLocalStorage(token);
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
    initialLoad = false;
  }

  useEffect(() => {
    firstLoad();
  }, []);

  return (
    <div id='main'>
      <Navbar
        logUserOut={logUserOut}
        token={token}
        user={user}
        cartQuantities={cartQuantities}
      />
      <div id='page'>
        <Routes>
          <Route
            path='/loginregister'
            element={
              <LoginRegister
                setToken={setToken}
                setUser={setUser}
                mainLogUserIn={mainLogUserIn}
              />
            }
          />

          <Route
            path='/cart'
            element={
              <Cart
                token={token}
                cart={cart}
                setCart={setCart}
                hasItems={hasItems}
                cartQuantities={cartQuantities}
                setCartQuantities={setCartQuantities}
              />
            }
          />
          <Route
            path='/checkout'
            element={
              <Checkout
                token={token}
                cart={cart}
                setCart={setCart}
                getCart={getCart}
              />
            }
          />
          <Route
            path='/'
            element={
              <Products
                token={token}
                cart={cart}
                setCart={setCart}
                getCart={getCart}
                user={user}
                setSelectedProduct={setSelectedProduct}
                setCategoryList={setCategoryList}
              />
            }
          />
          <Route
            path="/products/:product_id"
            element={
              <SingleProduct
                selectedProduct={selectedProduct}
                token={token}
                cart={cart}
                setCart={setCart}
                getCart={getCart}
              />
            }
          />
          <Route
            path='/products/new'
            element={<NewProduct token={token} user={user} categoryList={categoryList}/>}
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
              <EditProfile
                user={user}
                token={token}
                getUser={getUser}
                setUser={setUser}
              />
            }
          />
          <Route
            path='/admin-users'
            element={<AdminUsersPage token={token} />}
          />
          <Route
            path='/admin-users/edit-user/:id'
            element={<EditUser user={user} token={token} />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};
export default Main;
