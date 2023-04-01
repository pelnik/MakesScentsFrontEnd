import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { editUserStatus } from '../../apiAdapters';

function EditProfile({ token }) {
  const location = useLocation();
  const navigate = useNavigate();
  let [newIsActive, setNewIsActive] = useState(location.state.is_active);
  let [newIsAdmin, setNewIsAdmin] = useState(location.state.is_admin);

  async function changeUserStatus(id, is_active, is_admin) {
    try {
      console.log(id, token, is_active, is_admin, '###');
      await editUserStatus(id, token, is_active, is_admin);
      setNewIsActive(false);
      setNewIsAdmin(false);
      navigate('/admin-users');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="formContainer">
      <h1 className="pageTitle">Edit User Status </h1>

      <h1>Name: {location.state.name}</h1>
      <h2>Username: {location.state.username}</h2>
      <h2>Email: {location.state.email}</h2>
      {location.state.is_admin ? <h2>Role: Admin</h2> : <h2>Role: User</h2>}
      {location.state.is_active ? <h2>Active</h2> : <h2>Inactive</h2>}

      <form
        className="defaultForm"
        onSubmit={(event) => {
          event.preventDefault();
          changeUserStatus(location.state.id, newIsActive, newIsAdmin);
        }}
      >
        <label id="checkboxLabel">
          Active:
          <input
            className="inputtext"
            name="isActive"
            type="checkbox"
            value={newIsActive}
            checked={newIsActive}
            onChange={() => {
              setNewIsActive(!newIsActive);
            }}
          />
        </label>
        <label id="checkboxLabel">
          Admin:
          <input
            className="inputtext"
            name="isAdmin"
            type="checkbox"
            value={newIsAdmin}
            checked={newIsAdmin}
            onChange={() => {
              setNewIsAdmin(!newIsAdmin);
            }}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditProfile;
