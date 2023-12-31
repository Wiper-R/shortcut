import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const buttonVariant = cva(
  ["inline-flex items-center justify-center  font-medium"],
  {
    variants: {
      variant: {
        primary: ["text-white bg-black"],
        secondary: ["text-black bg-gray-300"],
      },
      size: {
        default: ["px-4 py-2 rounded  text-sm"],
        lg: ["px-5 py-3 rounded text-base"],
      },
    },

    defaultVariants: { variant: "primary", size: "default" },
  }
);

const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button"> & VariantProps<typeof buttonVariant>
>(({ className, variant, size, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className={cn(buttonVariant({ variant, size }), className)}
  />
));

Button.displayName = "Button";

export default Button;
