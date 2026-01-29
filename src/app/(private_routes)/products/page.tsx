import Filter from "@/sections/product/Filter";
import ProductListings from "@/sections/product/ProductListings";
import { products } from "@/constants/products";
import React from "react";

export default function Products() {
  return (
    <div>
      <Filter />
      {/* product listings start */}
      <section className="px-3 mt-9">
        <ProductListings products={products} />
      </section>
      {/* product listings end */}
    </div>
  );
}
