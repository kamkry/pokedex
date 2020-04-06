import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import pokemonWithoutSprite from 'assets/pokemonWithoutSprite.png';
import { SelectedPokemonContext } from 'contexts/SelectedPokemonContext';
import usePokemonPagination from 'hooks/usePokemonPagination';
import useWaitForStopTyping from 'hooks/useWaitForStopTyping';
import Search from './Search';
import Spinner from './Spinner';

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
  width: 100%;
  margin-bottom: 1rem;
`;

const Pokemon = styled.button<{ selected: boolean }>`
  position: relative;
  border: none;
  margin: 0;
  border-radius: 50%;
  background-color: ${({ selected }) =>
  selected ? 'rgba(213,213,213,0.71)' : 'transparent'};
  transition: background-color 0.1s ease-out, transform 0.1s ease-out;

  :hover {
    z-index: 1;
  }
  :hover {
    transform: scale(${({ selected }) => (selected ? 1 : 1.5)});
  }
  & > img {
    position: absolute;
    transform: scale(1.5);
    width: 100%;
    left: 0;
    top: 0;
    pointer-events: none;
  }
  :focus {
    transform: scale(${({ selected }) => (selected ? 1 : 1.5)});
    background-color: #a1deff;
    outline: none;
    z-index: 1;
  }
`;
const PokemonImg = styled.img`
  transform: scale(0.6);
`;
const Hover = styled.div`
  position: absolute;
`;

const PokemonList: React.FC = () => {
  const [loading, setLoading] = useState(0);
  const [filter, setFilter] = useState('');
  const readyFilter = useWaitForStopTyping(filter);
  const [Pagination, pokemonPage, pageSize] = usePokemonPagination(readyFilter);
  const [selected, setSelected] = useContext(SelectedPokemonContext);

  const isLoading = loading < pageSize - 1;

  useEffect(() => {
    setLoading(0);
  }, [pokemonPage, filter]);

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
          {pokemonPage?.map((pokemon: any, i: number) => (
            <Pokemon
              key={i}
              tabIndex={0}
              onClick={() => {
                setSelected(pokemon.index);
              }}
              selected={selected === pokemon.index}
              disabled={selected === pokemon.index}
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
