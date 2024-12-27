"use client";

import { Card, CardHeader } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import { Truck, PackageCheck, Tag, Star } from "lucide-react";

export default function UserStats() {
  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 px-2">
      {/* Orders in Transit */}
      {userStats.map((stat, idx) => (
        <Card key={idx}>
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                {stat.title}
              </h3>
              <div className="">
                <Button
                  className={`[&_svg]:size-8 ${stat.bgColor} ${stat.textColor} hover:${stat.bgColor} px-3 py-7 rounded-full`}
                >
                  {stat.icon}
                </Button>
              </div>
            </div>
            <p className={`text-2xl font-bold ${stat.textColor}`}>
              {stat.count}
            </p>
          </CardHeader>
        </Card>
      ))}
    </section>
  );
}

export const userStats: {
  icon: React.ReactNode;
  textColor: string;
  bgColor: string;
  title: string;
  count: number;
  lineColor: string;
}[] = [
  {
    icon: <Truck />,
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    title: "Orders in Transit",
    count: 2,
    lineColor: "#2563EB",
  },
  {
    icon: <PackageCheck />,
    textColor: "text-green-600",
    bgColor: "bg-green-50",
    title: "Delivered Orders",
    count: 12,
    lineColor: "#16A34A",
  },
  {
    icon: <Tag />,
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
    title: "Active Coupons",
    count: 3,
    lineColor: "#F59E0B",
  },
  {
    icon: <Star />,
    textColor: "text-purple-600",
    bgColor: "bg-purple-50",
    title: "Reward Points",
    count: 1200,
    lineColor: "#7C3AED",
  },
];
