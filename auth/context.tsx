"use client";

import { trpc } from "@/app/_trpc/client";
import {
  PropsWithChildren,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";

type Session = {
  user: any | null;
};

type SessionStateKind = "loading" | "authenticated" | "unauthenticated";

type TSession = Session | undefined | null;

type SessionContext = {
  session: SessionState;
  dispatch: React.Dispatch<SessionAction>;
};

type SessionState = {
  data?: Session | undefined | null;
  state: SessionStateKind;
};

const initialState: SessionState = {
  state: "loading",
};

export type SessionAction =
  | { type: "logout" | "login_failed" }
  | { type: "login_success"; payload: any };

const sessionReducer = (
  _state: SessionState,
  action: SessionAction,
): SessionState => {
  switch (action.type) {
    case "login_success":
      return {
        data: { user: action.payload },
        state: "authenticated",
      };

    case "login_failed":
    case "logout":
      return {
        data: { user: null },
        state: "unauthenticated",
      };
  }
};

const SessionContext = createContext<SessionContext | null>(null);

const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, dispatch] = useReducer(sessionReducer, initialState);

  const { data, isFetched } = trpc.auth.user.useQuery(
    undefined,
    {
      retry: 0,
    },
  );

  useEffect(() => {
    if (!isFetched) return;
    if (data) {
      dispatch({ type: "login_success", payload: data });
    } else {
      dispatch({ type: "login_failed" });
    }
  }, [isFetched, data]);

  return (
    <SessionContext.Provider value={{ session, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider, SessionContext, type TSession };
