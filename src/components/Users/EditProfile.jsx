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
  let [error, setError] = useState('')

  async function changeUsername(id, username) {
    try {
    const response = await editUsername(id, token, username);
    if (response.id) {
      setNewUsername('');
      const userResponse = await getUser(token);
      setUser(userResponse);
      navigate('/profile');
    } else {
      setError(`${response.message}`);
    }
    } catch (error) {
      console.log(error);
    }
  }

  async function changeEmail(id, email) {
    try {
      const response = await editEmail(id, token, email);
      if (response.id) {
        setNewEmail('');
        const userResponse = await getUser(token);
        setUser(userResponse);
        navigate('/profile');
      } else {
        setError(`${response.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="formContainer">
      {displayEditUsername ? (
        <h1 className="editTitle">Edit Username</h1>
      ) : (
        <h1 className="editTitle">Edit Email</h1>
      )}
      {displayEditUsername ? (
        <div className='Form'>
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
                id="textBox"
                name="username"
                type="text"
                required
                value={newUsername}
                onChange={(event) => {
                  setNewUsername(event.target.value);
                }}
              />
            </label>
            <button type="submit" className='Button'>Submit</button>
          </form>
          {error==="" ? null : <p className='error'>{error}</p>}
          <button
            type="button"
            className='SwitchForm'
            onClick={() => {
              setDisplayEditUsername(false);
              setError('')
            }}
          >
            Edit Email
          </button>
        </div>
      ) : (
        <div className='Form'>
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
                id="textBox"
                name="email"
                type="text"
                required
                value={newEmail}
                onChange={(event) => {
                  setNewEmail(event.target.value);
                }}
              />
            </label>
            <button className='Button' type="submit">Submit</button>
          </form>
          {error==="" ? null : <p className='error'>{error}</p>}
          <button
            type="button"
            className='SwitchForm'
            onClick={() => {
              setDisplayEditUsername(true);
              setError('')
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
