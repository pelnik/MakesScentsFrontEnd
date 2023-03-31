import React, { useState, useEffect } from 'react';
import { getSingleProduct } from '../apiAdapters';

function SingleProduct({ selectedProduct, setSelectedProduct }) {
  const [product, setProduct] = useState([]);
  const product_id = selectedProduct.product_id;

  async function getSingleProductPage() {
    try {
      const result = await getSingleProduct(product_id);
      if (result.success === true) {
        console.log(result, 'result for single here');
        setProduct(result.products);
        return result
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleProductPage();
  }, [])

  return (
    <div>
      <h1>Item Detail</h1>
      <h2>{product.name}</h2>
    </div>

  );
}

export default SingleProduct;
