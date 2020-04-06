import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { SelectedPokemonContext } from '../contexts/SelectedPokemonContext';
import { PokemonContext } from '../contexts/PokemonContext';

const Box = styled.section`
  grid-area: 3/4/3/7;
  background-color: white;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const PokemonImg = styled.img`
  margin-top: 1rem;
  image-rendering: pixelated;
  transform: scale(2);
`;

const PokemonOverview: React.FC = () => {
  const pokemons = useContext(PokemonContext);
  const [selected, setSelected] = useContext(SelectedPokemonContext);

  const next = () => {
    if (selected < pokemons.data.length) {
      setSelected(i => i + 1);
    }
  };
  const previous = () => {
    if (selected > 0) {
      setSelected(i => i + 1);
    }
  };
  console.log(pokemons.data[selected]);
  return (
    <Box>
      <button onClick={previous}>prev</button>
      <button onClick={next}>next</button>
      <PokemonImg src={selected?.sprites?.front_default} />
    </Box>
  );
};

export default PokemonOverview;
