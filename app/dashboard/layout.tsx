"use client";

import { Logo } from "@/components/Logo";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Sidebar } from "@/components/sidebar";
import { UserDropdown } from "@/components/UserDropdown";
import { AppStateProvider } from "@/contexts/app-state-provider";
import { SidebarToggle } from "@/components/sidebar-toggle";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <AppStateProvider>
      <div className="flex h-screen flex-col">
        <div className="z-10 flex items-center justify-between bg-slate-50 p-4 shadow-sm">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex gap-4">
            <SidebarToggle/>
          <UserDropdown />
          </div>
        </div>
        <div className="flex flex-grow overflow-hidden isolate">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <div className="flex-grow overflow-auto">
            <div className="mx-auto w-full max-w-4xl p-4 md:p-8">{children}</div>
          </div>
        </div>
      </div>
    </AppStateProvider>
  );
}
