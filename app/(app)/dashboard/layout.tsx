"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Sidebar from "@/components/layouts/Sidebar";
import { cs } from "@/lib";
import { MenuIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";

export default function DashboardRoot({ children }: PropsWithChildren) {
  const [toggled, setToggled] = useState(false);
  return (
    <MaxWidthWrapper className="relative isolate flex w-screen max-w-screen-2xl overflow-auto p-0 h-screen-svh">
      <Sidebar toggled={toggled} setToggled={setToggled} />
      <div className="relative flex flex-grow flex-col overflow-auto">
        <div className="sticky left-0 top-0 z-10 flex items-center justify-between bg-primary px-4 py-5 lg:justify-end">
          <div className="flex items-center gap-x-5 text-2xl font-semibold lg:hidden">
            <button onClick={() => setToggled((v) => !v)}>
              <MenuIcon />
            </button>
            <Link href={"/dashboard/links"} scroll={false}>
              link.zy
            </Link>
          </div>
          <nav className="flex justify-end">
            <UserIcon className="w-fit" />
          </nav>
        </div>
        <div
          className={cs("flex-grow bg-primary", toggled && "max-lg:blur-sm")}
        >
          {children}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
