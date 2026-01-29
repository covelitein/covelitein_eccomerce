import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/prisma";
import { getCategoriesWithFallback } from "@/serverUtils/catalog";

const categorySchema = z.object({
  name: z.string().min(1),
});

export async function GET() {
  try {
    const categories = await getCategoriesWithFallback();
    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to fetch categories.", error },
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

    const payload = categorySchema.parse(await request.json());

    const category = await prismaClient.category.upsert({
      where: { name: payload.name },
      update: {},
      create: { name: payload.name },
    });

    return NextResponse.json({ category });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to create category.", error },
      { status: 500 }
    );
  }
}
