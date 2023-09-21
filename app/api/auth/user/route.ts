import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value as string;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return NextResponse.json(user);
}
