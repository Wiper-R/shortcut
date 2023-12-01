import { cs } from "@/lib";
import { cva } from "class-variance-authority";

const _buttonVariants = cva(
  [
    "inline-flex items-center justify-center text-secondary rounded-md transition-all duration-150 ease-in-out font-semibold gap-x-2 cursor-pointer",
  ],
  {
    variants: {
      type: {
        primary: ["bg-secondary text-primary disabled:bg-secondary/75"],
        secondary: ["bg-secondary-lighter hover:bg-secondary-lighter-hover"],
        outline: ["border border-white hover:bg-secondary-light"],
        ghost: ["hover:bg-secondary-lighter"], // No Styles
      },

      size: {
        sm: ["p-3 py-2 text-sm"],
        md: ["px-4 py-2 text-base"],
        lg: ["px-5 py-3 text-lg"],
        xl: ["px-7 py-4 text-xl"],
      },
    },

    defaultVariants: { size: "md", type: "primary" },
  },
);

const buttonVariants = (variants: Parameters<typeof _buttonVariants>[0]) =>
  cs(_buttonVariants(variants));

export default buttonVariants;
