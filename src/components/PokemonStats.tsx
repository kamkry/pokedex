import React from 'react';
import styled from 'styled-components';

const Stats = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  row-gap: 1.5rem;
  column-gap: 3rem;

  & > * {
    text-align: right;
  }
`;

const Title = styled.h4``;

const Stat = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Label = styled.label`
  color: darkgrey;
  margin-right: 1rem;
  font-size: 1.4rem;
`;
const Value = styled.span`
  font-size: 2rem;
`;

const PokemonStats = ({ stats }) => {
  return (
    <Stats>
      <Stat>
        <Label>HP</Label>
        <Value>{stats[5].base_stat}</Value>
      </Stat>
      <Stat>
        <Label>Attack</Label>
        <Value>{stats[2].base_stat}</Value>
      </Stat>
      <Stat>
        <Label>Defense</Label>
        <Value>{stats[4].base_stat}</Value>
      </Stat>
      <Stat>
        <Label>Sp. Att</Label>
        <Value>{stats[1].base_stat}</Value>
      </Stat>
      <Stat>
        <Label>Sp. Def</Label>
        <Value>{stats[3].base_stat}</Value>
      </Stat>
      <Stat>
        <Label>Speed</Label>
        <Value>{stats[0].base_stat}</Value>
      </Stat>
    </Stats>
  );
};

export default PokemonStats;
