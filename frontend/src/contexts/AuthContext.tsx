import React, { createContext, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthContextValue {}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const navigate = useNavigate();

  const refreshTokenIntervalRef = useRef<any | null>(null);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        console.log("Trying to refresh the token...");

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/auth/refresh`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (response.status !== 200) {
          navigate("/login");
          return;
        }

        const data = await response.json();
        console.log("Token refreshed successfully.");
      } catch (error) {
        navigate("/login");
        console.error("Error refreshing token:", error);
      }
    };

    refreshToken();

    refreshTokenIntervalRef.current = setInterval(refreshToken, 3 * 60 * 1000);

    return () => {
      if (refreshTokenIntervalRef.current !== null) {
        clearInterval(refreshTokenIntervalRef.current);
      }
    };
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
