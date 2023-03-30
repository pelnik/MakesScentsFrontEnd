let BASE_URL = 'https://grace-shopper-wiwo.onrender.com/api';

export const registerNewUser = async (name, email, username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        username: username,
        password: password,
      }),
    });

    const result = await response.json();
    console.log(result, 'register');
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const logUserIn = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    console.log(result, 'login');
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const usersMe = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log('usersMe', result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (id, token, username, email) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: username,
        email: email,
      }),
    });
    const result = await response.json();
    console.log(response, "editprofile")
    return result
  } catch (error) {
    console.log(error);
  }
};

