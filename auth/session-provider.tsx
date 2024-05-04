"use client";

import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useReducer,
} from "react";
import type { AuthUser } from "./types";
import client from "@/lib/api-client";
import axios from "axios";

type ReducerState =
  | {
      state: "loading";
      session: undefined;
    }
  | { state: "unauthenticated"; session: null }
  | { state: "authenticated"; session: { user: AuthUser } };

type ReducerAction =
  | { type: "login_success"; payload: AuthUser }
  | { type: "logout" }
  | { type: "login_failed" };

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case "login_success":
      return {
        ...state,
        state: "authenticated",
        session: { user: action.payload },
      };
    case "login_failed":
    case "logout":
      return { ...state, state: "unauthenticated", session: null };
  }
}

type SessionContext = {
  dispatch: React.Dispatch<ReducerAction>;
} & ReducerState;

const SessionContext = createContext<SessionContext | null>(null);

export default function SessionProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, {
    state: "loading",
    session: undefined,
  });

  useEffect(() => {
    const controller = new AbortController();
    client
      .get("/auth/user", { signal: controller.signal })
      .then((response) =>
        dispatch({ type: "login_success", payload: response.data }),
      )
      .catch((e) => {
        if (!axios.isCancel(e)) dispatch({ type: "login_failed" });
      });

    return () => controller.abort();
  }, []);
  return (
    <SessionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
}

export { SessionContext };
