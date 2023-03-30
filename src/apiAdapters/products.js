const BASE_URL = 'https://grace-shopper-wiwo.onrender.com/api';

export async function getAllProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    console.log('products', result);
    return result;
  } catch (error) {
    console.log('error getting all products', error);
  }
}
