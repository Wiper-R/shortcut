"use client";
import useAuthContext from "@/hooks/useAuthContext";
import { redirect } from "next/navigation";

type AuthGuardProps = {
  children?: React.ReactNode;
} & (
  | { redirectAuthenticated: string; redirectNotAuthenticated?: never }
  | { redirectNotAuthenticated: string; redirectAuthenticated?: never }
);

const AuthGuard = ({
  children,
  redirectAuthenticated,
  redirectNotAuthenticated,
}: AuthGuardProps) => {
  const { state } = useAuthContext();

  if (!state.isPopulated) return children;

  if (!state.user && redirectNotAuthenticated) {
    redirect(redirectNotAuthenticated);
  }

  if (state.user && redirectAuthenticated) {
    redirect(redirectAuthenticated);
  }

  return children;
};

export default AuthGuard;
