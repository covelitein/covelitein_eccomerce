import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

const verifySchema = z.object({
  reference: z.string(),
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
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Authentication required." },
        { status: 401 }
      );
    }

    const payload = verifySchema.parse(await request.json());
    const transaction = await prismaClient.paymentTransaction.findUnique({
      where: { reference: payload.reference },
    });

    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found." },
        { status: 404 }
      );
    }

    if (transaction.status === "success") {
      return NextResponse.json({
        status: true,
        data: {
          reference: transaction.reference,
          amount: transaction.amount,
          currency: transaction.currency,
          status: transaction.status,
        },
      });
    }

    const updated = await prismaClient.paymentTransaction.update({
      where: { reference: payload.reference },
      data: { status: "success" },
    });

    const purchase = await prismaClient.purchase.create({
      data: {
        userId: session.user.id,
        totalAmount: updated.amount,
      },
    });

    return NextResponse.json({
      status: true,
      data: {
        reference: updated.reference,
        amount: updated.amount,
        currency: updated.currency,
        status: updated.status,
        purchaseId: purchase.id,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to verify payment.", error },
      { status: 500 }
    );
  }
}
