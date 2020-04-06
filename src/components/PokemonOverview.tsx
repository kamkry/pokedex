import React from 'react';
import styled from 'styled-components';
import { IconButton as IconButtonBase } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import usePokemonInfo from '../hooks/usePokemonInfo';
import Spinner from './Spinner';

const Box = styled.section`
  grid-area: 3/4/3/7;
  background-color: white;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const PokemonImg = styled.img`
  image-rendering: pixelated;
  transform: scale(2);
  margin: 1rem 3rem 0;
`;

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
`;

const IconButton = styled(IconButtonBase)`
  z-index: 1;
`;

const PokemonOverview: React.FC = () => {
  const [pokemon, loading, previous, next] = usePokemonInfo();

  if (loading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box>
      <HeaderWrapper>
        <IconButton onClick={previous}>
          <NavigateBefore />
        </IconButton>
        <PokemonImg src={!loading && pokemon.sprites.front_default} />
        <IconButton onClick={next}>
          <NavigateNext />
        </IconButton>
      </HeaderWrapper>
    </Box>
  );
};

export default PokemonOverview;
