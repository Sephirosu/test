import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const schema = z.object({
  emails: z.array(z.string().email()).min(3, "At least 3 emails required"),
});

export async function POST(req: Request): Promise<Response> {
  const body: unknown = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: parsed.error.errors[0].message },
      { status: 400 }
    );
  }

  const { emails } = parsed.data;

  try {
    for (const email of emails) {
      await prisma.emailSend.upsert({
        where: { email },
        update: { count: { increment: 1 } },
        create: { email, count: 1 },
      });
    }

    const top10 = await prisma.emailSend.findMany({
      orderBy: { count: "desc" },
      take: 10,
    });

    return NextResponse.json({ success: true, data: top10 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
