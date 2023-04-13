import React from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutConfirmation() {
  const navigate = useNavigate();

  return (
    <div id="confirmation-page">
      <p>
        You're gonna love these candles. You're checked out! Return to our
        homepage by hitting the button below.
      </p>
      <div id="checkout-confirm-buttons">
        <button
          onClick={() => {
            navigate('/');
          }}
        >
          Back to Cart
        </button>
        <button
          onClick={() => {
            navigate('/');
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default CheckoutConfirmation;
