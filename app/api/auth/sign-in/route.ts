import { normalizeEmail, cleanUser } from "@/lib/utils";
import prisma from "@/prisma";
import { signInSchema } from "@/validators/authValidator";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { errorResponse, successResponse } from "@/app/api/_response";
import config from "@/config";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = signInSchema.parse(body);
  const normalizedEmail = normalizeEmail(data.email);
  const user = await prisma.user.findFirst({
    where: { normalizedEmail },
  });

  const invalidResponse = errorResponse(
    { message: "Invalid email or password" },
    { status: 400 }
  );

  if (!user) return invalidResponse;

  const passwordMatch = await bcrypt.compare(data.password, user.password);

  if (!passwordMatch) return invalidResponse;

  const token = await new SignJWT()
    .setSubject(user.id)
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(config.JWT_SECRET));

  return successResponse(
    { user: cleanUser(user) },
    {
      headers: {
        "Set-Cookie": `${config.TOKEN_COOKIE_KEY}=${token}; HttpOnly;`,
      },
    }
  );
}
