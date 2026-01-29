import { prismaClient } from "@/prisma";
import { products as mockProducts } from "@/constants/products";

export type OrderData = {
  id: string;
  products: string;
  productImage?: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  totalPrice: number;
  deliveryETA: string;
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const buildMockOrders = (): OrderData[] => {
  const baseDate = new Date();
  return mockProducts.slice(0, 3).map((product, index) => ({
    id: `ORD-${String(1001 + index)}`,
    products: product.name,
    productImage: product.image,
    status: "Delivered",
    totalPrice: product.price,
    deliveryETA: formatDate(addDays(baseDate, 3 + index)),
  }));
};

export const getOrdersForUserWithFallback = async (
  userId: string
): Promise<OrderData[]> => {
  if (process.env.DATABASE_URL) {
    try {
      const purchases = await prismaClient.purchase.findMany({
        where: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      if (purchases.length) {
        return purchases.map((purchase) => {
          const products = purchase.items
            .map((item) => item.product?.name)
            .filter(Boolean);
          const productImage = purchase.items.find((item) => item.product?.image)
            ?.product?.image;

          return {
            id: purchase.id,
            products: products.join(", ") || "Order items",
            productImage: productImage ?? undefined,
            status: "Delivered",
            totalPrice: purchase.totalAmount,
            deliveryETA: formatDate(addDays(purchase.createdAt, 4)),
          };
        });
      }
    } catch {
      // Fall back to mock data when database is unavailable.
    }
  }

  return buildMockOrders();
};

export const getAdminOrdersWithFallback = async (): Promise<OrderData[]> => {
  if (process.env.DATABASE_URL) {
    try {
      const purchases = await prismaClient.purchase.findMany({
        include: {
          items: {
            include: {
              product: true,
            },
          },
          user: true,
        },
        orderBy: { createdAt: "desc" },
      });

      if (purchases.length) {
        return purchases.map((purchase) => {
          const products = purchase.items
            .map((item) => item.product?.name)
            .filter(Boolean);
          const productImage = purchase.items.find((item) => item.product?.image)
            ?.product?.image;

          return {
            id: purchase.id,
            products: products.join(", ") || "Order items",
            productImage: productImage ?? undefined,
            status: "Delivered",
            totalPrice: purchase.totalAmount,
            deliveryETA: formatDate(addDays(purchase.createdAt, 4)),
          };
        });
      }
    } catch {
      // Fall back to mock data when database is unavailable.
    }
  }

  return buildMockOrders();
};
