import { Logo } from "@/components/Logo";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Sidebar } from "@/components/sidebar";
import { UserDropdown } from "@/components/UserDropdown";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col">
      <div className="z-10 flex items-center justify-between bg-slate-50 p-4 shadow-sm">
        <Link href="/">
          <Logo />
        </Link>
        <UserDropdown />
      </div>
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-grow overflow-auto">
          <div className="mx-auto w-full max-w-4xl p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
