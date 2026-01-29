import Filter from "@/sections/product/Filter";
import ProductListings from "@/sections/product/ProductListings";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { getProductsWithFallback } from "@/serverUtils/catalog";

export default async function Products() {
  const products = await getProductsWithFallback();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="text-gray-500">
            Browse curated selections and head to checkout when ready.
          </p>
        </div>
        <Button asChild>
          <Link href="/checkout">Go to checkout</Link>
        </Button>
      </div>
      <div className="mt-6">
        <Filter />
      </div>
      {/* product listings start */}
      <section className="px-3 mt-9">
        <ProductListings products={products} />
      </section>
      {/* product listings end */}
    </div>
  );
}
