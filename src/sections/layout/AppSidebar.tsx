"use client";

import * as React from "react";
import { Settings2, Grid2x2, Package, Search, ShieldCheck } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Footer } from "./Footer";
import { Navlinks } from "@/components/layout/Navlinks";


const data = {
  user: {
    name: "Covenant",
    lastname: "Abraham",
    email: "abrahamcovenant2004@gmail.com",
    avatar: "/illustrations/user-1.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Grid2x2,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="bg-white" {...props}>
      <SidebarHeader className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-[#000080] data-[state=open]:text-white py-3 hover:bg-[#000080]/10 hover:text-[#000080]"
            >
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold">Covelitein</h3>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-white px-4">
        <Navlinks items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="p-4 bg-white">
        <Footer user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
