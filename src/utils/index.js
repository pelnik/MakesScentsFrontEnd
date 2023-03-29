export function saveToLocalStorage(token) {
  localStorage.setItem('token', token);
}

export function getTokenFromLocalStorage() {
  let oldToken = localStorage.getItem('token');

  if (!oldToken) {
    oldToken = '';
  }

  return oldToken;
}
