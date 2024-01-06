import { Prisma, ShortenLink, User } from "@prisma/client";
import { customAlphabet } from "nanoid";

import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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


export function getNextPageCursor<T>(
  records: Array<T>,
  cursor: keyof T,
  limit: number
) {
  if (records.length > limit) {
    return records[records.length - 1][cursor];
  }

  return null;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
