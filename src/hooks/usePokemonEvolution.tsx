import React, { useEffect, useState } from 'react';
import { API_URL } from 'index';

const processChain = (chain: any): Promise<any>[] => {
  const names = [];
  let cur = chain;
  while (cur.evolves_to.length) {
    names.push(cur.species.name);
    cur = cur.evolves_to[0];
  }
  names.push(cur.species.name);

  return names.map(name => {
    return fetch(`${API_URL}/pokemon/${name}`).then(res => res.json());
  });
};

const usePokemonEvolution = (evolution: any) => {
  const [chain, setChain] = useState([] as any[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!evolution.chain.evolves_to.length) {
      setLoading(false);
      return;
    }

    const processedChain = processChain(evolution.chain);
    Promise.all(processedChain).then(res => {
      setChain(res);
      setLoading(false);
    });
  }, [evolution.chain]);

  return [chain, loading] as [any[], boolean];
};

export default usePokemonEvolution;
