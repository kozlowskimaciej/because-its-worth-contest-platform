import React, { createContext, useContext, useRef } from "react";

interface AppContextProps {
  children: React.ReactNode;
}

interface AppContextValue {
  tokenRef: React.MutableRefObject<string | null>;
}

const AppContext = createContext<AppContextValue>({} as AppContextValue);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: AppContextProps) => {
  const tokenRef = useRef<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        tokenRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
