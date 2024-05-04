import { cleanUser } from "@/lib/utils";
import { hashPassword } from "@/lib/hash-password";
import prisma from "@/prisma";
import { signUpSchema } from "@/validators/authValidator";
import { NextRequest, NextResponse } from "next/server";
import { setTokenCookie } from "@/lib/server-utils";
import { HttpStatusCode } from "axios";
import errorCodes from "../../error-codes";
import { createSession } from "@/auth";

export async function POST(request: NextRequest) {
  const json = await request.json();
  const parsed = signUpSchema.safeParse(json);
  if (!parsed.success) {
    return errorCodes.BadRequest(parsed.error.message);
  }

  const { data } = parsed;

  const _user = await prisma.user.findFirst({ where: { email: data.email } });

  if (_user) {
    return errorCodes.Conflict("User already exists");
  }

  const password = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password,
    },
  });

  await createSession(user.id);
  return NextResponse.json(
    { ...cleanUser(user) },
    { status: HttpStatusCode.Created },
  );
}
