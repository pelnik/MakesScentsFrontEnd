import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveCart } from '../apiAdapters';

function Cart({ token, cart, setCart }) {
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

  async function getCart(token) {
    if (token) {
      const response = await getActiveCart(token);
      console.log('cart', response.cart);

      if (response.success) {
        setCart(response.cart);
      }
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
                <div>Cart Item</div>
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
