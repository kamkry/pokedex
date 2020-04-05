import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from '@material-ui/lab';
import {
  getPokemonProperties,
  PokemonContext,
} from '../contexts/PokemonContext';
import Search from './Search';

const Box = styled.section`
  grid-area: 3/1/3/4;
  background-color: white;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
  transition: background-color 0.1s linear;

  :hover {
    background-color: #e3eff4;
  }
  :hover,
  & > * {
    transform: scale(2);
  }
  :active {
    background-color: #d0dbe0;
  }
`;
const PokemonImg = styled.img`
  transform: scale(0.6);
`;

const NoImgText = styled.div`
  font-size: 0.5rem;
`;

const PAGE_SIZE = 56;

const PokemonList: React.FC = () => {
  const pokemons = useContext(PokemonContext);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pokemonsInfo, setPokemonsInfo] = useState([]);

  useEffect(() => {
    if (pokemons.loading) return;
    const filtered = pokemons.data.filter(({ name }) => name.includes(filter));

    const sliced = filter
      ? filtered.slice(0, PAGE_SIZE)
      : filtered.slice(
          currentPage * PAGE_SIZE,
          currentPage * PAGE_SIZE + PAGE_SIZE
        );

    getPokemonProperties(sliced).then(res => {
      setPokemonsInfo(res);
    });
  }, [currentPage, filter, pokemons]);

  return (
    <>
      <Search value={filter} onChange={e => setFilter(e.target.value)} />
      <Box>
        <Grid>
          {pokemonsInfo?.map((pokemon, i) => (
            <Pokemon key={i}>
              {pokemon.sprites.front_default ? (
                <PokemonImg
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
              ) : (
                <NoImgText>{pokemon.name}</NoImgText>
              )}
            </Pokemon>
          ))}
        </Grid>
        <div>
          <Pagination
            count={
              filter
                ? Math.ceil(pokemonsInfo.length / PAGE_SIZE)
                : Math.ceil(pokemons.data.length / PAGE_SIZE)
            }
            color="secondary"
            page={currentPage + 1}
            onChange={(_, page) => setCurrentPage(page - 1)}
          />
        </div>
      </Box>
    </>
  );
};

export default PokemonList;
