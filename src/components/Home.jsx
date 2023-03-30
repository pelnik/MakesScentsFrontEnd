import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ token, user }) => {
  return (
    <div id="home">
      <h1>Welcome to Grace shopper</h1>
      <p>Your token: {token}</p>
      <p>Your user: {user.username}</p>
      <p>Is Admin: {`${user.is_admin}`}</p>
    </div>
  );
};

export default Home;
