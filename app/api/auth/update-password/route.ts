import { getSession } from "@/auth/session";
import prisma from "@/prisma";
import { updatePasswordSchema } from "@/validators/authValidator";
import { NextRequest } from "next/server";
import errorCodes from "../../_error-codes";
import bcrypt from "bcrypt";
import { hashPassword } from "@/lib/hash-password";
import { successResponse } from "../../_response";
import { cleanUser } from "@/lib/utils";

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const data = updatePasswordSchema.parse(body);
  const session = await getSession();
  if (!session) return errorCodes.Unauthorized();
  var user = await prisma.user.findFirst({ where: { id: session.user.id } });
  if (!user) return errorCodes.Unauthorized();

  const match = await bcrypt.compare(data.old, user.password);
  if (!match) return errorCodes.Unauthorized();
  user = await prisma.user.update({
    where: { id: user.id },
    data: { password: await hashPassword(data.new) },
  });

  return successResponse({ user: cleanUser(user) });
}
