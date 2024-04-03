import ShortCutLogo from "@/assets/shortcut-logo.svg";
import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { ComponentProps } from "react";

export function Logo({
  className,
  ...props
}: Omit<ImageProps, "src" | "alt" | "height" | "width">) {
  return (
    <Image
      src={ShortCutLogo.src}
      className={cn("w-8", className)}
      width={64}
      height={64}
      alt="Logo"
      {...props}
    />
  );
}
