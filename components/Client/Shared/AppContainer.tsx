import { Providers } from "@/redux/provider";
import AlertHandler from "./AlertHandler";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <AlertHandler />
      {children}
    </Providers>
  );
};

export default AppContainer;
