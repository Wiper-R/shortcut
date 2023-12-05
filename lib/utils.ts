import { Prisma, ShortenLink, User } from "@prisma/client";
import { customAlphabet } from "nanoid";
import bcrypt from "bcrypt";

export function normalizeEmail(email: string) {
  // TODO: Implement cleanEmail
  return email;
}

export function cleanUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
  };
}

export function cleanShortenLink(shortenLink: ShortenLink) {
  const _new = {
    ...shortenLink,
  };

  return _new;
}

export const isUniqueValidationError = (e: unknown) =>
  e instanceof Prisma.PrismaClientKnownRequestError && e.code == "P2002";

export const requiredRecordsNotFound = (e: unknown) =>
  e instanceof Prisma.PrismaClientKnownRequestError && e.code == "P2025";

export const getRandomSlug = (length: number = 8) =>
  customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  )(length);

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);
