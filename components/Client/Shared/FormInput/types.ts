import { HTMLInputTypeAttribute } from "react";

export type InputProps = {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  id: string;
  name: string;
};
