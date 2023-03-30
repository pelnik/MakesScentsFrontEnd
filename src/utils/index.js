export function saveToLocalStorage(token) {
  if (typeof token !== 'string') {
    console.error("Tried to save token that wasn't a string", token);
  }
  localStorage.setItem('token', token);
}

export function getTokenFromLocalStorage() {
  let oldToken = localStorage.getItem('token');

  if (!oldToken) {
    oldToken = '';
  }

  return oldToken;
}
