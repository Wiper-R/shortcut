import { getSession } from "@/auth/session";
import { NextRequest, NextResponse } from "next/server";
import { updateUserSchema } from "@/validators/userValidator";
import prisma from "@/prisma";
import { cleanUser } from "@/lib/utils";
import errorCodes from "../../error-codes";

export async function GET() {
  const session = await getSession();
  if (!session) return errorCodes.Unauthorized();
  return NextResponse.json(session.user);
}

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return errorCodes.Unauthorized();
  }

  const json = await request.json();
  const parsed = updateUserSchema.safeParse(json);
  if (!parsed.success) {
    return errorCodes.BadRequest(parsed.error.message);
  }
  const { data } = parsed;

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data,
  });
  return NextResponse.json({ ...cleanUser(user) });
}
