import React, { useState, useEffect } from 'react';
import { working, getActiveCart } from '../apiAdapters';

function Cart({ token }) {
  useEffect(() => {
    if (token) {
      const cart = getActiveCart();
    }
  }, [token]);

  return <div>{working()}</div>;
}

export default Cart;
