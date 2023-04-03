import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const Home = ({ token, user }) => {
  const navigate = useNavigate();

  return (
    <div id="home">
      <h1>Welcome to Grace shopper</h1>
      <p>Your token: {token}</p>
      <p>Your user: {user.username}</p>
      <p>Is Admin: {`${user.is_admin}`}</p>
      <button
        onClick={() => {
          navigate('/cart');
        }}
      >
        Go to Cart
      </button>
    </div>
  );
};

export default Home;
