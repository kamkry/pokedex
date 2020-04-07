import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import PokemonOverview from 'components/PokemonOverview';
import { PokemonProvider } from 'contexts/PokemonContext';
import pokedexLogo from 'assets/pokedex.png';
import PokemonList from 'components/PokemonList';
import { SelectedPokemonProvider } from 'contexts/SelectedPokemonContext';
import { lightTheme } from 'theme';
import { StylesProvider } from '@material-ui/core';
import { ShowOverviewProvider } from 'contexts/ShowOverviewContext';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after{
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.backgroundAccent};
    font-family: Roboto, sans-serif;
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const Center = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainContainer = styled.main`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 150px 100px 150px 150px 100px 150px;
  grid-template-rows: 50px 50px 550px 50px;

  @media (max-width: 960px) {
    grid-template-columns: 90vw;
    grid-template-rows: 150px 50px 550px 20px;
    grid-gap: 10px;
  }

  @media (max-width: 500px) {
    grid-template-rows: 60px 50px 70vmax 0;
  }

  @media (max-width: 350px) {
    grid-template-columns: 100vw;
  }
`;

const Logo = styled.div`
  grid-area: 1/3/3/5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 960px) {
    grid-area: 1/1/3/1;
  }
  @media (max-width: 500px) {
    align-items: flex-end;
  }
`;

const LogoImg = styled.img`
  transform: scale(0.5);
  @media (max-width: 500px) {
    transform: scale(0.3);
  }
`;

const Footer = styled.footer`
  color: ${({ theme }) => theme.textAccent};
  grid-area: 4/1/4/3;

  @media (max-width: 960px) {
    grid-area: 4/1/4/1;
  }

  @media (max-width: 350px) {
    display: none;
  }
`;

const App: React.FC = () => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <Center>
          <MainContainer>
            <Logo>
              <LogoImg src={pokedexLogo} alt="Logo" />
            </Logo>
            <PokemonProvider>
              <SelectedPokemonProvider>
                <ShowOverviewProvider>
                  <PokemonList />
                  <PokemonOverview />
                </ShowOverviewProvider>
              </SelectedPokemonProvider>
            </PokemonProvider>
            <Footer>By Kamil Krysiak</Footer>
          </MainContainer>
        </Center>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
