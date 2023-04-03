import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getAllUsers } from '../../apiAdapters';

function AdminUsersPage({ token }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")

  async function getAllUsersPage() {
    try {
      const result = await getAllUsers(token);
      if (result.success === true) {
        console.log('getting all users', result);
        setUsers(result.users);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function userMatches(user, text) {
    if (
      user.name.toLowerCase().includes(text) ||
      user.username.toLowerCase().includes(text) ||
      user.email.toLowerCase().includes(text)
    ) {
      return true;
    } else {
      return false;
    }
  }

  const filteredUsers = users.filter((user) => userMatches(user, searchTerm));
  const usersToDisplay = searchTerm.length ? filteredUsers : users;

  const searchHandle = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    if (token) {
      getAllUsersPage();
    }
  }, [token]);

  return (
    <div>
      <h1>
        Users
        <input
          id="searchBox"
          type="text"
          placeholder="Search for User"
          value={searchTerm}
          onChange={searchHandle}
        />
      </h1>
    <div id="users-list">
      {usersToDisplay.length ? usersToDisplay.map((user, idx) => {
        return (
          <div key={`users` + idx}>
            <h2>Name: {user.name}</h2>
            <h3>Username: {user.username}</h3>
            <h3>Email: {user.email}</h3>
            {user.is_admin ? <h3>Role: Admin</h3> : <h3>Role: User</h3>}
            {user.is_active ? <h3>Active</h3> : <h3>Inactive</h3>}
            <Link to={`edit-user/${user.id}`} state={user}>
              <button>Edit User Status</button>
            </Link>
          </div>
        );
      })
    : null}
    </div>
    </div>
  );
}

export default AdminUsersPage;
