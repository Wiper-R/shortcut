import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShortenLink } from "@prisma/client";
import { BarChart3Icon, CalendarIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";

export function QRCodeCard({ shortenLink }: { shortenLink: ShortenLink }) {
    return <Card className="flex py-4 px-6">
        {/* QR code div */}
            <QRCodeCanvas value="Shortcut" size={104} />
        <div className="grid ml-4">
            <Link href="/" className="hover:underline text-lg font-medium min-w-fit">
                {shortenLink.title || `Untitled ${new Date(shortenLink.createdAt).toLocaleString()}`}
            </Link>
            <Link href="">
                {shortenLink.destination}
            </Link>
            <div className="flex space-x-4 mt-4 text-sm">
                <div className="flex space-x-1 items-end">
                    <BarChart3Icon className="w-4" />
                    <span className="">
                        4 clicks
                    </span>
                </div>
                <div className="flex space-x-1 items-end">
                    <CalendarIcon className="w-4" />
                    <span className="">
                        {/* 26 Mar, 2024 */}
                        {new Date(shortenLink.createdAt).toDateString()}
                    </span>
                </div>
            </div>
        </div>
        <div className="ml-auto">
            <Button variant="outline" size="icon"><MenuIcon className="w-5"/></Button>
        </div>
    </Card>
}