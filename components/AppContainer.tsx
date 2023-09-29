import { AlertState } from "@/contexts/alert-context";
import AuthContextProvider from "@/contexts/auth-context";
// import Alert from "./Shared/Alert";
import AlertContextProvider from "@/contexts/alert-context";



const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContextProvider>
    <main className="max-w-screen-2xl mx-auto min-h-screen h-full relative">
      <AlertContextProvider>
        {children}
      </AlertContextProvider>
    </main>
    </AuthContextProvider>
  );
};

export default AppContainer;
