import React, { createContext, useState } from 'react';

export const SelectedPokemonContext = createContext(null);

export const SelectedPokemonProvider: React.FC = ({ children }) => {
  const [selected, setSelected] = useState(null);

  return (
    <SelectedPokemonContext.Provider value={[selected, setSelected]}>
      {children}
    </SelectedPokemonContext.Provider>
  );
};
