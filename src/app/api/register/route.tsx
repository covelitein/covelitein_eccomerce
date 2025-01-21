import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import useUser from "@/dbhooks/useUser";
import { parsedBody } from "@/serverUtils";
import useError from "@/composed/useError";

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

    const existing = await useUser().getUserByEmail(data.email);
    if (existing) throw new Error("user with email exist!");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await useUser().registerUser({
      ...data,
      password: hashedPassword,
    });

    console.log(user);
    return NextResponse.json({
      user,
    });
  } catch (e) {
    console.log("error", e);
    return NextResponse.json(useError().ValidationError(e), { status: 400 });
  }
}
