import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { getAllProducts, deleteProduct } from '../../apiAdapters';

function Products({ token, user, setSelectedProduct }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  async function getAllProductsPage() {
    try {
      const result = await getAllProducts();
      if (result.success) {
        console.log('getting all products', result);
        setProducts(result.products);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProduct(product_id) {
    try {
      const result = await deleteProduct(token, product_id);
      if (result.success) {
        const productsCopy = [...products].filter((n, idx) => {
          return n.id !== product_id;
        });
        setProducts(productsCopy);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProductsPage();
  }, []);

  return (
    <div id="products-page-container">
      <div id="products-header">
        <h1>Products</h1>
        {user.is_admin === true ? (
          <button
            className="add-product-button"
            onClick={() => {
              navigate('/products/new');
            }}
          >
            Add New Product
          </button>
        ) : null}
      </div>
      <div id="side-by-side">
        <div id="products-filter">
          <h2>Filter</h2>
          <form>
            <input
              type="checkbox"
              id="category1"
              name="category1"
              value="Candle"
            />
            <label htmlFor="category1">Candle</label>
            <br />

            <input
              type="checkbox"
              id="category2"
              name="category2"
              value="Diffuser"
            />
            <label htmlFor="category2">Diffuser</label>
            <br />

            <input
              type="checkbox"
              id="category3"
              name="category3"
              value="Car"
            />
            <label htmlFor="category3">Car</label>
          </form>
        </div>
        <div id="products-list">
          {products.map((product, idx) => {
            return (
              <div id="products-container" key={`products${idx}`}>
                <div
                  className="product-detail"
                  onClick={() => {
                    setSelectedProduct({ product_id: product.id });
                    navigate(`/products/${product.id}`);
                  }}
                >
                  <img src={product.pic_url} id="product-pic" />
                  <h3>{product.name}</h3>
                  <h5>{product.description}</h5>
                  <h4>Size: {product.size}</h4>
                  <h3>{product.price}</h3>
                </div>
                <div className="product-buttons">
                  <AddShoppingCartIcon />
                  <button
                    onClick={() => {
                      setSelectedProduct({
                        product_id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        pic_url: product.pic_url,
                        inventory: product.inventory,
                      });
                      navigate(`/products/edit/${product.id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      removeProduct(product.id);
                    }}
                  >
                    Delete
                  </button>
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
