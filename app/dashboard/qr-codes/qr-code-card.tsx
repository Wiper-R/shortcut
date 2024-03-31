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
  EditIcon,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import { useCallback, useEffect, useRef, useState } from "react";
import { QREditDialog } from "./qr-edit-dialog";
import { useDataProvider } from "@/contexts/data-provider";
import { QRCodeWithShortenLink } from "./qrcode-container";

export function QRCodeCard() {
  const divRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLCanvasElement>();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const { data } = useDataProvider<QRCodeWithShortenLink>();

  useEffect(() => {
    ref.current = divRef.current?.children[0] as HTMLCanvasElement;
  }, []);

  const copyToClipboard = useCallback(function () {
    if (!ref.current)
      return console.error("Failed to copy QR-code, missing QR-Code reference");
    ref.current.toBlob(function (blob) {
      console.log(blob);
      if (!blob) return;
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard
        .write([item])
        .then(() => toast({ description: "Copied QR-Code to clipboard" }))
        .catch((e) => console.error("Failed to copy QR-code to clipboard", e));
    });
  }, [toast]);

  return (
    <Card className="flex px-6 py-4">
      <QREditDialog open={isEditing} setIsOpen={setIsEditing} />
      {/* QR code div */}
      <div ref={divRef}>
        <QRCodeCanvas
          value={window.location.origin + `/l/${data.ShortenLink.slug}`}
          size={104}
          fgColor={data.fgColor}
          bgColor={data.bgColor}
        />
      </div>
      <div className="ml-4 grid">
        <Link
          href="/"
          className="min-w-fit text-lg font-medium hover:underline"
        >
          {data.ShortenLink.title ||
            `Untitled ${new Date(data.createdAt).toLocaleString()}`}
        </Link>
        <Link href="">{data.ShortenLink.destination}</Link>
        <div className="mt-4 flex space-x-4 text-sm">
          <div className="flex items-end space-x-1">
            <BarChart3Icon className="w-4" />
            <span className="">4 clicks</span>
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="ml-auto">
            <MenuIcon className="w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsEditing(true)}>
            <EditIcon className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={copyToClipboard}>
            <CopyIcon className="mr-2 h-4 w-4" />
            <span>Copy</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
}