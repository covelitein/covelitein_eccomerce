import { Order, UserStats } from "@/sections/userdashboard";
import TrendingProduct from "@/sections/userdashboard/TrendingProduct";
import React from "react";

export default function DashboardPage() {
  return (
    <section className="px-2 py-3">
      {/* welcome start */}
      <div className="px-3 mb-10">
        <div className="mb-4">
          <h3 className="font-semibold text-xl">Welcome, Covenant Abraham</h3>
        </div>
        <p className="text-gray-500">
          Here is a quick overview of your account and recent activities.
        </p>
      </div>
      {/* welcome end */}

      {/* users stats start */}
      <div className="mb-10">
        <UserStats />
      </div>
      {/* users stats end */}

      {/* trending products and recently viewed product slide start */}
      <div className="px-3 mb-10">
        <div className="">
          <div className="mb-3">
            <h3 className="font-semibold text-xl">Trending Products</h3>
          </div>
          <div className="">
            <TrendingProduct />
          </div>
        </div>
      </div>
      {/* trending products and recently viewed product slide end */}

      {/* recent orders start */}
      <div className="px-3">
        <div className="mb-4">
          <h3 className="font-semibold text-xl">Recent Orders</h3>
        </div>
        <Order />
      </div>
      {/* recent orders end */}
    </section>
  );
}
