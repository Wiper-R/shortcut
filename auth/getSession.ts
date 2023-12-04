"use client";

import { useContext } from "react";
import { SessionContext } from "./context";

const useSession = () => {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error("useSession should be used in children of SessionProvider");

  return context;
};

export default useSession;
