import { UserIcon } from "lucide-react";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
    return <div className="flex h-screen flex-col">
        <div className="w-full flex bg-blue-400 p-3">
            <div className="p-2 ml-auto rounded-full bg-gray-300">
                <UserIcon />
            </div>
        </div>
        <div className="flex w-full h-full">
            {/* Sidebar */}
            <div className="w-[240px] h-full bg-red-200">
                
            </div>
            {/* Main Content */}
            <div className="flex-grow bg-orange-400">

            </div>
        </div>
    </div>
}