import { AlertContext } from "@/contexts/alert-context";
import { useContext } from "react";

const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error(
      "useAlertContext should be used inside AlertContextProvider"
    );

  return context;
};

export default useAlertContext;
