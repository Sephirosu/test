import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(): Promise<Response> {
  try {
    const emails = await prisma.emailSend.findMany({
      orderBy: { email: "asc" },
    });

    return NextResponse.json({ success: true, data: emails });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}
