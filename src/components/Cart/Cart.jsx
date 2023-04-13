import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  updateCartQuantity,
  deleteCartItem,
  stripeCheckout,
} from '../../apiAdapters';

import { Oval } from 'react-loader-spinner';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

function Cart({
  token,
  cart,
  setCart,
  cartQuantities,
  setCartQuantities,
  hasItems,
  initialLoad,
}) {
  const navigate = useNavigate();

  const total = hasItems
    ? cart.items.reduce((x, y) => {
        const cleanY = y.product_price.slice(1);
        const numY = parseFloat(cleanY);

        return x + numY * cartQuantities[y.id].quantity;
      }, 0)
    : 0;

  const dollarTotal = `$${total.toFixed(2)}`;

  const sizeDict = {
    S: 'Small',
    M: 'Medium',
    L: 'Large',
  };

  console.log('cart quantities', cartQuantities);

  async function handleQuantityChangeSubmit(evt, itemId) {
    try {
      setCartQuantities({
        ...cartQuantities,
        [itemId]: {
          ...cartQuantities[itemId],
          loaders: {
            ...cartQuantities[itemId].loaders,
            edit: true,
          },
        },
      });

      const newQuantity = cartQuantities[itemId].quantity;

      const response = await updateCartQuantity(token, itemId, newQuantity);

      if (response.success) {
        const cartCopy = {
          ...cart,
          items: cart.items.map((item) => {
            if (item.id === response.item.id) {
              return {
                ...item,
                quantity: response.item.quantity,
              };
            } else {
              return item;
            }
          }),
        };

        setCart(cartCopy);
        const cartQuantityCopy = {
          ...cartQuantities,
          [itemId]: {
            ...cartQuantities[itemId],
            showEdit: !cartQuantities[itemId].showEdit,
            error: '',
            loaders: {
              ...cartQuantities[itemId].loaders,
              edit: false,
            },
          },
        };

        setCartQuantities(cartQuantityCopy);
      } else {
        setCartQuantities({
          ...cartQuantities,
          [itemId]: {
            ...cartQuantities[itemId],
            error: 'Quantity change was not successful',
            loaders: {
              ...cartQuantities[itemId].loaders,
              edit: false,
            },
          },
        });
      }
    } catch (error) {
      console.error('error updating back end cart quantity', error);
    }
  }

  // Updates cart on the back end as well when request is made
  function handleQuantityChange(evt, itemId) {
    let newValue = evt.target.value;
    newValue = Number(newValue);
    const newQuantityObject = cartQuantities[itemId];
    let cartQuantityCopy;

    if (newValue < 1) {
      cartQuantityCopy = {
        ...cartQuantities,
        [itemId]: {
          ...newQuantityObject,
          error: 'Quantity cannot be less than 1.',
        },
      };
    } else {
      cartQuantityCopy = {
        ...cartQuantities,
        [itemId]: {
          ...newQuantityObject,
          quantity: newValue,
          error: '',
        },
      };
    }

    setCartQuantities(cartQuantityCopy);
  }

  async function handleDeleteClick(evt, itemId) {
    try {
      setCartQuantities({
        ...cartQuantities,
        [itemId]: {
          ...cartQuantities[itemId],
          loaders: {
            ...cartQuantities[itemId].loaders,
            delete: true,
          },
        },
      });

      const response = await deleteCartItem(token, itemId);

      if (response.success) {
        const item = response.cartItem;
        const responseId = item.id;

        const cartCopy = {
          ...cart,
          items: [...cart.items].filter((item) => {
            return item.id !== responseId;
          }),
        };

        setCart(cartCopy);
        setCartQuantities({
          ...cartQuantities,
          [itemId]: {
            ...cartQuantities[itemId],
            loaders: {
              ...cartQuantities[itemId].loaders,
              delete: false,
            },
          },
        });
      } else {
        setCartQuantities({
          ...cartQuantities,
          [itemId]: {
            ...cartQuantities[itemId],
            error: 'Error deleting item from cart.',
            loaders: {
              ...cartQuantities[itemId].loaders,
              delete: true,
            },
          },
        });
      }
    } catch (error) {
      console.error('error deleting item', error);
    }
  }

  function handleShowEditClick(evt, itemId) {
    const newQuantityObject = cartQuantities[itemId];
    let cartQuantityCopy = {};
    let currentQuantity = 1;

    if (evt.target.innerText === "Don't update") {
      const cartItem = cart.items.find((item) => {
        return item.id === itemId;
      });

      currentQuantity = cartItem.quantity;
      cartQuantityCopy = {
        ...cartQuantities,
        [itemId]: {
          ...newQuantityObject,
          quantity: currentQuantity,
          showEdit: !cartQuantities[itemId].showEdit,
        },
      };
    } else {
      cartQuantityCopy = {
        ...cartQuantities,
        [itemId]: {
          ...newQuantityObject,
          showEdit: !cartQuantities[itemId].showEdit,
        },
      };
    }

    setCartQuantities(cartQuantityCopy);
  }

  function handleCheckoutClick() {
    stripeCheckout(token);
  }

  return (
    <div id="full-cart-page">
      {!token ? (
        <p>Please log in to use the cart.</p>
      ) : initialLoad ? (
        <div className="full-loading-screen">
          <Oval
            className="loading-spinner"
            height={'4em'}
            width={'4em'}
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
      ) : (
        <>
          <div className="horizontal-flex" id="cart-container">
            {hasItems ? (
              [...cart.items]
                .sort((first, second) => {
                  return first.id < second.id;
                })
                .map((item) => {
                  return (
                    <div key={`cartKey ${item.id}`} className="cart-item">
                      <img
                        className="cart-image cart-subitem"
                        src={item.product_pic_url}
                      />
                      <div className="cart-content cart-subitem">
                        <div className="cart-item-information">
                          <h3 className="cart-title">{item.product_name}</h3>
                          <p className="other-product-info">
                            Product Size: {sizeDict[item.product_size]}
                          </p>
                          <p className="other-product-info">
                            Product Fragrance: {item.product_fragrance}
                          </p>
                        </div>
                        <div className="cart-item-pricing">
                          <div className="quantity-info">
                            <p>{item.product_price}</p>
                            {!cartQuantities[item.id].showEdit ? (
                              <p>Quantity: {item.quantity}</p>
                            ) : (
                              <div className="quantity-container">
                                <p>Quantity:</p>
                                <input
                                  name="quantity"
                                  type="number"
                                  className="quantity-input"
                                  value={cartQuantities[item.id].quantity}
                                  onChange={(evt) => {
                                    handleQuantityChange(evt, item.id);
                                  }}
                                />
                                <div className="loader-container">
                                  <button
                                    className={
                                      cartQuantities[item.id].loaders.edit
                                        ? 'fade-loader'
                                        : null
                                    }
                                    onClick={(evt) => {
                                      cartQuantities[item.id].loaders.edit
                                        ? null
                                        : handleQuantityChangeSubmit(
                                            evt,
                                            item.id
                                          );
                                    }}
                                    type="submit"
                                  >
                                    Submit
                                  </button>
                                  <div
                                    onClick={
                                      cartQuantities[item.id].loaders.edit
                                        ? null
                                        : (evt) => {
                                            handleQuantityChangeSubmit(
                                              evt,
                                              item.id
                                            );
                                          }
                                    }
                                    className="spinner-container"
                                  >
                                    {cartQuantities[item.id].loaders.edit ? (
                                      <Oval
                                        className="loading-spinner"
                                        height={'0.75em'}
                                        width={'0.75em'}
                                        color="#db7c5a"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                        ariaLabel="oval-loading"
                                        secondaryColor="#db7c5a"
                                        strokeWidth={20}
                                        strokeWidthSecondary={20}
                                      />
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="cart-quantity-container">
                            <button
                              onClick={(evt) => {
                                handleShowEditClick(evt, item.id);
                              }}
                            >
                              {!cartQuantities[item.id].showEdit
                                ? 'Update Quantity'
                                : `Don't update`}
                            </button>
                            <Tooltip title="Remove">
                              <div className="loader-container">
                                <DeleteIcon
                                  className={
                                    cartQuantities[item.id].loaders.delete
                                      ? 'delete-icon fade-loader'
                                      : 'delete-icon'
                                  }
                                  onClick={(evt) => {
                                    cartQuantities[item.id].loaders.delete
                                      ? null
                                      : handleDeleteClick(evt, item.id);
                                  }}
                                />
                                <div
                                  onClick={
                                    cartQuantities[item.id].loaders.delete
                                      ? null
                                      : (evt) => {
                                          handleDeleteClick(evt, item.id);
                                        }
                                  }
                                  className="spinner-container"
                                >
                                  {cartQuantities[item.id].loaders.delete ? (
                                    <Oval
                                      className="loading-spinner"
                                      height={'1em'}
                                      width={'1em'}
                                      color="#6a97a6"
                                      wrapperStyle={{}}
                                      wrapperClass=""
                                      visible={true}
                                      ariaLabel="oval-loading"
                                      secondaryColor="#6a97a6"
                                      strokeWidth={20}
                                      strokeWidthSecondary={20}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            </Tooltip>
                          </div>

                          {cartQuantities[item.id].error ? (
                            <p>{cartQuantities[item.id].error}</p>
                          ) : null}
                        </div>
                      </div>
                      <div className="cart-item-subtotal cart-subitem">
                        <p className="cart-subtotal">
                          Subtotal:&nbsp;
                          {`$${(
                            cartQuantities[item.id].quantity *
                            parseFloat(item.product_price.slice(1))
                          ).toFixed(2)}`}
                        </p>
                      </div>
                    </div>
                  );
                })
            ) : (
              <div>No items in cart!</div>
            )}
          </div>
          <div id="cart-total-sticky">
            <div id="cart-total-checkout-container">
              <div>Total: {dollarTotal}</div>
              {hasItems ? (
                <button onClick={handleCheckoutClick}>Checkout</button>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
