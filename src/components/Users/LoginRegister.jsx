import React, { useState } from 'react';
import { registerNewUser, logUserIn } from '../../apiAdapters';
import { useNavigate } from 'react-router-dom';

const LoginRegister = (props) => {
  const navigate = useNavigate();

  const [displayLogin, setDisplayLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const setToken = props.setToken;
  async function registerUser() {
    try {
      const response = await registerNewUser(name, email, username, password);
      if (!response.success) {
        setError(`${response.message}`);
      } else {
        setToken(response.token);
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
        setToken(response.token);
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
        <div>
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
                type="text"
                className="inputtext"
                value={username}
                name="username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              ></input>
            </label>
            <label className="formLabel">
              Password:
              <input
                type="text"
                className="inputtext"
                value={password}
                name="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              ></input>
            </label>
            <button type="submit" className="redButton">
              Log In
            </button>
            <p>{error}</p>
          </form>
          <button
            type="button"
            className="redButton"
            onClick={() => {
              setDisplayLogin(false);
            }}
          >
            Don't have an account? Sign up here
          </button>
        </div>
      ) : (
        <div>
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
                type="text"
                className="inputtext"
                value={name}
                name="name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              ></input>
            </label>
            <label className="formLabel">
              Email:
              <input
                type="text"
                className="inputtext"
                value={email}
                name="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></input>
            </label>
            <label className="formLabel">
              Username:
              <input
                type="text"
                className="inputtext"
                value={username}
                name="username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              ></input>
            </label>
            <label className="formLabel">
              Password:
              <input
                type="text"
                className="inputtext"
                value={password}
                name="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              ></input>
            </label>
            <button type="submit" className="redButton">
              Register
            </button>
            <p>{error}</p>
          </form>
          <button
            type="button"
            className="redButton"
            onClick={() => {
              setDisplayLogin(true);
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
