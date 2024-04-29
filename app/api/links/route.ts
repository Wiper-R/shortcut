import { isUniqueValidationError } from "@/lib/db-errors";
import prisma from "@/prisma";
import { createLinkSchema, listLinkSchema } from "@/validators/linksValidator";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/auth/session";
import {
  generateRandomSlug,
  getNextPageCursor,
  getShortenLinksSearchFilter,
} from "@/lib/utils";
import errorCodes from "../error-codes";
import { HttpStatusCode } from "axios";

export async function POST(request: NextRequest) {
  const json = await request.json();
  const parsed = createLinkSchema.safeParse(json);

  if (!parsed.success) return errorCodes.BadRequest(parsed.error.message);

  const { data } = parsed;

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
        password: data.password,
        QrCode: data.generateQrCode ? { create: data.qrCode } : undefined,
      },
    });
  } catch (e) {
    if (isUniqueValidationError(e))
      return errorCodes.Conflict("Slug is not available");

    throw e;
  }

  return NextResponse.json(shortenLink, { status: HttpStatusCode.Created });
}

// GET links related to a current user
export async function GET(request: NextRequest) {
  const parsed = listLinkSchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );

  if (!parsed.success) return errorCodes.BadRequest(parsed.error.message);

  const { data } = parsed;

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

  return NextResponse.json({
    entries: shortenLinks.slice(0, data.limit),
    nextPage: getNextPageCursor(shortenLinks, "id", data.limit),
  });
}
