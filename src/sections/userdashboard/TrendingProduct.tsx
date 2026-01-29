"use client";

import { TrendingCard } from "@/components/reusables/TrendingCard";
import { Product } from "@/types";
import React, { useEffect, useState } from "react";

export default function TrendingProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const response = await fetch("/api/products");
      const payload = await response.json();
      if (response.ok) {
        setProducts(payload.products ?? []);
      }
    };

    loadProducts();
  }, []);

  const trendingProducts = products.filter((p) => p.trending).slice(0, 4);
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-4">
      {trendingProducts.length ? (
        trendingProducts.map((product) => (
          <TrendingCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-full rounded-lg border border-dashed p-6 text-center text-gray-500">
          Trending products will appear here once available.
        </div>
      )}
    </section>
  );
}
