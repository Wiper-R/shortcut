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
  return (
    <div className={cn("mx-auto max-w-7xl px-4 md:px-10", className)}>{children}</div>
  );
}
