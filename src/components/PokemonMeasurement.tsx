import React from 'react';
import styled from 'styled-components';

const MeasurementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 6rem;
`;
const MeasurementLabel = styled.label`
  color: ${({ theme }) => theme.textAccent};
  font-size: 1.2rem;
`;
const MeasurementValue = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 2rem;
`;

interface PokemonMeasurementProps {
  name: string;
  value: string;
}

const PokemonMeasurement: React.FC<PokemonMeasurementProps> = ({
  name,
  value,
}) => {
  return (
    <MeasurementWrapper>
      <MeasurementLabel>{name}</MeasurementLabel>
      <MeasurementValue>{value}</MeasurementValue>
    </MeasurementWrapper>
  );
};

export default PokemonMeasurement;
