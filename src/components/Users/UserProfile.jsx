import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getOrders } from '../../apiAdapters';

const UserProfile = ({ token, user }) => {
  const [orders, setOrders] = useState([]);

  async function getPreviousOrders() {
    try {
      const result = await getOrders(token);

      if (result.success) {
        setOrders(result.orders);
      }
    } catch (error) {
      console.log('error getting previous orders', error);
    }
  }

  useEffect(() => {
    getPreviousOrders();
  }, []);

  return (
    <div id="profile">
      <h1>{user.name}'s Profile</h1>
      <h2>Email: {user.email}</h2>
      <h2>Username: {user.username}</h2>
      <Link to={`edit-profile/${user.id}`} state={user}>
        <button>Edit Username/Email</button>
      </Link>
    </div>
  );
};

export default UserProfile;
