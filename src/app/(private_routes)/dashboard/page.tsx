import { UserStats } from "@/sections/userdashboard";
import React from "react";

export default function DashboardPage() {
  return (
    <section className="">
      <div className="px-2 mb-2">
        <h3 className="text-2xl font-bold">Stats</h3>
      </div>
      <UserStats />
    </section>
  );
}
