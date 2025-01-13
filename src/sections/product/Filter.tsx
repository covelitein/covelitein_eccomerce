"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Search } from "lucide-react";
import React, { useState } from "react";

export default function Filter() {
  const fetchUsers = async (search: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock data
    const allUsers = [
      { value: "1", label: "Electronics" },
      { value: "2", label: "Home & Kitchen" },
      { value: "3", label: "Clothing" },
      { value: "4", label: "Footwear" },
      { value: "5", label: "Accessories" },
      { value: "6", label: "Beauty & Personal Care" },
      { value: "7", label: "Fitness & Sports" },
      { value: "8", label: "Books & Stationery" },
      { value: "9", label: "Toys & Games" },
      { value: "10", label: "Groceries" },
      { value: "11", label: "Automotive" },
      { value: "12", label: "Pet Supplies" },
      { value: "13", label: "Baby Products" },
      { value: "14", label: "Garden & Outdoor" },
      { value: "15", label: "Health & Wellness" },
    ];

    // Filter based on search
    return allUsers.filter((user) =>
      user.label.toLowerCase().includes(search.toLowerCase())
    );
  };

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <section className="px-3">
      {/* heading start */}
      <h2 className="text-xl font-semibold mb-4">Explore products</h2>
      {/* heading end */}
      <main className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {/* search by product name start */}
        <div className="">
          <Input placeholder="Search by name..." />
        </div>
        {/* search by product name end */}

        {/* search by product name start */}
        <div className="">
          <MultiSelect
            placeholder="filter by categories..."
            onLoadOptions={fetchUsers}
            onChange={setSelectedValues}
            maxSelections={3}
          />
        </div>
        {/* search by product name end */}

        {/* search button start */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="border-dashed bg-transparent border hover:bg-transparent text-gray-600">
            <span>Filter</span>
            <MixerHorizontalIcon />
          </Button>
          <Button className="[&_svg]:size-6">
            <Search />
          </Button>
        </div>
        {/* search button end */}
      </main>
    </section>
  );
}
