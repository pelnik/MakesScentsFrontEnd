let BASE_URL = 'https://grace-shopper-wiwo.onrender.com/api';

export async function getActiveCart(token) {
  try {
    const response = await fetch(`${BASE_URL}/cart_products/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error getting cart', error);
  }
}
