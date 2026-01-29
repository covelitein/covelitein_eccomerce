import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { prismaClient } from "@/prisma";

const mockStats = [
  { title: "Orders in Transit", count: 2 },
  { title: "Delivered Orders", count: 12 },
  { title: "Active Coupons", count: 3 },
  { title: "Reward Points", count: 1200 },
];

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ stats: mockStats });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Authentication required." },
        { status: 401 }
      );
    }

    const purchases = await prismaClient.purchase.count({
      where: { userId: session.user.id },
    });

    if (!purchases) {
      return NextResponse.json({ stats: mockStats });
    }

    return NextResponse.json({
      stats: [
        { title: "Orders in Transit", count: 0 },
        { title: "Delivered Orders", count: purchases },
        { title: "Active Coupons", count: 0 },
        { title: "Reward Points", count: purchases * 10 },
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to fetch user stats.", error },
      { status: 500 }
    );
  }
}
