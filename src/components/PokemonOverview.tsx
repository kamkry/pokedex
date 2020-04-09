import { IconButton as IconButtonBase } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import pokemonWithoutSprite from 'assets/pokemonWithoutSprite.png';
import PokemonEvolution from 'components/PokemonEvolution';
import PokemonMeasurement from 'components/PokemonMeasurement';
import PokemonStats from 'components/PokemonStats';
import PokemonTypeBadge from 'components/PokemonTypeBadge';
import Spinner from 'components/Spinner';
import { PokemonContext } from 'contexts/PokemonContext';
import { ShowOverviewContext } from 'contexts/ShowOverviewContext';
import usePokemonInfo from 'hooks/usePokemonInfo';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { SelectedPokemonContext } from '../contexts/SelectedPokemonContext';

const Box = styled.section<{ show: boolean }>`
  grid-area: 3/4/3/7;
  background-color: ${({ theme }) => theme.background};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 960px) {
    grid-area: 3/1/3/1;
    position: relative;
    z-index: 1;
    overflow: hidden;
    display: ${({ show }) => (show ? 'flex' : 'none')};
  }
`;

const ScrollBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 500px) {
    overflow-y: scroll;
  }
`;

const PokemonImg = styled.img`
  image-rendering: pixelated;
  transform: scale(2);
  margin: 1rem 3rem 0;
`;

const CenterWrapper = styled.header`
  display: flex;
  justify-content: center;
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

const ReturnButton = styled(IconButtonBase)`
  position: absolute;
  left: 0;
  display: none;
  z-index: 2;
  color: ${({ theme }) => theme.textAccent};

  @media (max-width: 960px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

const PokemonOverview: React.FC = () => {
  const [pokemon, loading, previous, next] = usePokemonInfo();
  const [show, setShow] = useContext(ShowOverviewContext);
  const [selected] = useContext(SelectedPokemonContext);
  const pokemons = useContext(PokemonContext).data;

  if (loading) {
    return (
      <Box show={show}>
        <Spinner />
      </Box>
    );
  }
  return (
    <Box show={show}>
      <ReturnButton onClick={() => setShow(false)}>
        <NavigateBefore />
        Go back
      </ReturnButton>
      <CenterWrapper>
        <IconButton
          onClick={previous}
          aria-label="Previous pokemon"
          disabled={selected === 0}
        >
          <NavigateBefore />
        </IconButton>
        <PokemonImg
          src={pokemon.sprites.front_default ?? pokemonWithoutSprite}
          alt={pokemon.name}
        />
        <IconButton
          onClick={next}
          aria-label="Next pokemon"
          disabled={selected === pokemons[pokemons.length - 1].index}
        >
          <NavigateNext />
        </IconButton>
      </CenterWrapper>
      <Name>
        <Id>{`#${pokemon.id}`}</Id>
        {pokemon.name}
      </Name>
      <ScrollBox>
        <CenterWrapper>
          <PokemonMeasurement name="height" value={`${pokemon.height / 10}m`} />
          <VerticalDivider />
          {pokemon.types.map((t: any) => (
            <PokemonTypeBadge key={t.slot} name={t.type.name} />
          ))}
          <VerticalDivider />
          <PokemonMeasurement
            name="weight"
            value={`${pokemon.weight / 10}kg`}
          />
        </CenterWrapper>
        <PokemonStats stats={pokemon.stats} />
        <PokemonEvolution evolution={pokemon.evolution} />
      </ScrollBox>
    </Box>
  );
};

export default PokemonOverview;
