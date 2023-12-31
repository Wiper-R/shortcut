import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { PropsWithChildren } from "react";

type MaxWidthWrapperProps = {
  className?: ClassValue;
} & PropsWithChildren;

export default function MaxWidthWrapper({
  children,
  className,
}: MaxWidthWrapperProps) {
  return <div className={cn("max-w-7xl mx-auto px-10", className)}>{children}</div>;
}
