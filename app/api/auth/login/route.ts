import { NextResponse, NextRequest } from "next/server";
import { SignJWT } from "jose";
import prisma from "@/db";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: data.email_or_username },
        { username: data.email_or_username },
      ],
      password: data.password,
    },
  });

  if (user === null) {
    return NextResponse.json(
      {
        message: "Invalid email/username or password.",
      },
      { status: 401 }
    );
  }
  const secret = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY);
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(user.id)
    .sign(secret);
  const response = NextResponse.json({});
  response.cookies.set("token", token, { httpOnly: true });
  return response;
}
