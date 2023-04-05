import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateCartQuantity, deleteCartItem } from '../../apiAdapters';

import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

function Cart({
  token,
  cart,
  setCart,
  cartQuantities,
  setCartQuantities,
  hasItems,
}) {
  const navigate = useNavigate();

  const total = hasItems
    ? cart.items.reduce((x, y) => {
        const cleanY = y.product_price.slice(1);
        const numY = parseFloat(cleanY);

        return x + numY * cartQuantities[y.id].quantity;
      }, 0)
    : 0;

  console.log('cart quantities', cartQuantities);

  const dollarTotal = `$${total.toFixed(2)}`;

  const sizeDict = {
    S: 'Small',
    M: 'Medium',
    L: 'Large',
  };

  async function handleQuantityChangeSubmit(evt, itemId) {
    try {
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
          },
        };

        setCartQuantities(cartQuantityCopy);
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
      }
    } catch (error) {
      console.error('error deleting item', error);
    }
  }

  function handleShowEditClick(evt, itemId) {
    console.log('showEdit evt', evt);
    const newQuantityObject = cartQuantities[itemId];
    let cartQuantityCopy = {};
    let currentQuantity = 1;

    if (evt.target.innerText === "Don't update") {
      const cartItem = cart.items.find((item) => {
        return item.id === itemId;
      });

      console.log('cart quantities', cartQuantities);
      console.log('cartItem', cartItem);
      currentQuantity = cartItem.quantity;
      console.log('currentQuantity', currentQuantity);
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
    navigate('/checkout');
  }

  return (
    <div id="full-cart-page">
      {!token ? (
        <p>Please log in to use the cart.</p>
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
                                <button
                                  onClick={(evt) => {
                                    handleQuantityChangeSubmit(evt, item.id);
                                  }}
                                  type="submit"
                                >
                                  Submit
                                </button>
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
                              <DeleteIcon
                                className="delete-icon"
                                onClick={(evt) => {
                                  handleDeleteClick(evt, item.id);
                                }}
                              />
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
