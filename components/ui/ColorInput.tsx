import { cs } from "@/lib";
import { ComponentProps, forwardRef } from "react";

type Props = Omit<ComponentProps<"input">, "type">;

const ColorInput = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => (
    <div className="relative h-auto w-16 overflow-hidden  border">
      <input
        ref={ref}
        className={cs(
          "absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden",
          className,
        )}
        type="color"
        {...props}
      />
    </div>
  ),
);

export default ColorInput;
