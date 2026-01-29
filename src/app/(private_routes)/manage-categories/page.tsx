import { CategoryHeader, CategoryTable } from "@/sections/admindashboard/category";
import React from "react";

export default function ManageCategories() {
  return (
    <section className="px-4 py-3">
      <CategoryHeader />
      <CategoryTable />
    </section>
  );
}
