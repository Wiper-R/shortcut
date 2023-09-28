import useAuthContext from "@/hooks/useAuthContext";
import AlertHandler from "./Shared/AlertHandler";
import { useEffect } from "react";
import AuthContextProvider from "@/contexts/auth-context";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContextProvider>
      <AlertHandler />
      <main className="max-w-screen-2xl mx-auto min-h-screen h-full">
        {children}
      </main>
    </AuthContextProvider>
  );
};

export default AppContainer;
