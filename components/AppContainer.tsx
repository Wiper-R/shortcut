import useAuthContext from "@/hooks/useAuthContext";
import AlertHandler from "./Shared/AlertHandler";
import { useEffect } from "react";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AlertHandler />
      <main className="max-w-screen-2xl mx-auto min-h-screen h-full">
        {children}
      </main>
    </>
  );
};

export default AppContainer;
