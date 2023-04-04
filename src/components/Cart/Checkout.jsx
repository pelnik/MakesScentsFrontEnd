import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { checkout } from '../../apiAdapters';

import { CheckoutConfirmation } from '..';

function Checkout({ token, cart, setCart, getCart }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();

  const hasCart = Object.keys(cart).length > 0;
  const hasItems = hasCart && cart.items.length > 0;

  const total = hasItems
    ? cart.items.reduce((x, y) => {
        const cleanY = y.product_price.slice(1);
        const numY = parseFloat(cleanY);

        return x + numY * y.quantity;
      }, 0)
    : 0;

  const dollarTotal = `$${total.toFixed(2)}`;

  async function handleCheckoutClick() {
    try {
      if (token && hasItems) {
        const checkoutResponse = await checkout(token);

        if (checkoutResponse.success) {
          setCart(await getCart(token));
          setShowConfirmation(true);
        }
      }
    } catch (error) {
      console.error('error getting cart', error);
    }
  }

  return (
    <div id="checkout-full-page">
      {showConfirmation ? (
        <CheckoutConfirmation />
      ) : (
        <div id="checkout-start-page">
          <h1>Checkout</h1>
          <p>Thank you for shopping with us!</p>
          {!hasItems ? (
            <div className="checkout-total" id="checkout-no-items">
              <p>It looks like you don't have any items!</p>
              <p>
                Click any buttons in the Navbar to go back, or{' '}
                <Link to="/">click here</Link> to go back.
              </p>
            </div>
          ) : (
            <div className="checkout-total" id="checkout-with-items">
              <p>Your total is: {dollarTotal}</p>
              <button onClick={handleCheckoutClick}>Checkout</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Checkout;
