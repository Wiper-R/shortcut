import { successResponse } from "@/app/api/_response";
import { NextRequest } from "next/server";
import { getSession } from "@/auth/session";
import errorCodes from "../../_error-codes";
import { updateUserSchema } from "@/validators/userValidator";
import prisma from "@/prisma";
import { cleanUser } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getSession();
  if (session) {
    return successResponse({ user: session.user });
  }
  return errorCodes.Unauthorized();
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return errorCodes.Unauthorized();
  }

  const body = await request.json();
  const data = updateUserSchema.parse(body);
  const user = await prisma.user.update({
    where: { id: session.user.id },
    data,
  });

  return successResponse({ user: cleanUser(user) });
}
