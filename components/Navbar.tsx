"use client";

import Link from "next/link";
import React, { useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { MenuIcon, XIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ThemeSwitch } from "./theme-switch";

function NavItems({ setNavToggle }: { setNavToggle: (v: boolean) => void }) {
  return (
    <>
      <ThemeSwitch />
      <Link href="/docs" className={buttonVariants({ variant: "link" })}>
        Docs
      </Link>
      <Link href={process.env.NEXT_PUBLIC_GITHUB_URL!} className={buttonVariants({ variant: "link" })}>
        Github
      </Link>
      <Link
        href="/login"
        className={buttonVariants({})}
        onClick={() => setNavToggle(false)}
      >
        Login
      </Link>
    </>
  );
}

function Navbar() {
  const [navToggle, setNavToggle] = useState(false);

  const ToggleIcon = () => {
    const Icon = navToggle ? XIcon : MenuIcon;
    return <Icon className="h-5 w-5" />;
  };

  return (
    <MaxWidthWrapper className={cn("mt-4 w-full")}>
      <header className="relative">
        <div
          className={cn(
            "flex items-center justify-between rounded-lg border bg-background p-4",
            navToggle && "rounded-b-none",
          )}
        >
          <Link href="/">
            <Logo />
          </Link>
          {/* Medium Above screen navbar */}
          <nav
            className={cn("flex items-center gap-6 rounded-b-lg max-md:hidden")}
          >
            <NavItems setNavToggle={setNavToggle} />
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
            "absolute z-10 flex w-full flex-col items-center gap-10 rounded-b-lg bg-background p-4 shadow-sm md:hidden",
            !navToggle && "hidden",
            navToggle && "animate-in-from-top",
          )}
        >
          <NavItems setNavToggle={setNavToggle} />
        </nav>
      </header>
    </MaxWidthWrapper>
  );
}

export default Navbar;
