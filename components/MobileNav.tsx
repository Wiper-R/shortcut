"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileNav = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const toggleOpen = () => setOpen((prev) => !prev);
  const closeOnNew = (href: string) => {
    if (pathname !== href) {
      toggleOpen();
    }
  };
  return (
    <div className="sm:hidden">
      <Menu className="h-5 w-5 cursor-pointer" onClick={toggleOpen} />
      {isOpen ? (
        <div className="fixed inset-x-0 top-14 z-0 w-full animate-in fade-in-20 slide-in-from-top-5">
          <ul className="absolute grid w-full gap-4 border-b bg-primary px-10 pb-6 pt-10 overflow-auto">
            {/* TODO: Use dynamic paths, based on user authentication */}
            <li className="w-full">
              <Link
                href={"/sign-up"}
                className="w-full font-semibold text-green-600"
                onClick={() => closeOnNew("/sign-up")}
              >
                Get Started
              </Link>
            </li>
            <li className="my-3 h-px w-full bg-border" />
            <li className="w-full">
              <Link
                href={"/sign-in"}
                className="w-full font-semibold"
                onClick={() => closeOnNew("/sign-in")}
              >
                Sign in
              </Link>
            </li>
            <li className="my-3 h-px w-full bg-border" />
            <li className="w-full">
              <Link
                href={process.env.NEXT_PUBLIC_GITHUB_URL || ""}
                target="_blank"
                className="w-full font-semibold"
              >
                Github
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
