import React from 'react';
import styled, { keyframes } from 'styled-components';
import pokeball from 'assets/pokeball.png';

const Appear = keyframes`
0% { opacity: 0}
100% { opacity: 1}
`;

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
  opacity: 0;
  animation: ${Spinning} 1s linear infinite, ${Appear} 0.5s linear forwards;
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
