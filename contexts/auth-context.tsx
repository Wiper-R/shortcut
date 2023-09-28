"use client";

import { createContext, useState, useContext } from "react";

const AuthContext = createContext<AuthContext | null>(null);

type AuthState = {
  isLoggedIn: boolean;
  isPopulated: boolean;
  user: string | null;
};

type AuthContext = {
  state: AuthState;
  setState: React.Dispatch<React.SetStateAction<AuthState>>;
};

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = (props: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoggedIn: false,
    isPopulated: false,
  });
  return (
    <AuthContext.Provider value={{ state, setState }}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider.");
  }
  return context;
};

export { AuthProvider, useAuthContext };
