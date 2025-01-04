"use client";
import { Order } from "@/sections/userdashboard";
import React, { useState } from "react";
import {
  Home,
  TrendingUp,
  PlaySquare,
  Music2,
  Film,
  Gamepad2,
  Newspaper,
  Trophy,
  Flame,
} from "lucide-react";
import { Tab } from "@/components/ScrollableTabs/types";
import { ScrollableTabs } from "@/components/ScrollableTabs/ScrollableTabs";

export default function Orders() {
  const initialTabs: Tab[] = [
    { id: "all", label: "All", icon: <Home className="w-4 h-4" /> },
    {
      id: "delivered",
      label: "Delivered",
      icon: <TrendingUp className="w-4 h-4" />,
      badge: (50+'+' as unknown) as number,
    },
    { id: "pending", label: "Pending", icon: <Music2 className="w-4 h-4" /> },
    { id: "cancelled", label: "Cancelled", icon: <Gamepad2 className="w-4 h-4" /> },
    { id: "shipped", label: "Shipped", icon: <Film className="w-4 h-4" /> },
  ];

  const [selectedTab, setSelectedTab] = useState(initialTabs[0].id);
  const [tabs, setTabs] = useState(initialTabs);

  const handleTabsReorder = (newTabs: Tab[]) => {
    setTabs(newTabs);
  };

  return (
    <div className="min-h-screen ">
      <div className="mb-3 px-3">
        <h3 className="font-semibold text-3xl">My Orders</h3>
      </div>
      <div className="sticky top-0 z-10 px-3">
        <ScrollableTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          onTabsReorder={handleTabsReorder}
        />
      </div>
      <div className="px-3 mt-7">
        <Order />
      </div>
    </div>
  );
}
