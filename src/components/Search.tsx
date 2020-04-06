import React from 'react';
import styled from 'styled-components';
import { Search as SearchIcon } from '@material-ui/icons';

const Bar = styled.div`
  grid-area: 2/1/2/3;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const Input = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  padding: 2rem 4.4rem;
  font-size: 1.6rem;
  color: gray;
`;

const StyledIcon = styled(SearchIcon)`
  position: absolute;
  margin-left: 1rem;
  transform: scale(1);
  color: darkgrey;
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
        placeholder="Find a Pokémon..."
        value={value}
        onChange={onChange}
      />
    </Bar>
  );
};

export default Search;
