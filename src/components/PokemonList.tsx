import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import pokemonWithoutSprite from 'assets/pokemonWithoutSprite.png';
import pokeball from 'assets/pokeball.png';
import Search from './Search';
import usePokemonPagination, { PAGE_SIZE } from '../hooks/usePokemonPagination';
import Spinner from './Spinner';

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
  border-radius: 50%;
  justify-content: center;
  transition: background-color 0.1s ease-out, transform 0.1s ease-out;

  :hover {
    z-index: 1;
  }
  :hover,
  & > * {
    transform: scale(1.5);
  }
  :active {
    filter: brightness(0.5);
  }
`;
const PokemonImg = styled.img`
  transform: scale(0.6);
`;
const Hover = styled.div`
  position: absolute;
`;

const PokemonList: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [readyFilter, setReadyFilter] = useState('');
  const [loading, setLoading] = useState(0);
  const timeoutRef = useRef(null);

  const { Pagination, pokemonPage } = usePokemonPagination(readyFilter);

  const isLoading = loading < pokemonPage.length - 1;
  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setReadyFilter(filter);
    }, 500);
  }, [filter]);

  useEffect(() => {
    setLoading(0);
  }, [pokemonPage]);

  return (
    <>
      <Search value={filter} onChange={e => setFilter(e.target.value)} />
      <Box>
        {isLoading ? <Spinner /> : null}
        <Grid
          style={{
            visibility: isLoading ? 'hidden' : 'visible',
          }}
        >
          {pokemonPage?.map((pokemon, i) => (
            <Pokemon key={i}>
              <Hover />
              <PokemonImg
                onLoad={() => setLoading(x => x + 1)}
                src={pokemon.sprites.front_default ?? pokemonWithoutSprite}
                alt={pokemon.name}
              />
            </Pokemon>
          ))}
        </Grid>
        <div>
          <Pagination disabled={isLoading} />
        </div>
      </Box>
    </>
  );
};

export default PokemonList;
