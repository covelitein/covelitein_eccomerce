import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/prisma";
import { getProductsWithFallback } from "@/serverUtils/catalog";

const productPayloadSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  description: z.string().min(1),
  image: z.string().url(),
  category: z.string().min(1),
  discount: z.number().optional(),
  trending: z.boolean().optional(),
});

export async function GET() {
  try {
    const products = await getProductsWithFallback();
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to fetch products.", error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { message: "Database not configured." },
        { status: 500 }
      );
    }

    const payload = productPayloadSchema.parse(await request.json());

    const category = await prismaClient.category.upsert({
      where: { name: payload.category },
      update: {},
      create: { name: payload.category },
    });

    const product = await prismaClient.product.create({
      data: {
        name: payload.name,
        price: Math.round(payload.price),
        description: payload.description,
        image: payload.image,
        discount: payload.discount ? Math.round(payload.discount) : undefined,
        trending: payload.trending ?? false,
        categoryId: category.id,
      },
      include: { category: true },
    });

    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to create product.", error },
      { status: 500 }
    );
  }
}
