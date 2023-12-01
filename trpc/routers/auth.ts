import SignUpSchema, { SignUpSchemaType } from "@/lib/validation/SignUp";
import { publicProcedure, router } from "../trpc";
import prisma from "@/prisma";
import { ZodError, ZodIssue } from "zod";
import { TRPCError } from "@trpc/server";
import SignInSchema from "@/lib/validation/SignIn";
import { SignJWT } from "jose";
import { cookies, headers } from "next/headers";
import { getSession } from "@/auth/session";
import privateProcedure from "../procedures/privateProcedure";

const authRouter = router({
  signUp: publicProcedure.input(SignUpSchema).mutation(async (opts) => {
    const { input } = opts;
    const userCheck = await prisma.user.findFirst({
      where: { OR: [{ email: input.email }, { username: input.username }] },
    });

    if (userCheck) {
      const issues: ZodIssue[] = [];
      if (userCheck.username === input.username) {
        issues.push({
          path: ["username"],
          code: "custom",
          message: "Username already taken",
        });
      }

      if (userCheck.email === input.email) {
        issues.push({
          path: ["email"],
          code: "custom",
          message: "User with this email already exists",
        });
      }

      const cause = new ZodError<SignUpSchemaType>(issues);

      throw new TRPCError({
        code: "CONFLICT",
        cause,
      });
    }

    return await prisma.user.create({ data: input });
  }),

  signIn: publicProcedure.input(SignInSchema).mutation(async (opts) => {
    const { input } = opts;
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: input.username }, { username: input.username }],
        password: input.password,
      },
    });

    if (!user)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid username or password",
      });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT({})
      .setSubject(user.id)
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    cookies().set("token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    return user;
  }),

  signOut: publicProcedure.query(async (opts) => {
    cookies().set("token", "", { httpOnly: true, secure: true, maxAge: 0 });
    return null;
  }),

  user: publicProcedure.query(async (opts) => {
    const session = await getSession();
    if (!session?.user) throw new TRPCError({ code: "UNAUTHORIZED" });
    return session.user;
  }),
});

export default authRouter;
 