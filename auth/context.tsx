"use client";

import { fetchApi } from "@/lib/api-helpers";
import { cleanUser } from "@/lib/utils";
import { PropsWithChildren, createContext, useEffect, useReducer } from "react";

type Session = {
  user: ReturnType<typeof cleanUser>;
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
        data: null,
        state: "unauthenticated",
      };
  }
};

const SessionContext = createContext<SessionContext | null>(null);

const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, dispatch] = useReducer(sessionReducer, initialState);

  useEffect(() => {
    async function populateUser() {
      const res = await fetchApi<{ user: ReturnType<typeof cleanUser> }>(
        "/api/users/@me",
        {},
      );

      // FIXME: Fix this any type
      // TODO: Use axios
      if (res.code == "success") {
        dispatch({ type: "login_success", payload: res.data.user });
      } else {
        dispatch({ type: "login_failed" });
      }
    }

    populateUser();
  }, []);

  return (
    <SessionContext.Provider value={{ session, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider, SessionContext, type TSession };
