import React, { createContext, useContext, useEffect, useRef } from "react";
import useFetch from "../hooks/useFetch";

interface AppContextProps {
  children: React.ReactNode;
}

interface AppContextValue {
  tokenRef: React.MutableRefObject<string | null>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextValue>({} as AppContextValue);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: AppContextProps) => {
  const tokenRef = useRef<string | null>(null);

  const { data, isLoading } = useFetch<any>(
    `${process.env.REACT_APP_SERVER_URL}/auth/init`
  );

  useEffect(() => {
    if (!data) return;
    tokenRef.current = data.token;
  }, [data]);

  return (
    <AppContext.Provider
      value={{
        tokenRef,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
