import { products } from "@/constants/products";
import ProductListings from "@/sections/product/ProductListings";
import React from "react";

export default function WishList() {
  return (
    <section className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Wishlist</h1>
        <p className="text-gray-500">
          Save items you love and revisit them anytime.
        </p>
      </div>
      <ProductListings products={products.slice(0, 6)} />
    </section>
  );
}
