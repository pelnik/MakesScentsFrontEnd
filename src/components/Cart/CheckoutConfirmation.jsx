import React from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutConfirmation({ setShowConfirmation }) {
  const navigate = useNavigate();

  return (
    <div id="confirmation-page">
      <p>
        You're gonna love these candles. You're checked out! Return to our
        homepage by hitting the button below.
      </p>
      <button
        onClick={() => {
          setShowConfirmation(false);
        }}
      >
        Back to Cart
      </button>
      <button
        onClick={() => {
          navigate('/');
          setShowConfirmation(false);
        }}
      >
        Home
      </button>
    </div>
  );
}

export default CheckoutConfirmation;
