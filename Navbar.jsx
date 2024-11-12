import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <img 
        src="/pokemon-logo.png" 
        alt="Pokémon logo" 
        className="logo-img" 
      />
    </nav>
  );
}

export default Navbar;
