import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import {
  getAllProducts,
  deleteProduct,
  addCartItem,
  getAllCategories,
} from '../../apiAdapters';
import { CategoryFilter } from '..';

function Products({ token, user, setSelectedProduct, setCart, getCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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

  // function selectFilter() {

  // }

  useEffect(() => {
    getAllProductsPage();
  }, []);

  useEffect(() => {
    getAllCategoryFilter();
  }, []);

  return (
    <div id='products-page-container'>
      <div id='products-header'>
        <h1>Products</h1>
        {user.is_admin ? (
          <button
            className='add-button product-button'
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
          <CategoryFilter token={token} user={user} />
          <ul className='category-list'>
            {categories.map((category, idx) => {
              return (
                <li key={`category${idx}`}>
                  <input
                    type='checkbox'
                    id='category'
                    name={category.category_name}
                    value={category.category_name}
                  />
                  <label htmlFor='category'>{category.category_name}</label>
                </li>
              );
            })}
          </ul>
        </div>
        <div id='products-list'>
          {products.map((product, idx) => {
            return (
              <div id='products-container' key={`products${idx}`}>
                <div
                  className='product-detail'
                  onClick={() => {
                    setSelectedProduct({ product_id: product.id });
                    navigate(`/products/${product.id}`);
                  }}
                >
                  <img
                    src={product.pic_url}
                    id='product-pic'
                    alt='pic of candle product'
                  />
                  <div className='product-text-detail'>
                    <h4>{product.name}</h4>
                    <h5>Size: {product.size}</h5>
                    <h3 className='important-product-detail'>
                      {product.price}
                    </h3>
                  </div>
                </div>
                {token ? (
                  <AddShoppingCartIcon
                    onClick={(evt) => {
                      handleShoppingCartClick(evt, product.id, 1);
                    }}
                  />
                ) : null}
                {user.is_admin ? (
                  <div className='product-buttons-container'>
                    <button
                      className='product-button'
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
                      className='product-button'
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
