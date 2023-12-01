import { cs } from "@/lib";
import { HTMLAttributes, forwardRef } from "react";

type FooterProps = Omit<HTMLAttributes<HTMLElement>, "children">;

const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <footer
        className={cs(
          "flex h-16 items-center justify-center border-t py-4 text-center text-secondary font-medium",
          className,
        )}
        ref={ref}
        {...props}
      >
        Made with ❤️ By Wiper-R
      </footer>
    );
  },
);

Footer.displayName = "Footer";

export default Footer;
