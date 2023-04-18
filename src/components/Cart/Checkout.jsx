import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkout } from '../../apiAdapters';

import { Oval } from 'react-loader-spinner';

function Checkout({ token, cart, setCart, getCart, initialLoad }) {
  const [error, setError] = useState('');
  const [checkoutLoad, setCheckoutLoad] = useState(false);

  const hasCart = Object.keys(cart).length > 0;
  const hasItems = hasCart && cart.items.length > 0;

  const total = hasItems
    ? cart.items.reduce((x, y) => {
        const cleanY = y.product_price.slice(1);
        const numY = parseFloat(cleanY);

        return x + numY * y.quantity;
      }, 0)
    : 0;

  const dollarTotal = `$${total.toFixed(2)}`;

  async function handleCheckoutClick() {
    try {
      if (token && hasItems) {
        setCheckoutLoad(true);
        const checkoutResponse = await checkout(token, cart?.id, 'Completed');

        if (checkoutResponse.success) {
          setCart(await getCart(token));
          setShowConfirmation(true);
        }

        setCheckoutLoad(false);
      } else {
        setError('Error checking out your cart');
      }
    } catch (error) {
      console.error('error getting cart', error);
    }
  }

  return (
    <div id="checkout-full-page">
      initialLoad ? (
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
      <div id="checkout-start-page">
        <h1>Checkout</h1>
        <p>Thank you for shopping with us!</p>
        {!hasItems ? (
          <>
            <p>It looks like you don't have any items!</p>
            <p>
              Click any buttons in the Navbar to go back, or{' '}
              <Link to="/">click here</Link> to go back.
            </p>
          </>
        ) : (
          <div className="checkout-total" id="checkout-with-items">
            <p>Your total is: {dollarTotal}</p>

            <div className="loader-container">
              <button
                className={checkoutLoad ? 'fade-loader' : null}
                onClick={(evt) => {
                  checkoutLoad ? null : handleCheckoutClick();
                }}
              >
                Checkout
              </button>
              <div
                onClick={
                  checkoutLoad
                    ? null
                    : (evt) => {
                        handleCheckoutClick();
                      }
                }
                className="spinner-container"
              >
                {checkoutLoad ? (
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
        {error ? <p></p> : null}
      </div>
      )
    </div>
  );
}

export default Checkout;
