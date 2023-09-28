import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Link as PrismaLink } from "@prisma/client";

const EditLinkContext = createContext<EditLinkContext | null>(null);

export type EditLinkState = {
  currentLink: PrismaLink | null;
  isEditing: boolean;
};

type EditLinkContext = {
  state: EditLinkState;
  setState: Dispatch<SetStateAction<EditLinkState>>;
};

type EditLinkContextProps = {
  children?: React.ReactNode;
};

const EditLinkContextProvider = ({ children }: EditLinkContextProps) => {
  const [state, setState] = useState<EditLinkState>({
    currentLink: null,
    isEditing: false,
  });

  return (
    <EditLinkContext.Provider value={{ state, setState }}>
      {children}
    </EditLinkContext.Provider>
  );
};

export default EditLinkContextProvider;
