import React, { useState, useEffect } from 'react';

import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const BASE_URL = 'http://localhost:3000';

function StripeCheckout({ token, secret }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${BASE_URL}/checkout-confirm`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
    }
  };

  console.log('secret', secret);

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit">Submit</button>
    </form>
  );
}

export default StripeCheckout;
