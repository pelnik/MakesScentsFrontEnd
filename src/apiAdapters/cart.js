let BASE_URL = 'https://grace-prod.onrender.com/api';

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
    console.log('get active cart result', result);
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

export async function checkout(token, cart_id, status) {
  try {
    const response = await fetch(`${BASE_URL}/carts/${cart_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
      }),
    });

    const result = await response.json();
    console.log('cart product post', result);
    return result;
  } catch (error) {
    console.error('Error getting cart', error);
  }
}

export async function addCartItem(token, product_id, quantity) {
  try {
    const response = await fetch(`${BASE_URL}/cart_products/${product_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity,
      }),
    });

    const result = await response.json();
    console.log('add cart item post', result);
    return result;
  } catch (error) {
    console.error('Error getting cart', error);
  }
}

export async function getOrders(token) {
  try {
    const response = await fetch(`${BASE_URL}/carts/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log('get orders result', result);
    return result;
  } catch (error) {
    console.error('Error getting cart', error);
  }
}

export async function stripeSecret(token) {
  try {
    const response = await fetch(`${BASE_URL}/carts/stripe-secret`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log('get secret page', result);
    return result;
  } catch (error) {
    console.error('Error getting cart', error);
  }
}
