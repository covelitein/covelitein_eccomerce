"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Power } from "lucide-react";

export function Footer({
  user,
}: {
  user: {
    name: string;
    lastname: string;
    email: string;
    avatar?: string; // Optional avatar for fallback handling
  };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="xl"
          className="hover:bg-blue-600/30 hover:text-blue-600 bg-blue-600/30 text-blue-600 px-3 py-5 active:bg-blue-600/30 active:text-blue-600"
        >
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage
              src={user.avatar || "/fallback-avatar.png"}
              alt={user.name ?? ""}
            />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight ml-3">
            <span className="truncate font-semibold">{user.name ?? ""}</span>
            <span className="truncate font-semibold">
              {user.lastname ?? ""}
            </span>
          </div>
          <div className="px-2 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-600/70">
            <Power size={24} className="ml-auto text-xl" />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
