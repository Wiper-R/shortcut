"use client";

import { createContext, useReducer, Dispatch, useEffect } from "react";

export const AuthContext = createContext<AuthContext | null>(null);

type AuthActionKind = "LOGOUT" | "LOGIN_FAILED" | "LOGIN_SUCCESS";

export type AuthState = {
  isPopulated: boolean;
  user: string | null;
};

type AuthContext = {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
};

export type AuthAction = {
  type: AuthActionKind;
  payload: any;
};

export type AuthStateAction = React.Dispatch<React.SetStateAction<AuthState>>;

type AuthProviderProps = {
  children?: React.ReactNode;
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isPopulated: true,
      };

    case "LOGIN_FAILED":
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isPopulated: true,
      };

    default:
      return state;
  }
};

const AuthContextProvider = (props: AuthProviderProps) => {
  const initialState: AuthState = {
    user: null,
    isPopulated: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log("Authorization State: ", state);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/auth/user");
      if (res.ok) {
        dispatch({ type: "LOGIN_SUCCESS", payload: await res.json() });
      } else {
        dispatch({ type: "LOGIN_FAILED", payload: null });
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
