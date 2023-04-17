import React, { useState, useEffect } from 'react';

import { StripeCheckout } from '..';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { stripeSecret } from '../../apiAdapters';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51MvPLvDL8W5WinuDzV4Ky34H450ujpVjQXHLfCb2oZ4u0ZrrxXAIFowf1klW3GGdpdlejzaU5NcWPtnI1z8LJZsg00YoYbXcsw'
);

function StripeWrapper({ token, cart, hasItems }) {
  const [secret, setSecret] = useState('');

  async function getUserSecret(token) {
    try {
      const secretResponse = await stripeSecret(token);
      console.log('component response', secretResponse);
      if (secretResponse.success) {
        setSecret(secretResponse.client_secret);
      }
    } catch (error) {
      console.error('error getting user secret');
    }
  }

  const options = {
    clientSecret: secret,
  };

  console.log('secret', secret);

  useEffect(() => {
    if (token) {
      getUserSecret(token);
    }
  }, [token]);

  return token && secret ? (
    <Elements stripe={stripePromise} options={options}>
      <StripeCheckout cart={cart} hasItems={hasItems} />
    </Elements>
  ) : !token ? (
    <div>You need to be logged in to checkout!</div>
  ) : (
    <div>loading...</div>
  );
}

export default StripeWrapper;
