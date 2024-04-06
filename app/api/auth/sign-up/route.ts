import { NextRequest, NextResponse } from "next/server";
import { APIHandler, CleanUser } from "../../types";
import { parseJson } from "../../utils";
import { z } from "zod";
import status from "http-status";
import { ApiHandler } from "../../api-handler";
import prisma from "@/prisma";
import { hashPassword } from "@/lib/hash-password";
import { setTokenCookie } from "@/lib/server-utils";
import { cleanUser } from "@/lib/utils";

const SignUpSchema = z.object({
  fname: z.string({ required_error: "First name is required" }),
  lname: z.string({ required_error: "Last name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" }), // TODO: Add strict password check
});

type SignUpSchema = z.infer<typeof SignUpSchema>;

const post: APIHandler<CleanUser> = async (request, response) => {
  const data = await parseJson(request, SignUpSchema);
  if (await prisma.user.findFirst({ where: { email: data.email } })) {
    return NextResponse.json(
      { message: "User with same email already exists" },
      { status: status.UNPROCESSABLE_ENTITY },
    );
  }

  const password = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      fname: data.fname,
      lname: data.lname,
      password,
    },
  });

  await setTokenCookie(user.id);
  return NextResponse.json(cleanUser(user), { status: 201 });
};

export const { POST } = ApiHandler({ POST: post });
