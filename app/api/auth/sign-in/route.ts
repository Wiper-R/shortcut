import { normalizeEmail, cleanUser } from "@/lib/utils";
import prisma from "@/prisma";
import { signInSchema } from "@/validators/authValidator";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { errorResponse, successResponse } from "@/app/api/_response";
import config from "@/config";
import { setTokenCookie } from "@/lib/server-utils";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = signInSchema.parse(body);
  const user = await prisma.user.findFirst({
    where: { email: data.email },
  });

  const invalidResponse = errorResponse(
    { message: "Invalid email or password" },
    { status: 400 },
  );

  if (!user) return invalidResponse;

  const passwordMatch = await bcrypt.compare(data.password, user.password);

  if (!passwordMatch) return invalidResponse;

  await setTokenCookie(user.id);
  return successResponse({ user: cleanUser(user) });
}
