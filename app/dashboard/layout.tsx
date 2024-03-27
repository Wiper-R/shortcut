import { Logo } from "@/components/Logo";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Sidebar } from "@/components/sidebar";
import { UserIcon } from "lucide-react";

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex items-center justify-between bg-slate-50 p-4 shadow-sm z-10">
                <Link href="/"><Logo /></Link>
                <div className="p-2 ml-auto rounded-full bg-gray-300">
                    <UserIcon />
                </div>
            </div>
            <div className="flex flex-grow overflow-hidden">
                {/* Sidebar */}
                <Sidebar />
                {/* Main Content */}
                <div className="flex-grow overflow-auto">
                    <div className="w-full p-8 max-w-4xl mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
