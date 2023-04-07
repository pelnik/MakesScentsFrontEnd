import React, { useState, useEffect } from 'react';
import {
  getSingleProduct,
  getAllCategories,
  addCartItem,
  updateCartQuantity,
} from '../../apiAdapters';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Oval } from 'react-loader-spinner';

function SingleProduct({ selectedProduct, token, cart, setCart, getCart }) {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartStatus, setCartStatus] = useState({
    show: false,
    amountToAdd: 1,
    error: '',
    cartLoading: false,
  });
  const product_id = selectedProduct.product_id;

  async function getSingleProductPage() {
    try {
      const result = await getSingleProduct(product_id);
      if (result.success) {
        setProduct(result.product);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(
    'cart status',
    cartStatus,
    'class',
    'add-shopping-cart-icon' + (cartStatus.cartLoading ? ' fade-loader' : '')
  );

  async function getAllCategoryFilter() {
    try {
      const result = await getAllCategories();
      if (result.success) {
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
        setCartStatus({
          ...cartStatus,
          cartLoading: true,
        });

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
              cartLoading: false,
            });
            setCart(cartResult);
          } else {
            setCartStatus({
              ...cartStatus,
              error: 'Error updating cart',
              cartLoading: false,
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
              cartLoading: false,
            });
            setCart(cartResult);
          } else {
            setCartStatus({
              ...cartStatus,
              error: 'Error updating cart',
              cartLoading: false,
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const categoryIdToName = (id) => {
    const pair = categories.filter((category) => {
      return category.id === id;
    });
    return pair.length > 0 ? pair[0].category_name : null;
  };

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
            <div className="add-cart-container loader-container">
              <div className="add-shopping-cart-icon-container">
                <AddShoppingCartIcon
                  className={
                    'add-shopping-cart-icon' +
                    (cartStatus.cartLoading ? ' fade-loader' : '')
                  }
                  onClick={(evt) => {
                    handleShoppingCartClick(evt, product.id);
                  }}
                />
                {cartStatus.show ? (
                  <p className={cartStatus.cartLoading ? 'fade-loader' : null}>
                    How many to add?
                  </p>
                ) : null}
              </div>
              {cartStatus.show ? (
                <div
                  className={
                    'show-cart-input' +
                    (cartStatus.cartLoading ? ' fade-loader' : '')
                  }
                >
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
                <p
                  className={
                    'cart-warning' +
                    (cartStatus.cartLoading ? ' fade-loader' : '')
                  }
                >
                  {cartStatus.error}
                </p>
              ) : null}
              {cartStatus.cartLoading ? (
                <div className="spinner-container">
                  <Oval
                    className="loading-spinner"
                    height={'2em'}
                    width={'2em'}
                    color="#db7c5a"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#db7c5a"
                    strokeWidth={20}
                    strokeWidthSecondary={20}
                  />
                </div>
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
          <span className="detail-header">Category:</span>{' '}
          {categoryIdToName(product.category_id)}
        </p>
      </div>
    </div>
  );
}

export default SingleProduct;
