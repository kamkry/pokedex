import React, { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';
import { SelectedPokemonContext } from '../contexts/SelectedPokemonContext';

const usePokemonInfo = () => {
  const pokemons = useContext(PokemonContext);
  const [selectedIndex, setSelectedIndex] = useContext(SelectedPokemonContext);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (pokemons.loading) return;
      setLoading(true);

      const infoRes = await fetch(pokemons.data[selectedIndex].url);
      const info = await infoRes.json();
      setSelectedInfo(info);

      const speciesRes = await fetch(info.species.url);
      const species = await speciesRes.json();
      setSelectedInfo(p => ({ ...p, species }));

      const evolutionRes = await fetch(species.evolution_chain.url);
      const evolution = await evolutionRes.json();
      setSelectedInfo(p => ({ ...p, evolution }));

      setLoading(false);
    })();
  }, [pokemons, selectedIndex]);

  const previous = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(i => i - 1);
    }
  };
  const next = () => {
    if (selectedIndex < pokemons.data.length) {
      setSelectedIndex(i => i + 1);
    }
  };
  return [selectedInfo, loading, previous, next];
};

export default usePokemonInfo;
