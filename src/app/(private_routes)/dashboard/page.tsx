import { Order, UserStats } from "@/sections/userdashboard";
import React from "react";

export default function DashboardPage() {
  return (
    <section className="">
      <div className="px-2 mb-2">
        <h3 className="text-2xl font-bold">Stats</h3>
      </div>
      <UserStats />
      <main className="grid lg:grid-cols-3 grid-cols-1 gap-3 mt-10 px-3">
        <div className="lg:col-span-2 min-h-60">
          <Order />
        </div>
        <div className=""></div>
      </main>
    </section>
  );
}
