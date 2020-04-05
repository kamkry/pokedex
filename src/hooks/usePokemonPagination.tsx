import React, { useContext, useEffect, useState } from 'react';
import { Pagination as PaginationBase } from '@material-ui/lab';
import { PokemonContext } from 'contexts/PokemonContext';

export const PAGE_SIZE = 56;

const getPage = (data: any[], page: number) => {
  return data.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
};

export const getPokemonProperties = list => {
  const promises = list.map(pokemon => {
    return fetch(pokemon.url).then(r => r.json());
  });
  return Promise.all(promises) as Promise<any>;
};

const usePokemonPagination = filter => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pokemonPage, setPokemonPage] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const pokemons = useContext(PokemonContext);

  useEffect(() => {
    const filtered = pokemons.data.filter(({ name }) => name.includes(filter));

    setPageCount(
      filter
        ? Math.ceil(filtered.length / PAGE_SIZE)
        : Math.ceil(pokemons.data.length / PAGE_SIZE)
    );

    const sliced = getPage(filtered, currentPage);
    getPokemonProperties(sliced).then(res => {
      setPokemonPage(res);
    });
  }, [currentPage, filter, pokemons]);

  const Pagination = () => (
    <PaginationBase
      count={pageCount}
      color="secondary"
      page={currentPage + 1}
      onChange={(_e, page) => setCurrentPage(page - 1)}
    />
  );

  return { Pagination, pokemonPage };
};

export default usePokemonPagination;
