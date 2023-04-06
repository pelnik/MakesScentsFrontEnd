import React, { useState, useEffect } from 'react';
import {
  getSingleProduct,
  getAllCategories,
  addCartItem,
  updateCartQuantity,
} from '../../apiAdapters';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function SingleProduct({ selectedProduct, token, cart, setCart, getCart }) {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartStatus, setCartStatus] = useState({
    show: false,
    amountToAdd: 1,
    error: '',
  });
  const product_id = selectedProduct.product_id;

  async function getSingleProductPage() {
    try {
      const result = await getSingleProduct(product_id);
      if (result.success) {
        console.log(result, 'result for single here');
        setProduct(result.product);
        setCartStatus({
          show: false,
          amountToAdd: 1,
          error: '',
        });
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

  function handleCartInputChange(evt) {
    const numEvtValue = Number(evt.target.value);
    if (numEvtValue > 0) {
      setCartStatus({
        ...cartStatus,
        amountToAdd: numEvtValue,
        error: '',
      });
    } else {
      setCartStatus({
        ...cartStatus,
        error: 'Value must be greater than 1',
      });
    }
  }

  async function handleShoppingCartClick() {
    setCartStatus({
      ...cartStatus,
      show: !cartStatus.show,
    });
  }

  async function handleCartInputSubmit(evt, productId) {
    try {
      if (
        cartStatus.amountToAdd < 1 ||
        typeof cartStatus.amountToAdd !== 'number'
      ) {
        setCartStatus({
          ...cartStatus,
          error: 'Quantity cannot be less than 1',
        });
      } else {
        const cartItem = cart.items.find((item) => {
          return item.product_id === productId;
        });

        if (!cartItem) {
          const result = await addCartItem(
            token,
            productId,
            cartStatus.amountToAdd
          );

          if (result.success) {
            const cartResult = await getCart(token);
            setCartStatus({
              ...cartStatus,
              amountToAdd: 1,
              show: false,
              error: '',
            });
            setCart(cartResult);
          } else {
            setCartStatus({
              ...cartStatus,
              error: 'Error updating cart',
            });
          }
        } else {
          const result = await updateCartQuantity(
            token,
            cartItem.id,
            cartItem.quantity + cartStatus.amountToAdd
          );

          if (result.success) {
            const cartResult = await getCart(token);
            setCartStatus({
              ...cartStatus,
              amountToAdd: 1,
              show: false,
              error: '',
            });
            setCart(cartResult);
          } else {
            setCartStatus({
              ...cartStatus,
              error: 'Error updating cart',
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSingleProductPage();
    getAllCategoryFilter();
  }, []);

  return (
    <div id="single-product-page">
      <div id="single-product-top">
        <div id="single-left">
          <img src={product.pic_url} id="single-product-pic" />
        </div>
        <div id="single-right">
          <div id="single-top">
            <h2 className="important-product-detail" id="product-name">
              {product.name}
            </h2>
            <p id="product-description">{product.description}</p>
            <h4>Size: {product.size}</h4>
            <h3 className="important-product-detail" id="product-price">
              {product.price}
            </h3>
          </div>
          <hr />
          {token ? (
            <div className="add-cart-container">
              <div className="add-shopping-cart-icon-container">
                <AddShoppingCartIcon
                  className="add-shopping-cart-icon"
                  onClick={(evt) => {
                    handleShoppingCartClick(evt, product.id);
                  }}
                />
                {cartStatus.show ? <p>How many to add?</p> : null}
              </div>
              {cartStatus.show ? (
                <div className="show-cart-input">
                  <input
                    className="single-cart-input"
                    onChange={(evt) => {
                      handleCartInputChange(evt);
                    }}
                    type="number"
                    value={cartStatus.amountToAdd}
                  />
                  <button
                    type="submit"
                    className="cart-button"
                    onClick={(evt) => {
                      handleCartInputSubmit(evt, product.id);
                    }}
                  >
                    Add
                  </button>
                </div>
              ) : null}
              {cartStatus.error ? (
                <p className="cart-warning">{cartStatus.error}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <h4>Details:</h4>
      <div id="single-product-bottom">
        <p>
          <span className="detail-header">Fragrance:</span> {product.fragrance}
        </p>
        <p>
          <span className="detail-header">Color:</span> {product.color}
        </p>
        <p>
          <span className="detail-header">Category:</span> {product.category_id}
        </p>
      </div>
    </div>
  );
}

export default SingleProduct;
