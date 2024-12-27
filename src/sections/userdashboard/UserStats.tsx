"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import { userStats } from "@/constants";

export default function UserStats() {
  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 px-2">
      {/* Orders in Transit */}
      {userStats.map((stat, idx) => (
        <Card key={idx}>
          <CardHeader className="p-4">
            <div className="flex justify-between">
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
