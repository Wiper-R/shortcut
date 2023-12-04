import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import prisma from "@/prisma";
import { cleanUser } from "@/lib/utils";
import { errorResponse, successResponse } from "@/app/api/_response";
import { NextRequest } from "next/server";
import config from "@/config";
import { getSession } from "@/auth/session";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (session) {
    return successResponse({ user: session.user });
  }
  return errorResponse({ message: "Unauthorized" }, { status: 401 });
}
