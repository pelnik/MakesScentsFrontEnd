import React from 'react';
import { Link } from 'react-router-dom';

const UserProfile = ({ token, user }) => {
  return (
    <div id="profile">
      <h1>{user.name}'s Profile</h1>
      <h2>Email:{user.email}</h2>
      <h2>Username: {user.username}</h2>
      <Link to={`edit-profile/${user.id}`} state={user}>
                                <button>Edit Username/Email</button>
                            </Link>
    </div>
  );
};

export default UserProfile;
