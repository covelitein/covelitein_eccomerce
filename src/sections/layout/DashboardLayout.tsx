"use client";

import { AppSidebar } from "./AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import Header from "./Header";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div
          className="w-full box-border px-2 py-4"
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
