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
      <h1 className="EditUserPageTitle">Edit User Status </h1>
      <div className="EditUserCard">
        <h2 className="EditUserInfo">
          Name: <span className="Info">{location.state.name}</span>
        </h2>
        <h3 className="EditUserInfo">
          Username: <span className="Info">{location.state.username}</span>
        </h3>
        <h3 className="EditUserInfo">
          Email: <span className="Info">{location.state.email}</span>
        </h3>
        {location.state.is_admin ? (
          <h3 className="EditUserInfo">
            Role: <span className="Info">Admin</span>
          </h3>
        ) : (
          <h3 className="EditUserInfo">
            Role: <span className="Info">User</span>
          </h3>
        )}
        {location.state.is_active ? (
          <h3 className="EditUserInfo">Active</h3>
        ) : (
          <h3 className="EditUserInfo">Inactive</h3>
        )}
      </div>
      <form
        className="defaultForm"
        onSubmit={(event) => {
          event.preventDefault();
          changeUserStatus(location.state.id, newIsActive, newIsAdmin);
        }}
      >
        <div className="checkboxes">
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
        </div>
        <button className="Button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
