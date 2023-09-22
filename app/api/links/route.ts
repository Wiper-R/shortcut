import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const link = await prisma.link.create({
    data: {
      url: data.url,
      userId: request.headers.get("x-auth-user")!,
      id: data.id || nanoid(8),
    },
  });

  return NextResponse.json(link)
}
