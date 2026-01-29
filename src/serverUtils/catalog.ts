import { prismaClient } from "@/prisma";
import { products as mockProducts } from "@/constants/products";
import { Product } from "@/types";

const defaultImage = "/images/default_product.jpg";

const normalizeProduct = (product: {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  image?: string | null;
  discount?: number | null;
  trending?: boolean | null;
  category?: { name: string } | null;
}): Product => ({
  id: product.id,
  name: product.name,
  price: product.price,
  description: product.description ?? "No description available.",
  image: product.image ?? defaultImage,
  category: product.category?.name ?? "Uncategorized",
  discount: product.discount ?? undefined,
  trending: product.trending ?? false,
});

export const getProductsWithFallback = async (): Promise<Product[]> => {
  if (process.env.DATABASE_URL) {
    try {
      const dbProducts = await prismaClient.product.findMany({
        include: { category: true },
      });

      if (dbProducts.length) {
        return dbProducts.map((product) => normalizeProduct(product));
      }
    } catch {
      // Fall back to mock data when database is unavailable.
    }
  }

  return mockProducts;
};

export type CategorySummary = {
  id: string;
  name: string;
  products: number;
  status: "Active" | "Draft";
};

export const getCategoriesWithFallback = async (): Promise<CategorySummary[]> => {
  if (process.env.DATABASE_URL) {
    try {
      const dbCategories = await prismaClient.category.findMany({
        include: { _count: { select: { Product: true } } },
      });

      if (dbCategories.length) {
        return dbCategories.map((category) => ({
          id: category.id,
          name: category.name,
          products: category._count.Product,
          status: category._count.Product > 0 ? "Active" : "Draft",
        }));
      }
    } catch {
      // Fall back to mock data when database is unavailable.
    }
  }

  const fallbackMap = mockProducts.reduce<Record<string, number>>(
    (acc, product) => {
      acc[product.category] = (acc[product.category] ?? 0) + 1;
      return acc;
    },
    {}
  );

  return Object.entries(fallbackMap).map(([name, count], index) => ({
    id: `mock-${index}`,
    name,
    products: count,
    status: count > 0 ? "Active" : "Draft",
  }));
};
