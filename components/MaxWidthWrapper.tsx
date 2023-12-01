import { cs } from "@/lib";
import { ClassValue } from "clsx";

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) => {
  return (
    <div className={cs("mx-auto w-full max-w-screen-xl px-2.5", className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
