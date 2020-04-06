import React from 'react';
import styled from 'styled-components';

const MeasurementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 6rem;
`;
const MeasurementLabel = styled.label`
  color: #ababab;
  font-size: 1.2rem;
`;
const MeasurementValue = styled.div`
  font-size: 2rem;
`;
const PokemonMeasurement = ({ name, value }) => {
  return (
    <MeasurementWrapper>
      <MeasurementLabel>{name}</MeasurementLabel>
      <MeasurementValue>{value}</MeasurementValue>
    </MeasurementWrapper>
  );
};

export default PokemonMeasurement;
