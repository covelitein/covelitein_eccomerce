import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { parsedBody } from "@/serverUtils";
import errorHandler from "@/composed/errorHandler";
import userHandler from "@/dbhooks/useUser";

export async function POST(request: NextRequest) {
  try {
    const body = await parsedBody(request);

    const data = z
      .object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
        password: z.string(),
      })
      .parse(body);

    const existing = await userHandler().getUserByEmail(data.email);
    if (existing) throw new Error("user with email exist!");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await userHandler().registerUser({
      ...data,
      password: hashedPassword,
    });

    console.log(user);
    return NextResponse.json({
      user,
    });
  } catch (e) {
    console.log("error", e);
    return NextResponse.json(errorHandler().ValidationError(e), { status: 400 });
  }
}
