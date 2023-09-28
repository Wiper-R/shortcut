import { EditLinkContext } from "@/contexts/edit-link-context";
import { useContext } from "react";

const useEditLinkContext = () => {
  const context = useContext(EditLinkContext);
  if (!context) {
    throw new Error(
      "useEditLinkContext should be used inside EditLinkContextProvider"
    );
  }

  return context;
};

export default useEditLinkContext;
