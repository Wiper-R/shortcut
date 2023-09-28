"use client";

import useAlertContext from "@/hooks/useAlertContext";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { RxCross2 } from "react-icons/rx";

export const AlertContext = createContext<AlertContext | null>(null);

type AlertKind = "success" | "error";

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

const Alert = ({ message, type }: AlertState) => {
  const { setShowAlert } = useAlertContext();
  const _type = type == "success" ? "success" : "error";
  const classes = {
    success: {
      element: "bg-emerald-200 text-emerald-900",
      progress: "bg-emerald-500",
    },

    error: {
      element: "bg-rose-200 text-rose-900",
      progress: "bg-rose-500",
    },
  };
  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 rounded-md z-50 top-20 alert ${classes[_type].element}`}
    >
      <div className="flex p-2">
        <span className="block p-2 text-base">{message}</span>
        <button
          className="self-start text-sm"
          onClick={() => setShowAlert(false)}
        >
          <RxCross2 />
        </button>
      </div>
      <span
        className={`block h-0.5 alert-progress ${classes[_type].progress}`}
      ></span>
    </div>
  );
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
      {showAlert && (
        <Alert message={alertMessage} type={state.type} key={alertKey} />
      )}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
