import React, { useState, useEffect } from 'react';
import { getSingleProduct, getAllCategories } from '../../apiAdapters';

function SingleProduct({ selectedProduct }) {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
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

  async function getAllCategoryFilter() {
    try {
      const result = await getAllCategories();
      if (result.success) {
        console.log('getting all categories', result);
        setCategories(result.categories);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleProductPage();
    getAllCategoryFilter()
  }, []);

  return (
    <div id='single-product-page'>
      <div id='single-product-top'>
        <div id='single-left'>
          <img src={product.pic_url} id='single-product-pic' />
        </div>
        <div id='single-right'>
          <div id='single-top'>
            <h2 className='important-product-detail' id='product-name'>
              {product.name}
            </h2>
            <p id='product-description'>{product.description}</p>
            <h4>Size: {product.size}</h4>
            <h3 className='important-product-detail' id='product-price'>
              {product.price}
            </h3>
          </div>
          <hr />
          {/* need to a button for add to cart */}
          <div>ADD TO CART HERE</div>
        </div>
      </div>
      <h4>Details:</h4>
      <div id='single-product-bottom'>
        <p>
          <span className='detail-header'>Fragrance:</span> {product.fragrance}
        </p>
        <p>
          <span className='detail-header'>Color:</span> {product.color}
        </p>
        <p>
          <span className='detail-header'>Category:</span> {product.category_id}
        </p>
      </div>
    </div>
  );
}

export default SingleProduct;
