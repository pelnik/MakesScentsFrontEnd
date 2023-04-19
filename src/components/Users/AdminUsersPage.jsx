import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getAllUsers } from '../../apiAdapters';

function AdminUsersPage({ token }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  async function getAllUsersPage() {
    try {
      const result = await getAllUsers(token);
      if (result.success === true) {
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
      <div id="AdminPageHeader">
        <h1 id="AdminPageTitle">Admin Users Page</h1>
        <input
          id="searchBox"
          type="text"
          placeholder="Search for User"
          value={searchTerm}
          onChange={searchHandle}
        />
      </div>
      <div id="AllUserCards">
        {usersToDisplay.length
          ? usersToDisplay.map((user, idx) => {
              return (
                <div className="UserCard" key={`users` + idx}>
                  <h2 className="UserInfo">
                    Name: <span className="Info">{user.name}</span>
                  </h2>
                  <h3 className="UserInfo">
                    Username: <span className="Info">{user.username}</span>
                  </h3>
                  <h3 className="UserInfo">
                    Email: <span className="Info">{user.email}</span>
                  </h3>
                  {user.is_admin ? (
                    <h3 className="UserInfo">
                      Role: <span className="Info">Admin</span>
                    </h3>
                  ) : (
                    <h3 className="UserInfo">
                      Role: <span className="Info">User</span>
                    </h3>
                  )}
                  {user.is_active ? (
                    <h3 className="UserInfo">Active</h3>
                  ) : (
                    <h3 className="UserInfo">Inactive</h3>
                  )}
                  <Link to={`edit-user/${user.id}`} state={user}>
                    <button className="Button">Edit User Status</button>
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
