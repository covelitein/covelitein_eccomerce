import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/prisma";
import {
  buildMockPaystackResponse,
  createMockPaystackReference,
} from "@/serverUtils/mock-paystack";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

const initializeSchema = z.object({
  email: z.string().email().optional(),
  currency: z.string().optional(),
  amount: z.number().positive().optional(),
  items: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
      })
    )
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { message: "Database not configured." },
        { status: 500 }
      );
    }

    const session = await getServerSession(authOptions);
    const payload = initializeSchema.parse(await request.json());

    const calculatedAmount =
      payload.items?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ) ?? payload.amount;

    if (!calculatedAmount) {
      return NextResponse.json(
        { message: "Payment amount is required." },
        { status: 400 }
      );
    }

    const reference = createMockPaystackReference();
    const email = payload.email ?? session?.user.email ?? "";

    if (!email) {
      return NextResponse.json(
        { message: "Customer email is required." },
        { status: 400 }
      );
    }

    await prismaClient.paymentTransaction.create({
      data: {
        reference,
        email,
        amount: Math.round(calculatedAmount),
        currency: payload.currency ?? "NGN",
        metadata: payload.items
          ? { items: payload.items, source: "checkout" }
          : { source: "checkout" },
      },
    });

    return NextResponse.json({
      status: true,
      data: buildMockPaystackResponse(reference, {
        email,
        amount: calculatedAmount,
        currency: payload.currency,
        metadata: payload.items ? { items: payload.items } : undefined,
      }),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to initialize payment.", error },
      { status: 500 }
    );
  }
}
