import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { getOrdersForUserWithFallback } from "@/serverUtils/orders";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Authentication required." },
        { status: 401 }
      );
    }

    const orders = await getOrdersForUserWithFallback(session.user.id);
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to fetch orders.", error },
      { status: 500 }
    );
  }
}
