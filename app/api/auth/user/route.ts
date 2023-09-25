import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-auth-user")!;
  if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) return NextResponse.json(user);
  }
  return NextResponse.json({}, { status: 401 });
}
