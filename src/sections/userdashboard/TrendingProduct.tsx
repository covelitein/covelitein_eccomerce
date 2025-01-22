import { TrendingCard } from "@/components/reusables/TrendingCard";
import { Product } from "@/types";
import React from "react";

export default function TrendingProduct() {
  const products: Product[] = [
    {
      id: "1",
      name: "Wireless Headphones",
      price: 299.99,
      description:
        "High-quality wireless headphones with noise cancellation and premium sound quality.",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      category: "Electronics",
      discount: 0.15,
      trending: true,
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      price: 199.99,
      description:
        "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring.",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
      category: "Wearables",
      trending: true,
    },
    {
      id: "3",
      name: "Portable Bluetooth Speaker",
      price: 79.99,
      description:
        "Compact and powerful bluetooth speaker with 20-hour battery life.",
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
      category: "Electronics",
      discount: 0.2,
    },
  ];

  const trendingProducts = products.filter((p) => p.trending);
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-4">
      {trendingProducts.map((product) => (
        <TrendingCard key={product.id} product={product} />
      ))}
    </section>
  );
}
