import { cookies } from "next/headers";
import { ServerSession } from "./types";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

async function getSession(): Promise<ServerSession> {
  const sessionId = cookies().get("session-id")?.value;
  if (!sessionId) return null;
  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { User: true },
    });

    // Invalid session
    if (!session) return null;
    return { user: session.User };
  } catch (error) {
    console.error("Error retrieving session:", error);
    return null;
  }
}

function generateRandomSessionId() {
  return crypto.randomBytes(32).toString("hex");
}

async function generateUniqueSessionId(): Promise<string> {
  let sessionId;
  do {
    sessionId = generateRandomSessionId();
  } while (!(await isSessionIdUnique(sessionId)));
  return sessionId;
}

async function isSessionIdUnique(sessionId: string): Promise<boolean> {
  try {
    const existingSession = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    return !existingSession;
  } catch (error) {
    console.error("Error checking session ID uniqueness:", error);
    return false;
  }
}

async function createSession(userId: string) {
  const sessionId = await generateUniqueSessionId();
  try {
    await prisma.session.create({
      data: { userId, id: sessionId },
      include: { User: true },
    });

    // Add Token Validation
    cookies().set("session-id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  } catch (error) {
    console.error("Error creating session:", error);
  }
}

async function revokeSession() {
  const sessionId = cookies().get("session-id")?.value;
  if (sessionId) {
    // Server-Side Revocation
    await prisma.session.delete({ where: { id: sessionId } });

    // Client-Side Revocation
    cookies().delete("session-id");
  }
}

export { getSession, createSession, revokeSession };
