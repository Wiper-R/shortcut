import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  BarChart3Icon,
  CalendarIcon,
  CopyIcon,
  EditIcon,
  MenuIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShortenLink } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LinkEditDialog } from "./link-edit-dialog";
import { useState } from "react";
import { useDataProvider } from "@/contexts/data-provider";

export function LinkCard() {
  const { data } = useDataProvider<ShortenLink>();
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Card className="flex px-6 py-4">
      <LinkEditDialog open={isEditing} setIsOpen={setIsEditing} />
      {/* Icon Div */}
      <div className="flex flex-shrink-0 items-center justify-center self-start rounded-full border bg-white p-1">
        <img
          src={"https://api.faviconkit.com/stackoverflow.com/256"}
          className="w-8"
        />
      </div>
      {/* Link Info Div */}
      <div className="ml-4 flex flex-grow flex-col">
        <Link
          href="/"
          className="min-w-fit text-lg font-medium hover:underline"
        >
          {data.title ||
            `Untitled ${new Date(data.createdAt).toLocaleString()}`}
        </Link>
        <Link href="">{data.destination}</Link>
        <Link
          href={window.location.origin + `/l/${data.slug}`}
          className="min-w-fit font-medium text-sky-600 hover:underline"
        >
          {window.location.origin + `/l/${data.slug}`}
        </Link>
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
      {/* Button Div */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon className="w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsEditing(true)}>
            <EditIcon className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CopyIcon className="mr-2 h-4 w-4" />
            <span>Copy</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
}
