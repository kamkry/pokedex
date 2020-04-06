import React, { useContext, useEffect, useState } from 'react';
import { Pagination as PaginationBase } from '@material-ui/lab';
import { PokemonContext } from 'contexts/PokemonContext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { getPage, PAGE_SIZE } from 'helpers/pagination';
import styled from 'styled-components';

export const getPokemonProperties = (list: any[]) => {
  const promises = list.map((pokemon: any) => {
    return fetch(pokemon.url)
      .then(r => r.json())
      .then(r => ({ ...r, index: pokemon.index }));
  });
  return Promise.all(promises) as Promise<any>;
};

const StyledPagination = styled(PaginationBase)`
  & * {
    color: ${({ theme }) => theme.textAccent};
  }
`;

interface PaginationProps {
  disabled: boolean;
}

type usePokemonPaginationReturn = [React.FC<PaginationProps>, any, number];

const usePokemonPagination = (filter: string): usePokemonPaginationReturn => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pokemonPage, setPokemonPage] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const pokemons = useContext(PokemonContext);

  useEffect(() => {
    setCurrentPage(0);
  }, [filter]);

  useEffect(() => {
    setPokemonPage([]);
    const filtered = pokemons.data.filter(({ name }) => name.includes(filter));

    setPageCount(
      filter
        ? Math.ceil(filtered.length / PAGE_SIZE)
        : Math.ceil(pokemons.data.length / PAGE_SIZE)
    );

    const sliced = getPage(filtered, currentPage);
    getPokemonProperties(sliced).then(res => {
      setPokemonPage(res);
      setPageSize(res.filter((p: any) => p.sprites.front_default).length);
    });
  }, [currentPage, filter, pokemons]);

  const theme = createMuiTheme({ typography: { htmlFontSize: 10 } });

  const Pagination: React.FC<PaginationProps> = ({ disabled }) => (
    <ThemeProvider theme={theme}>
      <StyledPagination
        defaultPage={1}
        count={pageCount}
        color="secondary"
        page={currentPage + 1}
        onChange={(_e, page) => setCurrentPage(page - 1)}
        disabled={disabled}
      />
    </ThemeProvider>
  );

  return [Pagination, pokemonPage, pageSize];
};

export default usePokemonPagination;
