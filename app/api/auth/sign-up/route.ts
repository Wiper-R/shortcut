import { cleanEmail, cleanUser } from "@/lib/utils";
import prisma from "@/prisma";
import { signUpSchema } from "@/validators/authValidator";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "@/app/api/_response";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = signUpSchema.parse(body);
  const _cleanEmail = cleanEmail(data.email);
  if (await prisma.user.findFirst({ where: { email: _cleanEmail } })) {
    return errorResponse(
      { message: "User with same email already exists" },
      { status: 400 }
    );
  }

  const _saltedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      cleanEmail: _cleanEmail,
      email: data.email,
      fullName: data.fullName,
      password: _saltedPassword,
    },
  });

  return successResponse({ user: cleanUser(user) }, { status: 201 });
}
