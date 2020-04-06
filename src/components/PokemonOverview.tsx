import React from 'react';
import styled from 'styled-components';
import { IconButton as IconButtonBase } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import pokemonWithoutSprite from 'assets/pokemonWithoutSprite.png';
import usePokemonInfo from 'hooks/usePokemonInfo';
import Spinner from 'components/Spinner';
import PokemonTypeBadge from 'components/PokemonTypeBadge';
import PokemonMeasurement from 'components/PokemonMeasurement';
import PokemonStats from 'components/PokemonStats';
import PokemonEvolution from 'components/PokemonEvolution';

const Box = styled.section`
  grid-area: 3/4/3/7;
  background-color: ${({ theme }) => theme.background};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const PokemonImg = styled.img`
  image-rendering: pixelated;
  transform: scale(2);
  margin: 1rem 3rem 0;
`;

const CenterWrapper = styled.header`
  display: flex;
  align-items: center;
`;

const IconButton = styled(IconButtonBase)`
  z-index: 1;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  :hover {
    background-color: ${({ theme }) => theme.backgroundAccent};
  }
`;

const Id = styled.span`
  color: ${({ theme }) => theme.textAccent};
  margin-right: 0.5rem;
`;

const Name = styled.h2`
  font-weight: normal;
  z-index: 1;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background};
  opacity: 90%;
`;

const VerticalDivider = styled.span`
  background-color: ${({ theme }) => theme.text};
  width: 1px;
  height: 100%;
  margin: 0 1rem;
  opacity: 20%;
`;

const PokemonOverview: React.FC = () => {
  const [pokemon, loading, previous, next] = usePokemonInfo();

  if (loading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }
  return (
    <Box>
      <CenterWrapper>
        <IconButton onClick={previous} aria-label="Previous pokemon">
          <NavigateBefore />
        </IconButton>
        <PokemonImg
          src={pokemon.sprites.front_default ?? pokemonWithoutSprite}
          alt={pokemon.name}
        />
        <IconButton onClick={next} aria-label="Next pokemon">
          <NavigateNext />
        </IconButton>
      </CenterWrapper>
      <Name>
        <Id>{`#${pokemon.id}`}</Id>
        {pokemon.name}
      </Name>
      <CenterWrapper>
        <PokemonMeasurement name="height" value={`${pokemon.height / 10}m`} />
        <VerticalDivider />
        {pokemon.types.map((t: any) => (
          <PokemonTypeBadge key={t.slot} name={t.type.name} />
        ))}
        <VerticalDivider />
        <PokemonMeasurement name="weight" value={`${pokemon.weight / 10}kg`} />
      </CenterWrapper>
      <PokemonStats stats={pokemon.stats} />
      <PokemonEvolution evolution={pokemon.evolution} />
    </Box>
  );
};

export default PokemonOverview;
