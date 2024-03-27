"use client";
import { cn } from "@/lib/utils";
import { GanttChartIcon, LinkIcon, LucideIcon, PlusIcon, QrCodeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarItemProp = {
    label: string;
    href: string;
    Icon: LucideIcon
}

const SidebarItem = (props: SidebarItemProp) => {
    const pathname = usePathname();
    const { href, label, Icon } = props;
    let _href = "/dashboard" + href;
    return <Link href={_href} className={cn("px-3 py-2 rounded mx-2 hover:bg-violet-100 flex gap-2 transition-colors", { "bg-violet-500 text-white hover:bg-violet-500": pathname == _href })}>
        {<Icon className="w-5" />} {label}
    </Link>
}

export function Sidebar() {
    return <div className="w-[240px] h-full bg-slate-50 shadow-sm z-10 flex flex-col gap-1 overflow-auto flex-shrink-0 sticky top-0">
        <SidebarItem label="Create New" href="/create-new" Icon={PlusIcon} />
        <SidebarItem label="Overview" href="/overview" Icon={GanttChartIcon} />
        <SidebarItem label="Links" href="/links" Icon={LinkIcon} />
        <SidebarItem label="QR Codes" href="/qr-codes" Icon={QrCodeIcon} />
    </div>
}