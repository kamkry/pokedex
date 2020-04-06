import React, { useEffect, useState } from 'react';
import { API_URL } from 'index';

const usePokemonEvolution = (evolution: any) => {
  const [chain, setChain] = useState([] as any[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!evolution.chain.evolves_to.length) {
      setLoading(false);
      return;
    }

    const names = [];
    let cur = evolution.chain;
    while (cur.evolves_to.length) {
      names.push(cur.species.name);
      // eslint-disable-next-line prefer-destructuring
      cur = cur.evolves_to[0];
    }
    names.push(cur.species.name);

    const promises = names.map(name => {
      return fetch(`${API_URL}/pokemon/${name}`).then(res => res.json());
    });

    Promise.all(promises).then(res => {
      setChain(res);
      setLoading(false);
    });
  }, []);

  return [chain, loading] as [any[], boolean];
};

export default usePokemonEvolution;
