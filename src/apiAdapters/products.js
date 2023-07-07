const BASE_URL = 'https://pelnik.dev/api/scents';

export async function getAllProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('error getting all products', error);
  }
}

export async function getSingleProduct(product_id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${product_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('error getting a single product', error);
  }
}

export async function createProduct(
  token,
  name,
  description,
  price,
  pic_url,
  size,
  inventory,
  category_id,
  color,
  fragrance
) {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        price,
        pic_url,
        size,
        inventory,
        category_id,
        color,
        fragrance,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('error creating a product', error);
  }
}

export async function updateProduct(
  token,
  product_id,
  name,
  description,
  price,
  pic_url,
  inventory
) {
  try {
    const response = await fetch(`${BASE_URL}/products/${product_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        price,
        pic_url,
        inventory,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('error updating a product', error);
  }
}

export async function deleteProduct(token, product_id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${product_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('error deleting a product', error);
  }
}
