import React, { useState } from 'react';
import { registerNewUser, logUserIn } from '../../apiAdapters';
import { useNavigate } from 'react-router-dom';

import { saveToLocalStorage } from '../../utils';

const LoginRegister = (props) => {
  const navigate = useNavigate();

  const [displayLogin, setDisplayLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  let [error, setError] = useState('');

  const setToken = props.setToken;
  const setUser = props.setUser;
  const mainLogUserIn = props.mainLogUserIn;

  async function registerUser() {
    try {
      const response = await registerNewUser(name, email, username, password);
      if (!response.success) {
        setError(`${response.message}`);
      } else {
        await mainLogUserIn(response.token);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function loginUser() {
    try {
      const response = await logUserIn(username, password);
      if (!response.success) {
        setError(`${response.message}`);
      } else {
        await mainLogUserIn(response.token);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="formContainer">
      {displayLogin ? (
        <h1 className="pageTitle">Log In</h1>
      ) : (
        <h1 className="pageTitle">Register</h1>
      )}
      {displayLogin ? (
        <div className='Form'>
          <form
            className="defaultForm"
            onSubmit={(e) => {
              e.preventDefault();
              loginUser();
            }}
          >
            <label className="formLabel">
              Username: 
              <input
                id="textBox"
                type="text"
                className="inputtext"
                value={username}
                name="username"
                required
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              ></input>
            </label>
            <label className="formLabel">
              Password: 
              <input
                id="textBox"
                type="password"
                className="inputtext"
                value={password}
                name="password"
                required
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              ></input>
            </label>
            <button type="submit" className="Button">
              Log In
            </button>
          </form>
            {error==="" ? null : <p className='error'>Username or password is incorrect</p> }
          <button
            type="button"
            className="SwitchForm"
            onClick={() => {
              setDisplayLogin(false);
              setError('')
            }}
          >
            Don't have an account? Sign up here
          </button>
        </div>
      ) : (
        <div className='Form'> 
          <form
            className="defaultForm"
            onSubmit={(e) => {
              e.preventDefault();
              registerUser();
            }}
          >
            <label className="formLabel">
              Name:
              <input
                id="textBox"
                type="text"
                className="inputtext"
                value={name}
                name="name"
                required
                onChange={(event) => {
                  setName(event.target.value);
                }}
              ></input>
            </label>
            <label className="formLabel">
              Email:
              <input
                id="textBox"
                type="text"
                className="inputtext"
                value={email}
                name="email"
                required
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></input>
            </label>
            <label className="formLabel">
              Username:
              <input
                id="textBox"
                type="text"
                className="inputtext"
                value={username}
                name="username"
                required
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              ></input>
            </label>
            <label className="formLabel">
              Password:
              <input
                id="textBox"
                type="password"
                className="inputtext"
                value={password}
                name="password"
                required
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              ></input>
            </label>
            <button type="submit" className="Button">
              Register
            </button>
          </form>
          {error==="" ? null : <p className='error'>{error}</p>}
          <button
            type="button"
            className="SwitchForm"
            onClick={() => {
              setDisplayLogin(true);
              setError('')
            }}
          >
            Already have an account? Log in here
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginRegister;
