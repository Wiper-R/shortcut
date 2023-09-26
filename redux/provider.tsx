"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import { loadUser } from "@/redux/reducers/auth-reducer";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
