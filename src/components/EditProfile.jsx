import { Password } from '@mui/icons-material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { editProfile } from '../apiAdapters';

function EditProfile({ token }) {
  const location = useLocation();
  const navigate = useNavigate();
  let [newUsername, setNewUsername] = useState(location.state.username);
  let [newEmail, setNewEmail] = useState(location.state.email);
  async function changeProfile(id, username, email) {
    try {
      console.log(id, token, username, email, '###');
      await editProfile(id, token, username, email);
      setNewUsername('');
      setNewEmail('');
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="formContainer">
      <h1 className="pageTitle">Edit Username & Email</h1>
      <form
        className="defaultForm"
        onSubmit={(event) => {
          event.preventDefault();
          changeProfile(location.state.id, newUsername, newEmail);
        }}
      >
        <label className="formLabel">
          Username:
          <input
            className="inputtext"
            name="username"
            type="text"
            required
            value={newUsername}
            onChange={(event) => {
              setNewUsername(event.target.value);
            }}
          />
        </label>
        <label className="formLabel">
          Email:
          <input
            className="inputtext"
            name="email"
            type="text"
            required
            value={newEmail}
            onChange={(event) => {
              setNewEmail(event.target.value);
            }}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditProfile;
