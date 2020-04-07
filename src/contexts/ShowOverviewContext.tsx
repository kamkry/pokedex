import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

type ShowOverviewContextValue = [boolean, Dispatch<SetStateAction<boolean>>];

export const ShowOverviewContext = createContext<ShowOverviewContextValue>(
  {} as ShowOverviewContextValue
);

export const ShowOverviewProvider: React.FC = ({ children }) => {
  const [show, setShow] = useState(true);

  return (
    <ShowOverviewContext.Provider value={[show, setShow]}>
      {children}
    </ShowOverviewContext.Provider>
  );
};
