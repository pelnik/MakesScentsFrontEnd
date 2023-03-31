import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAllProducts, deleteProduct } from '../apiAdapters';

function Products({ token, user }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  async function getAllProductsPage() {
    try {
      const result = await getAllProducts();
      console.log(result, 'result here');
      setProducts(result.products);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProduct() {
    try {
      const result = await deleteProduct;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProductsPage();
  }, [token]);

  return (
    <div id='products-page-container'>
      <div id='products-header'>
        <h1>Products</h1>
        {user.is_admin === true ? (
          <button
            className='add-product-button'
            onClick={() => {
              navigate('/products/new');
            }}
          >
            Add New Product
          </button>
        ) : null}
      </div>
      <div id='side-by-side'>
        <div id='products-filter'>
          <h2>Filter</h2>
          <form>
            <input
              type='checkbox'
              id='category1'
              name='category1'
              value='Candle'
            />
            <label htmlFor='category1'>Candle</label>
            <br />

            <input
              type='checkbox'
              id='category2'
              name='category2'
              value='Diffuser'
            />
            <label htmlFor='category2'>Diffuser</label>
            <br />

            <input
              type='checkbox'
              id='category3'
              name='category3'
              value='Car'
            />
            <label htmlFor='category3'>Car</label>
          </form>
        </div>
        <div id='products-list'>
          {products.map((product, idx) => {
            return (
              <div id='products-container' key={`products${idx}`}>
                <img src={product.pic_url} id='product-pic' />
                <h3>{product.name}</h3>
                <h5>{product.description}</h5>
                <h4>Size: {product.size}</h4>
                <h3>{product.price}</h3>
                <div className='product-buttons'>
                  <button
                    onClick={() => {
                      navigate('/products/:product_id');
                    }}
                  >
                    Edit
                  </button>
                  <button>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
