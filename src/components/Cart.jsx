import React, { useState, useEffect } from 'react';
import { getActiveCart } from '../apiAdapters';

function Cart({ token, cart, setCart }) {
  const hasCart = Object.keys(cart).length > 0;
  const hasItems = hasCart && cart.items.length > 0;

  async function getCart(token) {
    if (token) {
      const response = await getActiveCart(token);
      console.log('cart', response.cart);

      if (response.success) {
        setCart(response.cart);
      }
    }
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
                <img src={item.pic_url} />
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
    </div>
  );
}

export default Cart;
