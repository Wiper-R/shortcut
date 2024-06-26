import React, { useCallback, useRef, useState } from "react";
import { ShortenLink } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LinkEditDialog } from "./link-edit-dialog";
import Image from "next/image";
import { useDataProvider } from "@/contexts/data-provider";
import { Card } from "@/components/ui/card";
import {
  BarChart3Icon,
  CalendarIcon,
  CopyIcon,
  EditIcon,
  MenuIcon,
  PenIcon,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

type ShortenLinkWithEngagements = ShortenLink & {
  _count: {
    Engagement: number;
  };
};

export function LinkCard(): JSX.Element {
  const { data } = useDataProvider<ShortenLinkWithEngagements>();
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const copyRef = useRef<HTMLAnchorElement>(null);
  const copyToClipboard = useCallback(() => {
    if (!copyRef.current) return;
    navigator.clipboard
      .writeText(copyRef.current.innerText)
      .then(() => toast({ description: "Coped Link to clipboard" }))
      .catch((e) => toast({ description: "Can't copy to clipboard" }));
  }, [copyRef.current]);

  return (
    <Card className="flex gap-2 p-2 md:px-6 md:py-4">
      <LinkEditDialog open={isEditing} setIsOpen={setIsEditing} />
      {/* Icon Div */}
      <div className="flex flex-shrink-0 items-center justify-center self-start rounded-full border bg-white p-1">
        <Image
          src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${
            new URL(data.url).origin
          }&size=256`}
          className="w-5 md:w-8"
          width={32}
          height={32}
          alt="Favicon"
        />
      </div>
      {/* Link Info Div */}
      <div className="flex flex-grow flex-col">
        <Link
          href="/"
          className="line-clamp-1 w-fit break-all text-base font-medium hover:underline md:text-lg"
        >
          {data.title ||
            `Untitled ${new Date(data.createdAt).toLocaleString()}`}
        </Link>
        <Link
          href=""
          className=" line-clamp-1 w-fit break-all text-sm md:text-base"
        >
          {data.destination}
        </Link>
        <Link
          href={window.location.origin + `/l/${data.slug}`}
          className="line-clamp-1 w-fit break-all text-sm font-medium text-sky-600 hover:underline md:text-base"
          ref={copyRef}
        >
          {window.location.origin + `/l/${data.slug}`}
        </Link>
        <div className="mt-4 flex space-x-4 text-sm">
          <div className="flex items-end space-x-1">
            <BarChart3Icon className="w-4" />
            <span className="">{data._count.Engagement} clicks</span>
          </div>
          <div className="flex items-end space-x-1">
            <CalendarIcon className="w-4" />
            <span className="">{new Date(data.createdAt).toDateString()}</span>
          </div>
        </div>
      </div>
      {/* Button Div */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="flex-shrink-0 ml-auto">
          <Button variant="outline" size="icon">
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
    </Card>
  );
}
