"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Search } from "lucide-react";
import React, { useState } from "react";

export default function Filter() {
  const fetchCategories = async (search: string) => {
    const response = await fetch("/api/categories");
    const payload = await response.json();
    const categories = payload.categories ?? [];
    const filtered = categories.filter((category: { name: string }) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );

    return filtered.map((category: { id: string; name: string }) => ({
      value: category.id,
      label: category.name,
    }));
  };

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className="px-3">
      {/* heading start */}
      <h2 className="text-xl font-semibold mb-4">Explore products</h2>
      {/* heading end */}
      <main className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {/* search by product name start */}
        <div className="">
          <Input
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        {/* search by product name end */}

        {/* search by product name start */}
        <div className="">
          <MultiSelect
            placeholder="filter by categories..."
            onLoadOptions={fetchCategories}
            onChange={setSelectedValues}
            maxSelections={3}
          />
        </div>
        {/* search by product name end */}

        {/* search button start */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            className="border-dashed bg-transparent border hover:bg-transparent text-gray-600"
            disabled={!selectedValues.length && !searchTerm}
          >
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
