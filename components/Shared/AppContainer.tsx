import { Providers } from "@/redux/provider";
import AlertHandler from "./AlertHandler";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <AlertHandler />
      <main className="max-w-screen-2xl mx-auto min-h-screen h-full">
        {children}
      </main>
    </Providers>
  );
};

export default AppContainer;
