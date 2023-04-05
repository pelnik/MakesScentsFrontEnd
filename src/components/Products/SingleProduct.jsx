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
    <div id='single-product-page'>
      <div id='single-left'>
        <img src={product.pic_url} id='single-product-pic' />
      </div>
      <div id='single-right'>
        <div id='single-top'>
          <h2 className='important-product-detail'>{product.name}</h2>
          <h3>Size: {product.size}</h3>
          <h3 className='important-product-detail'>{product.price}</h3>
        </div>
        <hr />
        <div id='single-bottom'>
          <p>{product.description}</p>
          <p>Fragrance: {product.fragrance}</p>
          <p>Color: {product.color}</p>
          <p>Category: {product.category_id}</p>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
