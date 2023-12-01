import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export default function cs(...values: ClassValue[]) {
  return twMerge(clsx(values));
}
