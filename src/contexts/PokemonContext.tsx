import React, { useEffect, createContext, useState } from 'react';
import { API_URL } from '../index';

interface Result {
  loading: boolean;
  data: any[];
}
const defaultResult: Result = {
  loading: true,
  data: [],
};

export const getPokemonProperties = list => {
  const promises = list.map(pokemon => {
    return fetch(pokemon.url).then(r => r.json());
  });
  return Promise.all(promises);
};

export const PokemonContext = createContext(defaultResult);

export const PokemonProvider: React.FC = ({ children }) => {
  const [result, setResult] = useState(defaultResult);

  const fetchData = (url: string) => {
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        setResult({ loading: false, data: res.results });
      });
  };

  useEffect(() => {
    fetchData(`${API_URL}/pokemon?limit=1000`);
  }, []);

  return (
    <PokemonContext.Provider value={result}>{children}</PokemonContext.Provider>
  );
};
