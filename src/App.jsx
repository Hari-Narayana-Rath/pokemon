import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./index.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=500");
      const data = await response.json();

      // Fetch details for each Pokémon
      const detailedPokemonList = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailsResponse = await fetch(pokemon.url);
          const detailsData = await detailsResponse.json();
          return {
            ...pokemon,
            details: detailsData,
          };
        })
      );

      setPokemonList(detailedPokemonList);
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
            className="card border-4 border-yellow-500 rounded-xl shadow-lg p-4 bg-black cursor-pointer"
            onClick={() => setSelectedPokemon(pokemon.details)}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.details.id}.png`}
              alt={pokemon.name}
              className="w-24 h-24 object-contain mx-auto"
            />
            <h2 className="text-lg font-semibold mt-4 capitalize text-yellow-300">{pokemon.name}</h2>
          </div>
        ))}
      </div>

      {/* Modal to display Pokémon details */}
      {selectedPokemon && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
            <button
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full"
              onClick={() => setSelectedPokemon(null)}
            >
              Close
            </button>
            <h2 className="text-2xl font-bold mb-4 capitalize">
              {selectedPokemon.name}
            </h2>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`}
              alt={selectedPokemon.name}
              className="w-48 h-48 object-contain mx-auto"
            />
            <p className="mt-4">
              <strong>Height:</strong> {selectedPokemon.height}
            </p>
            <p>
              <strong>Weight:</strong> {selectedPokemon.weight}
            </p>
            <p>
              <strong>Abilities:</strong>{" "}
              {selectedPokemon.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </p>
            <p>
              <strong>Base Experience:</strong> {selectedPokemon.base_experience}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
