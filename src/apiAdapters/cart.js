let BASE_URL = 'https://grace-shopper-wiwo.onrender.com/api';

export function working() {
  return 'working';
}

export async function getActiveCart(token) {
  try {
    const response = await fetch(`${BASE}/cart_products/`, {
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
