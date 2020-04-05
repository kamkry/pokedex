import React, { useState } from 'react';
import styled from 'styled-components';
import pokemonWithoutSprite from 'assets/pokemonWithoutSprite.png';
import Search from './Search';
import usePokemonPagination from '../hooks/usePokemonPagination';

const Box = styled.section`
  grid-area: 3/1/3/4;
  background-color: white;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  -webkit-backface-visibility: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0.5rem;
  min-height: 0;
  min-width: 0;
  height: 100%;
`;

const Pokemon = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10%;
  transition: background-color 0.1s ease-out, transform 0.1s ease-out;

  :hover {
    background-color: #e3eff4;
  }
  :hover,
  & > * {
    transform: scale(2);
  }
  :hover :after {
    content: 'siema';
    height: 100px;
    width: 100px;
    background-color: red;
  }

  :active {
    background-color: #d0dbe0;
  }
`;
const PokemonImg = styled.img`
  transform: scale(0.6);
`;

const PokemonList: React.FC = () => {
  const [filter, setFilter] = useState('');

  const { Pagination, pokemonPage } = usePokemonPagination(filter);

  return (
    <>
      <Search value={filter} onChange={e => setFilter(e.target.value)} />
      <Box>
        <Grid>
          {pokemonPage?.map((pokemon, i) => (
            <Pokemon key={i}>
              <PokemonImg
                src={pokemon.sprites.front_default ?? pokemonWithoutSprite}
                alt={pokemon.name}
              />
            </Pokemon>
          ))}
        </Grid>
        <div>
          <Pagination />
        </div>
      </Box>
    </>
  );
};

export default PokemonList;
