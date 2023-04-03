import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { getAllProducts, deleteProduct, addCartItem } from '../../apiAdapters';

function Products({ token, user, setSelectedProduct, setCart, getCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // need to make API route to get list of categories and use it to display the category filter
  const [selectedFilter, setSelectedFilter] = useState([]); // hold values of selected category filter
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

  async function handleShoppingCartClick(evt, product_id, quantity) {
    try {
      const result = await addCartItem(token, product_id, quantity);

      if (result.success) {
        const cartResult = await getCart(token);
        console.log('cartResult', cartResult);
        setCart(cartResult);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // function selectFilter() {

  // }

  useEffect(() => {
    getAllProductsPage();
  }, []);

  return (
    <div id="products-page-container">
      <div id="products-header">
        <h1>Products</h1>
        {user.is_admin ? (
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
              onClick={(e) => {
                console.log(e.target.value);
              }}
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
                <AddShoppingCartIcon
                  onClick={(evt) => {
                    handleShoppingCartClick(evt, product.id, 1);
                  }}
                />
                {user.is_admin ? (
                  <div className="product-buttons">
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
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
