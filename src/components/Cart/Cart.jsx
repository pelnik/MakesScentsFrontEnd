import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateCartQuantity, deleteCartItem } from '../../apiAdapters';

import DeleteIcon from '@mui/icons-material/Delete';

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

  const dollarTotal = `$${total.toFixed(2)}`;

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
    const newQuantityObject = cartQuantities[itemId];

    const cartQuantityCopy = {
      ...cartQuantities,
      [itemId]: {
        ...newQuantityObject,
        showEdit: !cartQuantities[itemId].showEdit,
      },
    };

    setCartQuantities(cartQuantityCopy);
  }

  function handleCheckoutClick() {
    navigate('/checkout');
  }

  return (
    <div id="full-cart-page">
      <div id="cart-container">
        {hasItems ? (
          [...cart.items]
            .sort((first, second) => {
              return first.id < second.id;
            })
            .map((item) => {
              return (
                <div key={`cartKey ${item.id}`} className="cart-item">
                  <img src={item.product_pic_url} />
                  <div>{item.product_name}</div>
                  <div>{item.product_price}</div>
                  <div>{item.product_size}</div>
                  {!cartQuantities[item.id].showEdit ? (
                    <div>{item.quantity}</div>
                  ) : (
                    <>
                      <input
                        name="quantity"
                        type="number"
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
                    </>
                  )}

                  <button
                    onClick={(evt) => {
                      handleShowEditClick(evt, item.id);
                    }}
                  >
                    {!cartQuantities[item.id].showEdit
                      ? 'Update Quantity'
                      : `Don't update`}
                  </button>
                  <DeleteIcon
                    onClick={(evt) => {
                      handleDeleteClick(evt, item.id);
                    }}
                  />
                  {cartQuantities[item.id].error ? (
                    <p>{cartQuantities[item.id].error}</p>
                  ) : null}
                </div>
              );
            })
        ) : (
          <div>No items in cart!</div>
        )}
      </div>
      <div>Total: {dollarTotal}</div>
      {hasItems ? (
        <button onClick={handleCheckoutClick}>Checkout</button>
      ) : null}
    </div>
  );
}

export default Cart;
