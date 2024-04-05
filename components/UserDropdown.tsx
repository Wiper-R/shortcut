"use client";

import { LucideProps, SettingsIcon, UserRoundIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function UserDropdown({ className, ...props }: LucideProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserRoundIcon
          {...props}
          className={cn(
            "h-10 w-10 rounded-full bg-gray-300/70 p-2 text-gray-600",
            className,
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2">
        <DropdownMenuItem onClick={() => {}}>
          <Link href="/dashboard/account">Account</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
