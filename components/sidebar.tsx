"use client";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  GanttChartIcon,
  LinkIcon,
  LucideIcon,
  PlusIcon,
  QrCodeIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAppState } from "@/contexts/app-state-provider";

type SidebarItemProp = {
  label: string;
  href: string;
  Icon: LucideIcon;
};

const SidebarItem = (props: SidebarItemProp) => {
  const pathname = usePathname();
  const { href, label, Icon } = props;
  const { sidebarToggle, setSidebarToggle } = useAppState();
  let _href = "/dashboard" + href;
  return (
    <Link
      href={_href}
      className={cn(
        "flex items-center gap-2 rounded px-3 py-2 text-sm transition-colors hover:bg-violet-100",
        { "bg-violet-500 text-white hover:bg-violet-500": pathname == _href },
      )}
      onClick={() => {
        if (sidebarToggle) {
          setSidebarToggle(false);
        }
      }}
    >
      {<Icon className="w-5" />} {label}
    </Link>
  );
};

export function Sidebar() {
  const { sidebarToggle } = useAppState();
  return (
    <div
      className={cn(
        "sticky top-0 z-10 flex h-full w-[240px] flex-shrink-0 flex-col gap-1 overflow-auto bg-slate-50 px-2 shadow-sm",
        "transition-transform max-md:fixed max-md:left-0 max-md:top-[72px] max-md:-translate-x-full",
        sidebarToggle && "max-md:translate-x-0",
      )}
    >
      <SidebarItem label="Create New" href="/create-new" Icon={PlusIcon} />
      <SidebarItem label="Overview" href="/overview" Icon={GanttChartIcon} />
      <SidebarItem label="Links" href="/links" Icon={LinkIcon} />
      <SidebarItem label="QR Codes" href="/qr-codes" Icon={QrCodeIcon} />
      <Separator orientation="horizontal" />
      <SidebarItem label="Settings" href="/settings" Icon={SettingsIcon} />
    </div>
  );
}
