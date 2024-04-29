"use client";

import axios from "axios";
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
    if (session.state != "loading") return;
    // FIXME: Fix this any type
    async function populateUser() {
      try{
        const res = await axios.get<{ user: ReturnType<typeof cleanUser> }>(
          "/api/auth/user",
          {},
        );
        dispatch({ type: "login_success", payload: res.data });
      }
      catch (e){
        dispatch({ type: "login_failed" });
      }
    }

    populateUser();
  }, [session.state]);

  return (
    <SessionContext.Provider value={{ session, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider, SessionContext, type TSession };
