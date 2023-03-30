import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../apiAdapters/products';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])
  const navigate = useNavigate;

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

  useEffect(() => {
    getAllProductsPage();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div id='products-page-container'>
        <div id='products-filter'>
          <h2>Filter</h2>
          <form>
            <input
              type='checkbox'
              id='category1' 
              name='category1'
              value='Candle'/>
            <label for='category1'>Candle</label>
          </form>

          <h4>Candle</h4>
          <h4>Diffuser</h4>
          <h4>Car</h4>
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
