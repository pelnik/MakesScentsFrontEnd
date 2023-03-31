import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveCart, updateCartQuantity } from '../apiAdapters';

function Cart({ token, cart, setCart }) {
  const [cartQuantities, setCartQuantities] = useState({});

  const navigate = useNavigate();

  const hasCart = Object.keys(cart).length > 0;
  const hasItems = hasCart && cart.items.length > 0;

  const total = hasItems
    ? cart.items.reduce((x, y) => {
        const cleanY = y.product_price.slice(1);
        const numY = parseFloat(cleanY);

        return x + numY;
      }, 0)
    : 0;

  const dollarTotal = `$${total.toFixed(2)}`;

  function updateCartQuantities(cart) {
    const items = cart.items;
    const newCartQuantity = {};

    items.forEach((item) => {
      newCartQuantity[item.id] = item.quantity;
    });

    console.log('cart quantity', newCartQuantity);
    setCartQuantities(newCartQuantity);
  }

  async function updateBackendCartQuantity() {
    try {
    } catch (error) {
      console.error('error updating back end cart quantity', error);
    }
  }

  // Updates cart on the back end as well when request is made
  async function handleQuantityChange(evt, itemId) {
    const newValue = evt.target.value;

    const cartQuantityCopy = { ...cartQuantities };
    cartQuantityCopy[itemId] = newValue;

    setCartQuantities(cartQuantityCopy);
  }

  async function getCart(token) {
    try {
      if (token) {
        const response = await getActiveCart(token);
        const cart = response.cart;
        console.log('cart', cart);

        if (response.success) {
          setCart(cart);
          updateCartQuantities(cart);
        }
      }
    } catch (error) {
      console.error('error getting cart', error);
    }
  }

  function handleCheckoutClick() {
    navigate('/checkout');
  }

  useEffect(() => {
    getCart(token);
  }, [token]);

  return (
    <div id="full-cart-page">
      <div id="cart-container">
        {hasItems ? (
          cart.items.map((item) => {
            return (
              <div key={`cartKey ${item.id}`} className="cart-item">
                <img src={item.product_pic_url} />
                <div>{item.product_name}</div>
                <div>{item.product_price}</div>
                <div>{item.quantity}</div>
                <input
                  name="quantity"
                  type="number"
                  value={cartQuantities[item.id]}
                  onChange={(evt) => {
                    handleQuantityChange(evt, item.id);
                  }}
                />
              </div>
            );
          })
        ) : (
          <div>No items in cart!</div>
        )}
      </div>
      <div>Total: {dollarTotal}</div>
      {hasItems ? (
        <button onClick={handleCheckoutClick}>Checkout</button>
      ) : null}
    </div>
  );
}

export default Cart;
