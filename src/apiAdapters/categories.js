const BASE_URL = 'https://grace-prod.onrender.com/api';

export async function getAllCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('error getting all categories', error);
  }
}

export async function createCategory(token, category_name) {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        category_name,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('error creating a new category', error);
  }
}
