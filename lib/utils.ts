import { Prisma, User } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";
import * as cheerio from "cheerio";

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

export async function getTitleFromURL(url: string) {
  const controller = new AbortController();

  setTimeout(() => {
    controller.abort();
  }, 3000);

  var res: Response, content: string;

  try {
    res = await fetch(url);
  } catch (e) {
    if (e instanceof TypeError) {
      throw e;
      // TODO: Handle Invalid URL
    }

    return { title: null, url };
  }

  try {
    content = await res.text();
    // console.log(content);
  } catch (e) {
    return { title: null, url };
  }

  const $cheerio = cheerio.load(content);
  const element = $cheerio("title");

  var title: string | null;

  if (element.length != 0) {
    title = element.first().text();
  } else {
    title = null;
  }

  return { title, url: res.url };
}
