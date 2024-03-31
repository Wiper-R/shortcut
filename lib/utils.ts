import config from "@/config";
import { Prisma, User } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { SignJWT } from "jose";
import { customAlphabet } from "nanoid";
import { cookies } from "next/headers";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeEmail(email: string) {
  return email;
}

export function cleanUser(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export const generateRandomSlug = (length: number = 8) =>
  customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  )(length);

export function getNextPageCursor<T>(
  records: Array<T>,
  cursor: keyof T,
  limit: number,
) {
  if (records.length > limit) {
    return records[records.length - 1][cursor];
  }

  return null;
}


export function getShortenLinksSearchFilter(
  search: string | undefined,
): Prisma.ShortenLinkWhereInput {
  if (search) {
    return {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          slug: {
            contains: search,
            mode: "insensitive",
          },
        },

        {
          destination: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    };
  }
  return {};
}

