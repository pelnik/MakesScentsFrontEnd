import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div id="Navbar">
      <div className="sub-navbar" id="left-navbar">
        This is the nav bar
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
