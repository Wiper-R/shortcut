import { cs } from "@/lib";
import { cva } from "class-variance-authority";

const _inputVariants = cva(
  [
    "text-secondary border w-full py-2 rounded px-3 outline-none shadow-inner outline-offset-0 focus:outline-ascent focus:border-transparent focus:outline-2  aria-[invalid=true]:outline-rose-600 disabled:bg-secondary-lighter/80",
    "bg-white",
  ],
  {
    variants: {
      type: {
        default: [],
      },
    },
    defaultVariants: { type: "default" },
  },
);

const inputVariants = (variants: Parameters<typeof _inputVariants>[0]) =>
  cs(_inputVariants(variants));

export default inputVariants;
