import React, { useState, useEffect } from 'react';
import { getSingleProduct } from '../../apiAdapters';

function SingleProduct({ selectedProduct }) {
  const [product, setProduct] = useState([]);
  const product_id = selectedProduct.product_id;

  async function getSingleProductPage() {
    try {
      const result = await getSingleProduct(product_id);
      if (result.success) {
        console.log(result, 'result for single here');
        setProduct(result.product);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleProductPage();
  }, []);

  return (
    <div>
      <h3>Item Detail</h3>
      <img src={product.pic_url} id="product-pic" />
      <h2>{product.name}</h2>
      <h3>{product.description}</h3>
      <h3>Size: {product.size}</h3>
      <h3>{product.price}</h3>
      <h3>Fragrance: {product.fragrance}</h3>
      <h3>Color: {product.color}</h3>
    </div>
  );
}

export default SingleProduct;
