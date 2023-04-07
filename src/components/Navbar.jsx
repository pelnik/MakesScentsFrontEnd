import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

function Navbar({ logUserOut, token, user, cartQuantities }) {
  const navigate = useNavigate();

  function calculateCartAmount() {
    const keys = Object.keys(cartQuantities);
    let total = 0;

    if (keys.length === 0) {
      return 0;
    }

    keys.forEach((key) => {
      total += cartQuantities[key].quantity;
    });
    return total;
  }

  const cartAmount = calculateCartAmount();

  return (
    <div id="Navbar">
      <div className="sub-navbar" id="left-navbar">
        <ArrowBackIcon
          className="navbar-icon"
          onClick={() => {
            navigate(-1);
          }}
        />
      <Link to="/" className="TitleLink">
          Makes Scents
        </Link>
      </div>
      <div className="sub-navbar" id="mid-navbar">
        <Link to="/" className="navLink">
          Store
        </Link>
        {token && (
          <Link to="/profile" className="navLink">
            Profile
          </Link>
        )}
        {user.is_admin && (
          <Link to="/admin-users" className="navLink">
            Admin
          </Link>
        )}
      </div>
      <div className="sub-navbar" id="right-navbar">
        {token ? (
          <>
            <LogoutIcon className="navbar-icon" onClick={logUserOut} />
            <div id="shopping-cart-icon-container">
              {cartAmount === 0 ? null : (
                <div id="shopping-cart-number">
                  {cartAmount > 9 ? '9+' : cartAmount}
                </div>
              )}
              <ShoppingCartIcon
                className="navbar-icon"
                onClick={() => {
                  navigate('/cart');
                }}
              />
            </div>
          </>
        ) : (
          <LoginIcon
            className="navbar-icon"
            onClick={() => {
              navigate('/loginregister');
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
