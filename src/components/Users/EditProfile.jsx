import { Password } from '@mui/icons-material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { editUsername, editEmail } from '../../apiAdapters';

function EditProfile({ token, getUser, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayEditUsername, setDisplayEditUsername] = useState(true);
  let [newUsername, setNewUsername] = useState(location.state.username);
  let [newEmail, setNewEmail] = useState(location.state.email);

  async function changeUsername(id, username) {
    try {
      console.log(id, token, username, '###');
      await editUsername(id, token, username);
      setNewUsername('');
      const userResponse = await getUser(token);
      if (userResponse.success) {
        setUser(userResponse.user);
      }
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  }

  async function changeEmail(id, email) {
    try {
      console.log(id, token, email, '###');
      await editEmail(id, token, email);
      setNewEmail('');
      await getUser(token);
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="formContainer">
      {displayEditUsername ? (
        <h1 className="pageTitle">Edit Username</h1>
      ) : (
        <h1 className="pageTitle">Edit Email</h1>
      )}
      {displayEditUsername ? (
        <div>
          <form
            className="defaultForm"
            onSubmit={(event) => {
              event.preventDefault();
              changeUsername(location.state.id, newUsername);
            }}
          >
            <label className="formLabel">
              Change Username:
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
            <button type="submit">Submit</button>
          </form>
          <button
            type="button"
            onClick={() => {
              setDisplayEditUsername(false);
            }}
          >
            Edit Email
          </button>
        </div>
      ) : (
        <div>
          <form
            className="defaultForm"
            onSubmit={(event) => {
              event.preventDefault();
              changeEmail(location.state.id, newEmail);
            }}
          >
            <label className="formLabel">
              Change Email:
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
          <button
            type="button"
            onClick={() => {
              setDisplayEditUsername(true);
            }}
          >
            Edit Username
          </button>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
