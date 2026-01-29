"use client";

import { ProductCard } from "@/components/reusables/ProductCard";
import { Product } from "@/types";
import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/toast/use-toast";
import ToastComponent from "@/components/toast/toast-component";

export default function ProductListings({ products }: { products?: Product[] }) {
  const router = useRouter();
  const { toasts, addToast, removeToast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToast({
      message: `${product.name} added to cart.`,
      type: "success",
      showLoader: true,
    });
  };
  const handleView = (productId: string) => {
    router.push(`/products/${productId}`);
  };
  return (
    <>
      <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {products?.length ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetails={handleView}
            />
          ))
        ) : (
          <div className="col-span-full rounded-lg border border-dashed p-8 text-center text-gray-500">
            No products found. Try adjusting your filters.
          </div>
        )}
      </section>
      <div>
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            showLoader={toast.showLoader}
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </>
  );
}
