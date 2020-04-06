import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import pokemonWithoutSprite from 'assets/pokemonWithoutSprite.png';
import Search from './Search';
import usePokemonPagination from '../hooks/usePokemonPagination';
import Spinner from './Spinner';
import { SelectedPokemonContext } from '../contexts/SelectedPokemonContext';

const Box = styled.section`
  grid-area: 3/1/3/4;
  background-color: white;
  padding: 2rem;
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
  margin-bottom: 1rem;
`;

const Pokemon = styled.div<{ selected: boolean }>`
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
  background-color: ${({ selected }) =>
    selected ? 'rgba(184,184,184,0.71)' : 'transparent'};
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

  const [selected, setSelected] = useContext(SelectedPokemonContext);
  const { Pagination, pokemonPage, pageSize } = usePokemonPagination(
    readyFilter
  );

  const isLoading = loading < pageSize - 1;

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
            display: isLoading ? 'none' : 'grid',
          }}
        >
          {pokemonPage?.map((pokemon, i) => (
            <Pokemon
              key={i}
              onClick={() => {
                setSelected(pokemon.index);
              }}
              selected={selected === pokemon.index}
            >
              <Hover />
              <PokemonImg
                onLoad={() => setLoading(x => x + 1)}
                src={pokemon.sprites.front_default ?? pokemonWithoutSprite}
                alt={pokemon.name}
                title={pokemon.name}
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
