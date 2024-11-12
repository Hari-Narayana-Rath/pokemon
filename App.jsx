import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
function App() {
  const [pokemonList, setPokemonList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5000");
      const data = await response.json();
      setPokemonList(data.results);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Navbar />
      {/* Responsive grid layout for cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8 px-4">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.name}
            className="card border-4 border-yellow-500 rounded-xl shadow-lg p-4 bg-black"
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url
                .split("/")
                .slice(-2, -1)}.png`}
              alt={pokemon.name}
              className="w-24 h-24 object-contain mx-auto"
            />
            <h2 className="text-lg font-semibold mt-4">{pokemon.name}</h2>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
