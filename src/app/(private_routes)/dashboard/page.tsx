import { Order, UserStats } from "@/sections/userdashboard";
import React from "react";

export default function DashboardPage() {
  return (
    <section className="">
      {/* users stats start */}
      <div className="">
        <UserStats />
      </div>
      {/* users stats end */}

      {/* trending products and recently viewed product slide start */}
      <div className="grid grid-cols-2">
        <div className=""></div>
      </div>
      {/* trending products and recently viewed product slide end */}

      {/* recent orders start */}
      <div className="mt-10 px-3">
        <div className="mb-4">
          <h3 className="font-semibold text-xl">Recent Orders</h3>
        </div>
        <Order />
      </div>
      {/* recent orders end */}
    </section>
  );
}
