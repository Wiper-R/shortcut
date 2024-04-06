import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import {
  BarChart3Icon,
  CalendarIcon,
  CopyIcon,
  MenuIcon,
  PenIcon,
} from "lucide-react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import { useCallback, useEffect, useRef, useState } from "react";
import { QREditDialog } from "./qr-edit-dialog";
import { useDataProvider } from "@/contexts/data-provider";
import { QRCodeWithShortenLink } from "./qrcode-container";

const QRCodeDropDownMenu = ({
  copyToClipboard,
  setIsEditing,
}: {
  copyToClipboard: () => void;
  setIsEditing: (v: boolean) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex-shrink-0">
        <Button variant="outline" size="icon" className="ml-auto">
          <MenuIcon className="w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setIsEditing(true)}>
          <PenIcon className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyToClipboard}>
          <CopyIcon className="mr-2 h-4 w-4" />
          <span>Copy</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function QRCodeCard() {
  const divRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLCanvasElement>();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const { data } = useDataProvider<QRCodeWithShortenLink>();

  useEffect(() => {
    ref.current = divRef.current?.children[0] as HTMLCanvasElement;
  }, []);

  const copyToClipboard = useCallback(
    function () {
      if (!ref.current)
        return console.error(
          "Failed to copy QR-code, missing QR-Code reference",
        );
      ref.current.toBlob(function (blob) {
        console.log(blob);
        if (!blob) return;
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard
          .write([item])
          .then(() => toast({ description: "Copied QR-Code to clipboard" }))
          .catch((e) =>
            console.error("Failed to copy QR-code to clipboard", e),
          );
      });
    },
    [toast],
  );

  return (
    <Card className="flex flex-col gap-5 p-2 py-4 md:flex-row md:px-6">
      <QREditDialog open={isEditing} setIsOpen={setIsEditing} />
      {/* QR code div */}
      <div className="grid grid-cols-[1fr_auto_1fr] md:hidden">
        <span/>
        <div>
          <QRCodeCanvas
            value={window.location.origin + `/l/${data.ShortenLink.slug}?qr`}
            size={80}
            fgColor={data.fgColor}
            bgColor={data.bgColor}
            className="self-center"
          />
        </div>
        <div className="ml-auto">
          <QRCodeDropDownMenu {...{ copyToClipboard, setIsEditing }} />
        </div>
      </div>
      <div ref={divRef} className="hidden md:block">
        <QRCodeCanvas
          value={window.location.origin + `/l/${data.ShortenLink.slug}?qr`}
          size={104}
          fgColor={data.fgColor}
          bgColor={data.bgColor}
        />
      </div>
      <div className="ml-4 grid">
        <Link
          href="/"
          className="line-clamp-1 w-fit break-all text-base font-medium hover:underline md:text-lg"
        >
          {data.ShortenLink.title ||
            `Untitled ${new Date(data.createdAt).toLocaleString()}`}
        </Link>
        <Link
          href=""
          className="line-clamp-1 w-fit break-all text-sm md:text-base"
        >
          {data.ShortenLink.destination}
        </Link>
        <div className="mt-4 flex space-x-4 text-sm">
          <div className="flex items-end space-x-1">
            <BarChart3Icon className="w-4" />
            <span className="">{data.ShortenLink._count.Engagement} scans</span>
          </div>
          <div className="flex items-end space-x-1">
            <CalendarIcon className="w-4" />
            <span className="">
              {/* 26 Mar, 2024 */}
              {new Date(data.createdAt).toDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <QRCodeDropDownMenu {...{ copyToClipboard, setIsEditing }} />
      </div>
    </Card>
  );
}
