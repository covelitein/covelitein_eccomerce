"use client";

import { AppSidebar } from "./AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import Header from "./Header";
import { SessionProvider } from "next-auth/react";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Header />
          <div
            className="w-full box-border px-2 py-4"
          >
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
