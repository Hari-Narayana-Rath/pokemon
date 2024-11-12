import React from 'react';
import './Navbar.css';
import pokemonLogo from './assets/pokemon-logo.jpg';

function Navbar() {
  return (
    <nav className="navbar">
      <img src={pokemonLogo} alt="Pokémon Logo" />
    </nav>
  );
}

export default Navbar;
