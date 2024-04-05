import { isUniqueValidationError } from "@/lib/db-errors";
import prisma from "@/prisma";
import { createLinkSchema, listLinkSchema } from "@/validators/linksValidator";
import { NextRequest } from "next/server";
import { successResponse } from "../_response";
import { getSession } from "@/auth/session";
import errorCodes from "../_error-codes";
import {
  generateRandomSlug,
  getNextPageCursor,
  getShortenLinksSearchFilter,
} from "@/lib/utils";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = createLinkSchema.parse(body);

  const slug = data.slug || generateRandomSlug();

  if (await prisma.shortenLink.findFirst({ where: { slug } })) {
    return errorCodes.BadRequest("This back half is not available.");
  }

  const session = await getSession();
  if (!session) return errorCodes.Unauthorized();

  try {
    var shortenLink = await prisma.shortenLink.create({
      data: {
        slug,
        destination: data.destination,
        url: data.url || data.destination,
        userId: session.user.id,
        title: data.title,
        QrCode: data.generateQrCode ? { create: data.qrCode } : undefined,
      },
    });
  } catch (e) {
    if (isUniqueValidationError(e))
      return errorCodes.Conflict("Slug is not available");

    throw e;
  }

  return successResponse({ shortenLink }, { status: 201 });
}

// GET links related to a current user
export async function GET(request: NextRequest) {
  const data = listLinkSchema.parse(
    Object.fromEntries(request.nextUrl.searchParams),
  );

  const session = await getSession();
  if (!session) return errorCodes.Unauthorized();

  const shortenLinks = await prisma.shortenLink.findMany({
    where: {
      userId: session.user.id,
      ...getShortenLinksSearchFilter(data.search),
    },
    cursor: data.cursor ? { id: data.cursor } : undefined,
    orderBy: { createdAt: "desc" },
    take: data.limit + 1,
    include: {
      _count: { select: { Engagement: { where: { type: "link" } } } },
    },
  });

  return successResponse({
    shortenLinks: shortenLinks.slice(0, data.limit),
    nextPage: getNextPageCursor(shortenLinks, "id", data.limit),
  });
}
