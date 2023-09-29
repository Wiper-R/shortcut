"use client";

import Alert from "@/components/Shared/Alert";
import AlertContainer from "@/components/Shared/AlertContainer";
import { v4 } from "uuid";

import {
  createContext,
  useState,
} from "react";

export const AlertContext = createContext<AlertContext | null>(null);

export type AlertKind = "success" | "error";

export type AlertProps = {
  message: string;
  type: AlertKind;
};

export type AlertState = {
  id: string;
} & AlertProps;


export type AddAlert = (alert: AlertProps) => void;


type AlertContext = {
  addAlert: AddAlert;
  removeAlert: (alertId: string) => void;
};

type AlertContextProviderProps = {
  children?: React.ReactNode;
};

const AlertContextProvider = ({ children }: AlertContextProviderProps) => {
  const [alerts, setAlerts] = useState<AlertState[]>([]);

  console.log("Alert Context: ", alerts);

  const addAlert = (alert: AlertProps) => {
    setAlerts(state => [...state, { ...alert, id: v4() }])
  }

  const removeAlert = (alertId: string) => {
    setAlerts(state => state.filter(v => v.id != alertId))
  }

  return (
    <AlertContext.Provider
      value={{ addAlert, removeAlert }}
    >
      {children}
      <AlertContainer>
        {alerts.map(alert => <Alert {...alert} key={alert.id} />)}
      </AlertContainer>
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
