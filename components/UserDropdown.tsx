"use client";

import {
  LucideLogOut,
  LucideProps,
  SettingsIcon,
  UserRoundIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import useSession from "@/auth/useSession";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function UserDropdown({ className, ...props }: LucideProps) {
  const { session } = useSession();
  const user = session.data?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="bg-gray-200 p-2">
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback className="bg-transparent">
            {user?.name
              .split(" ")
              .map((word) => word[0])
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2">
        <DropdownMenuItem onClick={() => {}} className="text-sm">
          {user?.name} ({user?.email})
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
