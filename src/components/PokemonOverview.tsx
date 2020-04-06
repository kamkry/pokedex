import React, { useContext } from 'react';
import styled from 'styled-components';
import { SelectedPokemonContext } from '../contexts/SelectedPokemonContext';

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
  const [selected] = useContext(SelectedPokemonContext);

  return (
    <Box>
      <PokemonImg src={selected?.sprites.front_default} />
    </Box>
  );
};

export default PokemonOverview;
