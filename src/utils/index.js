export function saveToLocalStorage(token) {
  if (typeof token !== 'string') {
    console.error('Token is not type string');
  } else {
    localStorage.setItem('token', token);
  }
}

export function getTokenFromLocalStorage() {
  let oldToken = localStorage.getItem('token');

  if (!oldToken) {
    oldToken = '';
  }

  return oldToken;
}
