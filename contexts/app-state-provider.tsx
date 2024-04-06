import {
    Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type AppState = {
  sidebarToggle: boolean;
  setSidebarToggle: Dispatch<SetStateAction<boolean>>;
};

const AppState = createContext<AppState | null>(null);

export function AppStateProvider({ children }: PropsWithChildren) {
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);
  return (
    <AppState.Provider value={{ sidebarToggle, setSidebarToggle }}>
      {children}
    </AppState.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppState);
  if (!ctx)
    throw new Error("useAppState should be used inside AppStateProvider");
  return ctx;
}
