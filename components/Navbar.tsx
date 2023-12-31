import Link from "next/link";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";

import Shortcut from "@/public/shortcut.png";
import Button from "./ui/Button";

type NavLinkProps = {
  label: string;
  href: string;
};

function NavLink({ label, href }: NavLinkProps) {
  return (
    <Link href={href} className="font-semibold text-sm">
      {label}
    </Link>
  );
}

function Navbar() {
  return (
    <MaxWidthWrapper className="mt-10">
      <header className="flex py-5 px-8 shadow-md rounded-xl items-center justify-center border bg-white/80 backdrop-blur-md">
        <Image src={Shortcut.src} width={24} height={24} alt="Shortcut Logo" />
        <nav className="flex gap-10 ml-auto items-center">
          <NavLink label="Home" href="/" />
          <NavLink label="Docs" href="/docs" />
          <NavLink label="Github" href="/github" />
          <Button>Login</Button>
        </nav>
      </header>
    </MaxWidthWrapper>
  );
}

export default Navbar;
