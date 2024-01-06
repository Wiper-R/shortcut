import { normalizeEmail, cleanUser } from "@/lib/utils";
import { hashPassword } from "@/lib/hash-password";
import prisma from "@/prisma";
import { signUpSchema } from "@/validators/authValidator";
import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/app/api/_response";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = signUpSchema.parse(body);
  const normalizedEmail = normalizeEmail(data.email);
  if (await prisma.user.findFirst({ where: { email: normalizedEmail } })) {
    return errorResponse(
      { message: "User with same email already exists" },
      { status: 400 },
    );
  }

  const password = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      fullName: data.fullName,
      normalizedEmail,
      password,
    },
  });

  return successResponse({ user: cleanUser(user) }, { status: 201 });
}
