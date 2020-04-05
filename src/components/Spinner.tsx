import React from 'react';
import styled, { keyframes } from 'styled-components';
import pokeball from 'assets/pokeball.png';

const Spinning = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  display: flex;
  height: 39%;
  align-items: center;
  justify-content: center;
  animation: ${Spinning} 1s linear infinite;
`;

const SpinnerImg = styled.img`
  transform: scale(0.3);
`;
const Spinner = () => {
  return (
    <SpinnerWrapper>
      <SpinnerImg src={pokeball} alt="loading" />
    </SpinnerWrapper>
  );
};

export default Spinner;
