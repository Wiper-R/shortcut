import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import buttonVariant from "./ui/button";
import MobileNav from "./MobileNav";
import { ArrowRight } from "lucide-react";
import { cs } from "@/lib";

const Navbar = async () => {
  return (
    <nav className="sticky inset-x-0 top-0 z-10 h-14 border-b bg-primary/60 text-secondary backdrop-blur-md">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between px-4">
          <Link href={"/"} className="text-xl font-bold sm:text-2xl" scroll={false}>
            link.zy
          </Link>
          <MobileNav />
          <ul className="hidden items-center gap-4 sm:flex">
            {/* TODO: Use dynamic paths, based on user authentication */}
            <li>
              <Link
                href={process.env.NEXT_PUBLIC_GITHUB_URL || ""}
                className={buttonVariant({ type: "ghost", size: "sm" })}
                target="_blank"
              >
                Github
              </Link>
            </li>
            <li>
              <Link
                href={"/sign-in"}
                className={buttonVariant({ type: "ghost", size: "sm" })}
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link
                href={"/sign-up"}
                className={cs(buttonVariant({ size: "sm", type: "primary" }))}
              >
                <span>Get Started</span>
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </li>
          </ul>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
