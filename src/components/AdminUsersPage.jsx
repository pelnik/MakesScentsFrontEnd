import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getAllUsers} from '../apiAdapters';

function AdminUsersPage({ token }) {
  const [users, setUsers] = useState([]);


  async function getAllUsersPage() {
    try {
      const result = await getAllUsers( token );
      if (result.success === true) {
        console.log('getting all users', result);
        setUsers(result.users);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token){
    getAllUsersPage();
    }
  }, [token]);

  return (
        <div id='users-list'>
          {users.map((user, idx) => {
            return (
              <div
                key={`users` + idx}
              >
                <h1>Name: {user.name}</h1>
                <h2>Username: {user.username}</h2>
                <h2>Email: {user.email}</h2>
                {user.is_admin ? <h2>Role: Admin</h2>: <h2>Role: User</h2>}
                {user.is_active ? <h2>Active</h2>: <h2>Inactive</h2>}
                <Link to={`edit-user/${user.id}`} state={user}>
                                <button>Edit User Status</button>
                            </Link>
              </div>
            );
          })}
        </div>
  );
}

export default AdminUsersPage;
