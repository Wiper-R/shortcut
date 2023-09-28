import AuthContextProvider from "@/contexts/auth-context";
import AlertContextProvider from "@/contexts/alert-context";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContextProvider>
      <AlertContextProvider>
        <main className="max-w-screen-2xl mx-auto min-h-screen h-full">
          {children}
        </main>
      </AlertContextProvider>
    </AuthContextProvider>
  );
};

export default AppContainer;
