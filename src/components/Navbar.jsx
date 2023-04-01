import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

function Navbar() {
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
      <div className="sub-navbar" id="right-navbar">
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
