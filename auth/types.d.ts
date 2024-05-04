import { User } from "@prisma/client";

export type AuthUser = Omit<User, "password">;
export type Session = {
  user: AuthUser;
};
export type ServerSession = Session | null;
export type ClientSession = Session | null | undefined;
export type SessionStateKind = "loading" | "authenticated" | "unauthenticated";
