import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { TSession } from "@/auth/context";
import { getSession } from "@/auth/session";

type Context = {
  ip?: string | null;
  session?: TSession;
};

export const createContext = async (
  opts?: FetchCreateContextFnOptions,
): Promise<Context> => {
  const session = await getSession();
  const ip = opts?.req.headers.get("x-real-ip");
  return {
    ip,
    session,
  };
};
