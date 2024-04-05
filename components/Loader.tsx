import { cn } from "@/lib/utils";
import { Loader2, LucideProps } from "lucide-react";

type LoaderProps = {} & LucideProps;

export function Loader({ className, ...props }: LoaderProps) {
  return (
    <Loader2
      className={cn("mx-auto h-8 w-8 animate-spin", className)}
      {...props}
    />
  );
}
