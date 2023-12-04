import { cleanEmail, cleanUser } from "@/lib/utils";
import prisma from "@/prisma";
import { signInSchema } from "@/validators/authValidator";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { errorResponse, successResponse } from "@/app/api/_response";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("I am here", body)
  const data = signInSchema.parse(body);
  const _cleanEmail = cleanEmail(data.email);
  const user = await prisma.user.findFirst({
    where: { cleanEmail: _cleanEmail },
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
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  return successResponse(
    { user: cleanUser(user) },
    {
      headers: {
        "Set-Cookie": `__shortcut-token=${token}; HttpOnly;`,
      },
    }
  );
}
