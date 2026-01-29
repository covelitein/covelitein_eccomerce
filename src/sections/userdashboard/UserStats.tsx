"use client";

import { Card, CardHeader } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Truck, PackageCheck, Tag, Star } from "lucide-react";

const iconMap = {
  "Orders in Transit": {
    icon: <Truck />,
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  "Delivered Orders": {
    icon: <PackageCheck />,
    textColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  "Active Coupons": {
    icon: <Tag />,
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  "Reward Points": {
    icon: <Star />,
    textColor: "text-purple-600",
    bgColor: "bg-purple-50",
  },
};

export default function UserStats() {
  const [stats, setStats] = useState<
    { title: keyof typeof iconMap; count: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const response = await fetch("/api/user-stats");
      const payload = await response.json();
      if (response.ok) {
        setStats(payload.stats ?? []);
      }
      setLoading(false);
    };

    loadStats();
  }, []);

  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 px-2">
      {loading && (
        <div className="col-span-full rounded-lg border border-dashed p-6 text-center text-gray-500">
          Loading stats...
        </div>
      )}
      {!loading &&
        stats.map((stat) => {
          const config = iconMap[stat.title];
          return (
            <Card key={stat.title}>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {stat.title}
                  </h3>
                  <div>
                    <Button
                      className={`[&_svg]:size-8 ${config.bgColor} ${config.textColor} hover:${config.bgColor} px-3 py-7 rounded-full`}
                    >
                      {config.icon}
                    </Button>
                  </div>
                </div>
                <p className={`text-2xl font-bold ${config.textColor}`}>
                  {stat.count}
                </p>
              </CardHeader>
            </Card>
          );
        })}
    </section>
  );
}
