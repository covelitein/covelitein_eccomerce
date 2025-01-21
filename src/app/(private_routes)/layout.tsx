import { DashboardLayout } from "@/sections/layout/DashboardLayout";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <DashboardLayout>
          {children}
      </DashboardLayout>
    );
}
