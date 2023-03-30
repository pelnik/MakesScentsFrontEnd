import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar() {
  return (
    <div id="Navbar">
      <div className="sub-navbar" id="left-navbar">
        This is the nav bar
      </div>
      <div className="sub-navbar" id="right-navbar">
        <ShoppingCartIcon />
      </div>
    </div>
  );
}

export default Navbar;
