import { Card } from "@/components/ui/card";
import Link from "next/link";
import ShortcutLogo from "@/assets/shortcut-logo.svg"
import {BarChart3Icon, CalendarIcon, MenuIcon} from "lucide-react"
import { Button } from "@/components/ui/button";
import { ShortenLink } from "@prisma/client";

export function LinkCard({shortenLink}: {shortenLink: ShortenLink}) {
    return <Card className="flex py-4 px-6">
        {/* Icon Div */}
        <div className="flex items-center justify-center p-1 rounded-full bg-white border self-start flex-shrink-0">
            <img src={'https://api.faviconkit.com/stackoverflow.in/256'} className="w-8"/>
        </div>
        {/* Link Info Div */}
        <div className="flex-grow flex flex-col ml-4">
            <Link href="/" className="hover:underline text-lg font-medium min-w-fit">
                {shortenLink.title || `Untitled ${new Date(shortenLink.createdAt).toLocaleString()}`}
            </Link>
            <Link href="">
            {shortenLink.destination}
            </Link>
            <Link href="" className="text-sky-600 font-medium hover:underline min-w-fit">
                http://shortcut.com/l/{shortenLink.slug}
            </Link>
            <div className="flex space-x-4 mt-4 text-sm">
                <div className="flex space-x-1 items-end">
                    <BarChart3Icon className="w-4"/>
                    <span className="">
                    4 clicks
                    </span>
                </div>
                <div className="flex space-x-1 items-end">
                    <CalendarIcon className="w-4"/>
                    <span className="">
                    {/* 26 Mar, 2024 */}
                {new Date(shortenLink.createdAt).toDateString()}
                    </span>
                </div>
            </div>
        </div>
        {/* Button Div */}
        <div>
            <Button variant="outline" size="icon"><MenuIcon className="w-5"/></Button>
        </div>
    </Card>
}