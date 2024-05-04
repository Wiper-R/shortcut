import { cleanUser } from "@/lib/utils";
import prisma from "@/prisma";
import { signInSchema } from "@/validators/authValidator";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { setTokenCookie } from "@/lib/server-utils";
import { HttpStatusCode } from "axios";
import errorCodes from "../../error-codes";
import { createSession } from "@/auth";

export async function POST(request: NextRequest) {
  const json = await request.json();
  const parsed = signInSchema.safeParse(json);
  if (!parsed.success) {
    return errorCodes.BadRequest(parsed.error.message);
  }
  const { data } = parsed;
  const user = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (!user) return errorCodes.Unauthorized("Invalid email or password");

  const passwordMatch = await bcrypt.compare(data.password, user.password);

  if (!passwordMatch)
    return errorCodes.Unauthorized("Invalid email or password");

  await createSession(user.id);
  return NextResponse.json({ ...cleanUser(user) });
}
