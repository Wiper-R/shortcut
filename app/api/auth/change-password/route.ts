import { getSession } from "@/auth/session";
import prisma from "@/prisma";
import { changePasswordSchema } from "@/validators/authValidator";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { hashPassword } from "@/lib/hash-password";
import { cleanUser } from "@/lib/utils";
import { HttpStatusCode } from "axios";
import errorCodes from "../../error-codes";

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const parsed = changePasswordSchema.safeParse(body);
  if (!parsed.success) {
    return errorCodes.BadRequest(parsed.error.message);
  }
  const { data } = parsed;
  const session = await getSession();
  if (!session) return errorCodes.Unauthorized();
  var user = await prisma.user.findFirst({ where: { id: session.user.id } });
  if (!user) return errorCodes.Unauthorized();

  const match = await bcrypt.compare(data.old, user.password);
  if (!match) return errorCodes.Unauthorized();

  const _updated = await prisma.user.update({
    where: { id: user.id },
    data: { password: await hashPassword(data.new) },
  });

  return NextResponse.json({ ...cleanUser(_updated) });
}
