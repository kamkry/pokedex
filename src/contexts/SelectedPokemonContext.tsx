import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

type SelectedPokemonContextValue = [number, Dispatch<SetStateAction<number>>];

export const SelectedPokemonContext = createContext<
  SelectedPokemonContextValue
>({} as SelectedPokemonContextValue);

export const SelectedPokemonProvider: React.FC = ({ children }) => {
  const [selected, setSelected] = useState(0);

  return (
    <SelectedPokemonContext.Provider value={[selected, setSelected]}>
      {children}
    </SelectedPokemonContext.Provider>
  );
};
