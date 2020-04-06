import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import pokemonWithoutSprite from 'assets/pokemonWithoutSprite.png';
import { NavigateNext } from '@material-ui/icons';
import { API_URL } from '../index';
import { SelectedPokemonContext } from '../contexts/SelectedPokemonContext';
import { PokemonContext } from '../contexts/PokemonContext';
import Spinner from './Spinner';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

const Evolution = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
`;
const Label = styled.label`
  color: darkgrey;
`;

const Pokemon = styled.button`
  position: relative;
  background-color: transparent;
  border: none;

  :hover {
    filter: brightness(0.7);
  }
  :focus {
    filter: brightness(0.5);
    outline: none;
  }
  :disabled {
    &:hover {
      filter: none;
    }
    &:after {
      content: '';
      position: absolute;
      right: 50%;
      top: 90%;
      width: 0;
      height: 0;
      border-left: 0.5rem solid transparent;
      border-right: 0.5rem solid transparent;

      border-bottom: 0.5rem solid darkgrey;
    }
  }
`;

const PokemonEvolution = ({ evolution }) => {
  const [chain, setChain] = useState([]);
  const pokemons = useContext(PokemonContext);
  const [selected, setSelected] = useContext(SelectedPokemonContext);
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
  }, [evolution.chain, evolution.evolves_to]);

  const changeSelected = name => {
    setSelected(pokemons.data.find(p => p.name === name).index);
  };

  if (loading) return <Spinner />;

  return (
    <Wrapper>
      <Label>{chain.length ? 'Evolution' : ''}</Label>
      <Evolution>
        {chain
          .map(pokemon => (
            <Pokemon
              key={pokemon.id}
              onClick={() => changeSelected(pokemon.name)}
              disabled={pokemon.name === pokemons.data[selected].name}
            >
              <img
                src={pokemon.sprites.front_default ?? pokemonWithoutSprite}
                alt={pokemon.name}
                title={pokemon.name}
              />
            </Pokemon>
          ))
          .map((e, i) =>
            i < chain.length - 1 ? [e, <NavigateNext key={i} />] : [e]
          )}
      </Evolution>
    </Wrapper>
  );
};

export default PokemonEvolution;
