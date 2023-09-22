import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { Prisma } from "@prisma/client";
import { SignUp_POST } from "@/validators";
import { ValidationError } from "joi";

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const result = await SignUp_POST.validateAsync(data);
  } catch (e) {
    if (e instanceof ValidationError) {
      console.log(e);
    }
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: data.password,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code == "P2002") {
        return NextResponse.json(
          { message: "User already exists!" },
          { status: 422 }
        );
      }
      return NextResponse.json({ message: e.message }, { status: 500 });
    }
  }

  return NextResponse.json(
    { message: "Something went wrong." },
    { status: 500 }
  );
}
