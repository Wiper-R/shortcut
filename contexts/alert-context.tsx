"use client";

import Alert from "@/components/Shared/Alert";
import AlertContainer from "@/components/Shared/AlertContainer";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export const AlertContext = createContext<AlertContext | null>(null);

export type AlertKind = "success" | "error";

export type AlertState = {
  message: string;
  type: AlertKind;
};

type AlertContext = {
  alert: AlertState;
  setAlert: Dispatch<SetStateAction<AlertState>>;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
};

type AlertContextProviderProps = {
  children?: React.ReactNode;
};

const AlertContextProvider = ({ children }: AlertContextProviderProps) => {
  const [state, setState] = useState<AlertState>({
    message: "",
    type: "success",
  });
  const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timeout>();
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertKey, setAlertKey] = useState<number>(0);

  console.log("Alert Context: ", state);

  useEffect(() => {
    if (!state.message) return;
    clearTimeout(timeoutRef);
    setTimeoutRef(
      setTimeout(() => {
        setAlertMessage("");
        setShowAlert(false);
      }, 3000)
    );
    setShowAlert(true);
    setAlertMessage(state.message);
    setAlertKey((key) => key + 1);
    setState((state) => ({ ...state, message: "" }));
  }, [state.message]);

  return (
    <AlertContext.Provider
      value={{ alert: state, setAlert: setState, setShowAlert }}
    >
      {children}
      <AlertContainer>
        {showAlert && (
          <Alert message={alertMessage} type={state.type} key={alertKey} />
        )}
      </AlertContainer>
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
