import config from "@/config";
import { Prisma } from "@prisma/client";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function setTokenCookie(userId: string) {
  const token = await new SignJWT()
    .setSubject(userId)
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(config.JWT_SECRET));

  cookies().set(config.TOKEN_COOKIE_KEY, token, { httpOnly: true });
}

