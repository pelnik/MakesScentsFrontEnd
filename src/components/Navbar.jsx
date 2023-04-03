import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

function Navbar({ logUserOut, token, user }) {
  const navigate = useNavigate();

  return (
    <div id="Navbar">
      <div className="sub-navbar" id="left-navbar">
        <ArrowBackIcon
          onClick={() => {
            navigate(-1);
          }}
        />
        <HomeIcon
          onClick={() => {
            navigate('/');
          }}
        />
      </div>
      <div className="sub-navbar" id="mid-navbar">
          <Link to="/products" className="navLink" >Store</Link>
          {token && <Link to="/profile" className="navLink" >Profile</Link>}
          {user.is_admin && <Link to="/admin-users" className="navLink" >Admin</Link>}
      </div>
      <div className="sub-navbar" id="right-navbar">
        {token ? (
          <LogoutIcon onClick={logUserOut} />
        ) : (
          <LoginIcon
            onClick={() => {
              navigate('/loginregister');
            }}
          />
        )}
        <ShoppingCartIcon
          onClick={() => {
            navigate('/cart');
          }}
        />
      </div>
    </div>
  );
}

export default Navbar;
