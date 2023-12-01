import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/prisma";
import { TSession } from "./context";


export const dynamic = "force-dynamic";

const getSession = async (): Promise<TSession> => {
  const token = cookies().get("token");
  const session = await verifySession(token?.value || "");
  if (!session?.payload.sub) return null;
  const user = await prisma.user.findFirst({
    where: { id: session.payload.sub },
  });
  if (!user) return null;
  // NOTE: Verify token in database
  return { user };
};

const verifySession = async (token: string) => {
  if (!token) return null;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  return await jwtVerify(token, secret);
};

export { getSession, verifySession };
