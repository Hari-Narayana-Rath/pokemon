import React from 'react';
import './Navbar.css';
import pokemonLogo from './pokemon-logo.png'; // Import the local image file

function Navbar() {
  return (
    <nav className="navbar">
      <img 
        src={pokemonLogo} 
        alt="Pokémon Logo" 
        className="logo-img" 
      />
    </nav>
  );
}

export default Navbar;
