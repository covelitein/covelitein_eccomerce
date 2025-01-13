'use client'

import { ProductCard } from "@/components/reusables/ProductCard";
import { Product } from "@/types";
import React from "react";

export default function ProductListings({ products }: { products?: Product[] }) {
  const handleAddToCart = (product: Product) => {
    console.log(product);
  };
  const handleView = (productId: string) => {
    console.log(productId);
  };
  return (
    <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
      {products?.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          onAddToCart={handleAddToCart}
          onViewDetails={handleView}
        />
      ))}
    </section>
  );
}
