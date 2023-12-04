import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import prisma from "@/prisma";
import { cleanUser } from "@/lib/utils";
import { errorResponse, successResponse } from "@/app/api/_response";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = cookies().get("token")?.value;

  const unauthorized = errorResponse(
    { message: "Unauthorized" },
    { status: 401 }
  );

  if (!token) return unauthorized;

  const payload = decodeJwt(token);
  const user = await prisma.user.findFirst({ where: { id: payload.sub } });

  if (!user) return unauthorized;

  return successResponse({ user: cleanUser(user) });
}
