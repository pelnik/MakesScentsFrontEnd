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
