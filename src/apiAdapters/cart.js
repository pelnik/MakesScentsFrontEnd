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

export async function updateCartQuantity(token, cart_product_id, quantity) {
  try {
    const response = await fetch(
      `${BASE_URL}/cart_products/${cart_product_id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity,
        }),
      }
    );

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error getting cart', error);
  }
}

export async function deleteCartItem(token, cart_product_id) {
  try {
    const response = await fetch(
      `${BASE_URL}/cart_products/${cart_product_id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();
    console.log('cart product delete', result);
    return result;
  } catch (error) {
    console.error('Error getting cart', error);
  }
}

export async function checkout(token) {
  try {
    const response = await fetch(`${BASE_URL}/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: 'Processing',
      }),
    });

    const result = await response.json();
    console.log('cart product post', result);
    return result;
  } catch (error) {
    console.error('Error getting cart', error);
  }
}
