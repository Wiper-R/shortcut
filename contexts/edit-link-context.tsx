"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Link as PrismaLink } from "@prisma/client";

export const EditLinkContext = createContext<EditLinkContext | null>(null);

export type EditLinkState = {
  link: PrismaLink | null;
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
    link: null,
    isEditing: false,
  });

  console.log("Edit Link State:", state);

  return (
    <EditLinkContext.Provider value={{ state, setState }}>
      {children}
    </EditLinkContext.Provider>
  );
};

export default EditLinkContextProvider;
