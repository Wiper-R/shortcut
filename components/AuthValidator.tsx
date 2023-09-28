"use client";
import useAuthContext from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";

type AuthValidatorProps = {
  children?: React.ReactNode;
  redirectAuthenticated?: string;
  redirectNotAuthenticated?: string;
};

const AuthValidator = ({
  children,
  redirectAuthenticated,
  redirectNotAuthenticated,
  ...props
}: AuthValidatorProps) => {
  const { state } = useAuthContext();
  const router = useRouter();

  if (
    (!redirectAuthenticated && !redirectNotAuthenticated) ||
    !state.isPopulated
  )
    return children;

  if (!state.user && redirectNotAuthenticated) {
    router.replace(redirectNotAuthenticated);
  }

  if (state.user && redirectAuthenticated) {
    router.replace(redirectAuthenticated);
  }

  return children;
};


export default AuthValidator;