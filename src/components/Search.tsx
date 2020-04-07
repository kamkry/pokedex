import React from 'react';
import styled from 'styled-components';
import { Search as SearchIcon } from '@material-ui/icons';

const Bar = styled.div`
  grid-area: 2/1/2/3;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 960px) {
    grid-area: 2/1/2/1;
  }
`;
const Input = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  padding: 2rem 4.4rem;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.textAccent};
  background-color: ${({theme}) => theme.background};
`;

const StyledIcon = styled(SearchIcon)`
  position: absolute;
  margin-left: 1rem;
  transform: scale(1);
  color: ${({ theme }) => theme.textAccent};
`;

interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <Bar>
      <StyledIcon />
      <Input
        aria-label="Find a pokemon"
        placeholder="Find a Pokémon..."
        value={value}
        onChange={onChange}
      />
    </Bar>
  );
};

export default Search;
