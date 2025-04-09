import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { isBlacklisted } from "../../../../lib/blacklist";

const prisma = new PrismaClient();

const emailSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request): Promise<Response> {
  const body: unknown = await req.json();
  const parsed = emailSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Invalid email format" },
      { status: 400 }
    );
  }

  const { email } = parsed.data;

  if (isBlacklisted(email)) {
    return NextResponse.json(
      { success: false, message: "Email domain is blacklisted" },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.emailSend.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    await prisma.emailSend.create({ data: { email } });

    return NextResponse.json({
      success: true,
      message: "Email added successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
