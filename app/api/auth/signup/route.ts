import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  try {
    const user = await prisma.user.create({
      data: {
        email: data.get("email") as string,
        username: data.get("username") as string,
        password: data.get("password") as string,
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
