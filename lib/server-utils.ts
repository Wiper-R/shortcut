import config from "@/config";
import { SignJWT } from "jose";
import moment from "moment";
import { cookies } from "next/headers";

export async function setTokenCookie(userId: string) {
  const expiry = moment().add({ days: 28 });
  const token = await new SignJWT()
    .setSubject(userId)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiry.toDate())
    .sign(new TextEncoder().encode(config.JWT_SECRET));

  cookies().set(config.TOKEN_COOKIE_KEY, token, {
    httpOnly: true,
    sameSite: true,
    expires: expiry.toDate()
  });
}
