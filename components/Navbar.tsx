"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useId, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import { MenuIcon, XIcon } from "lucide-react";

import Shortcut from "@/public/shortcut.png";
import Button from "./ui/Button";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  label: string;
  href: string;
};

function NavLink({ label, href }: NavLinkProps) {
  return (
    <Link href={href} className="text-sm font-semibold">
      {label}
    </Link>
  );
}

function Navbar() {
  const [navToggle, setNavToggle] = useState(false);

  const ToggleIcon = () => {
    const Icon = navToggle ? XIcon : MenuIcon;
    return <Icon className="h-5 w-5" />;
  };

  return (
    <MaxWidthWrapper className="mt-4">
      <header className="relative">
        <div
          className={cn(
            "flex items-center justify-between rounded-lg bg-white p-4 shadow-md",
            navToggle && "rounded-b-none",
          )}
        >
          <Image
            src={Shortcut.src}
            width={32}
            height={32}
            alt="Shortcut Logo"
            className="w-6"
          />
          {/* Medium Above screen navbar */}
          <nav
            className={cn(
              "flex items-center gap-10 rounded-b-lg max-md:hidden",
            )}
          >
            <NavLink label="Home" href="/" />
            <NavLink label="Docs" href="/docs" />
            <NavLink label="Github" href="/github" />
            <Button>Login</Button>
          </nav>
          <Button
            onClick={() => setNavToggle((p) => !p)}
            className="ml-auto md:hidden"
            variant="secondary"
            size="icon"
          >
            <ToggleIcon />
          </Button>
        </div>

        {/* Small screen navbar */}
        {/* FIXME: Nav links should take full width*/}
        <nav
          className={cn(
            "absolute flex w-full flex-col items-center gap-10 rounded-b-lg bg-white p-4 shadow-md md:hidden",
            !navToggle && "hidden",
            navToggle && "animate-in-from-top",
          )}
        >
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
