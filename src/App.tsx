import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import PokemonOverview from 'components/PokemonOverview';
import { PokemonProvider } from 'contexts/PokemonContext';
import pokedexLogo from 'assets/pokedex.png';
import PokemonList from 'components/PokemonList';
import { SelectedPokemonProvider } from 'contexts/SelectedPokemonContext';

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
    background-color: #f5f5f5;
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
  grid-template-columns: 100px 150px 150px 150px 150px 100px;
  grid-template-rows: 50px 50px 550px 100px;
`;

const Logo = styled.div`
  grid-area: 1/3/3/5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  transform: scale(0.5);
`;

const Footer = styled.footer`
  color: darkgrey;
  grid-area: 4/1/4/3;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Center>
        <MainContainer>
          <Logo>
            <LogoImg src={pokedexLogo} alt="Logo" />
          </Logo>
          <PokemonProvider>
            <SelectedPokemonProvider>
              <PokemonList />
              <PokemonOverview />
            </SelectedPokemonProvider>
          </PokemonProvider>
          <Footer>By Kamil Krysiak</Footer>
        </MainContainer>
      </Center>
    </>
  );
};

export default App;
