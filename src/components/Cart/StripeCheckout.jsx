import React, { useState, useEffect } from 'react';

import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const BASE_URL = window.location.origin;

function StripeCheckout({ cart, hasItems }) {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);

  const total = hasItems
    ? cart.items
        .reduce((x, y) => {
          const cleanY = y.product_price.slice(1);
          const numY = parseFloat(cleanY);

          return x + numY * y.quantity;
        }, 0)
        .toFixed(2)
    : 0;

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const fullURL = new URL(`${BASE_URL}/stripe-payment-status`);

    fullURL.searchParams.set('cart-id', cart?.id);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: fullURL.href,
      },
    });

    if (result.error) {
      setError(result.error.message);
    }
  };

  return hasItems ? (
    <div id="stripe-checkout-page">
      <form id="stripe-checkout-form" onSubmit={handleSubmit}>
        <p id="stripe-checkout-text">Thank you! Your total today is ${total}</p>
        <PaymentElement />
        {error ? (
          <p
            className="cart-warning"
            onClick={() => {
              setError('');
            }}
          >
            {error}
          </p>
        ) : null}
        <button className="cart-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  ) : (
    <p>You need some items!</p>
  );
}

export default StripeCheckout;
