import { Prisma, ShortenLink, User } from "@prisma/client";

export function cleanEmail(email: string) {
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
