import React, { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

import { checkout } from '../../apiAdapters';

const PaymentStatus = ({ token, cart, getCart, setCart }) => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const completedCartId = Number(
    new URLSearchParams(window.location.search).get('cart-id')
  );

  console.log('cart-id from URL', completedCartId);

  useEffect(() => {
    if (
      !stripe ||
      !cart?.id ||
      !completedCartId ||
      cart?.id !== completedCartId
    ) {
      return;
    }

    // set cart to new cart

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    // Retrieve the PaymentIntent
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      console.log('stripe payment response', paymentIntent);
      switch (paymentIntent.status) {
        case 'succeeded':
          const cartSuccessResponse = checkout(token, cart.id, 'Completed');
          cartSuccessResponse
            .then((response) => {
              if (response.success) {
                return getCart(token);
              } else {
                setMessage('Stripe updated, but not cart');
              }
            })
            .then((response) => {
              if (response) {
                setCart(response);
                setMessage(
                  "You're gonna love these candles. You're checked out! Return to our homepage by hitting the button below."
                );
              } else {
                setMessage(
                  'Stripe and cart updated, but not browser. Please refresh.'
                );
              }
            });

          break;
        case 'processing':
          const cartProcessingResponse = checkout(token, cart.id, 'Processing');
          cartProcessingResponse
            .then((response) => {
              if (response.success) {
                return getCart(token);
              } else {
                setMessage('Stripe updated, but not cart');
              }
            })
            .then((response) => {
              if (response) {
                setCart(response);
                setMessage(
                  "Payment processing. We'll update you when payment is received."
                );
              } else {
                console.error('cart response', response);
                setMessage('Stripe updated, but not cart');
              }
            });
          break;

        case 'requires_payment_method':
          navigate('stripe-checkout');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe, cart?.id]);

  return (
    <div id="confirmation-page">
      <p>{message}</p>
      <div id="checkout-confirm-buttons">
        <button
          className="cart-button"
          onClick={() => {
            navigate('/cart');
          }}
        >
          Back to Cart
        </button>
        <button
          className="cart-button"
          onClick={() => {
            navigate('/');
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default PaymentStatus;
