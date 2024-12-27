import { UserStats } from "@/sections/userdashboard";
import React from "react";

export default function DashboardPage() {
  return (
    <section className="">
      <div className="px-2 mb-2">
        <h3 className="text-2xl font-bold">Stats</h3>
      </div>
      <UserStats />
      <main className="grid grid-cols-3 gap-3 mt-4 px-3">
        <div className="col-span-2 min-h-60 bg-red-500">

        </div>
        <div className=""></div>
      </main>
    </section>
  );
}
