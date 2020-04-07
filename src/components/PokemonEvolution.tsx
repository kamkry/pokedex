import React, { useContext } from 'react';
import styled from 'styled-components';
import pokemonWithoutSprite from 'assets/pokemonWithoutSprite.png';
import { NavigateNext } from '@material-ui/icons';
import { SelectedPokemonContext } from 'contexts/SelectedPokemonContext';
import { PokemonContext } from 'contexts/PokemonContext';
import usePokemonEvolution from 'hooks/usePokemonEvolution';
import Spinner from './Spinner';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

const EvolutionChain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.textAccent};

  @media (max-width: 350px) {
    transform: scale(0.8);
  }
`;
const Label = styled.label`
  color: gray;
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

      border-bottom: 0.5rem solid ${({ theme }) => theme.textAccent};
    }
  }
`;

interface PokemonEvolutionProps {
  evolution: any;
}

const PokemonEvolution: React.FC<PokemonEvolutionProps> = ({ evolution }) => {
  const [selected, setSelected] = useContext(SelectedPokemonContext);
  const pokemons = useContext(PokemonContext);
  const [chain, loading] = usePokemonEvolution(evolution);

  const changeSelected = (name: string) => {
    setSelected(pokemons.data.find(p => p.name === name).index);
  };

  if (loading) return <Spinner />;

  return (
    <Wrapper>
      <Label>{chain && 'Evolution'}</Label>
      <EvolutionChain>
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
      </EvolutionChain>
    </Wrapper>
  );
};

export default PokemonEvolution;
