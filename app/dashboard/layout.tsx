"use client";

import { Logo } from "@/components/Logo";
import Link from "next/link";
import { PropsWithChildren, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { UserDropdown } from "@/components/UserDropdown";
import { AppStateProvider } from "@/contexts/app-state-provider";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { ThemeSwitch } from "@/components/theme-switch";
import { useSession } from "@/auth/useSession";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Loader2Icon } from "lucide-react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { state } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (state == "unauthenticated") {
      const url = new URL("/login", window.location.href);
      url.searchParams.set("cbp", pathname);
      router.push(url.toString());
    }
  }, [state]);

  if (state == "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2Icon className="h-10 w-10 animate-spin" />
      </div>
    );
  } else if (state == "unauthenticated") return;

  return (
    <AppStateProvider>
      <div className="flex h-[100svh] flex-col">
        <div className="z-10 flex items-center justify-between border-b bg-background p-4 shadow-sm">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex gap-4">
            <ThemeSwitch />
            <SidebarToggle />
            <UserDropdown />
          </div>
        </div>
        <div className="isolate flex flex-grow overflow-hidden">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <div className="flex-grow overflow-auto h-full">
            <div className="mx-auto w-full max-w-4xl p-4 md:p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </AppStateProvider>
  );
}
