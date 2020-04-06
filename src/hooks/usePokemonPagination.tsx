import React, { useContext, useEffect, useState } from 'react';
import { Pagination as PaginationBase } from '@material-ui/lab';
import { PokemonContext } from 'contexts/PokemonContext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

export const PAGE_SIZE = 56;

const getPage = (data: any[], page: number) => {
  return data.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
};

export const getPokemonProperties = list => {
  const promises = list.map(pokemon => {
    return fetch(pokemon.url)
      .then(r => r.json())
      .then(r => ({ ...r, index: pokemon.index }));
  });
  return Promise.all(promises) as Promise<any>;
};

const usePokemonPagination = filter => {
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
      setPageSize(res.filter(p => p.sprites.front_default).length);
    });
  }, [currentPage, filter, pokemons]);

  const theme = createMuiTheme({ typography: { htmlFontSize: 10 } });
  const Pagination = ({ disabled }) => (
    <ThemeProvider theme={theme}>
      <PaginationBase
        defaultPage={1}
        count={pageCount}
        color="secondary"
        page={currentPage + 1}
        onChange={(_e, page) => setCurrentPage(page - 1)}
        disabled={disabled}
      />
    </ThemeProvider>
  );

  return { Pagination, pokemonPage, pageSize };
};

export default usePokemonPagination;
