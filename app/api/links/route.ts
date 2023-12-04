import { cleanShortenLink, isUniqueValidationError } from "@/lib/utils";
import prisma from "@/prisma";
import { createLinkSchema } from "@/validators/linksValidator";
import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "../_response";

// FIXME: Use current user id instead of hardcoding

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = createLinkSchema.parse(body);

  try {
    var shortenLink = await prisma.shortenLink.create({
      data: { ...data, userId: "656c7b32af61b65258fe9fd0" },
    });
  } catch (e) {
    if (isUniqueValidationError(e))
      return errorResponse({ message: "Slug is not available" });

    return errorResponse({ message: "Something went wrong" });
  }

  return successResponse(
    { shortenLink: cleanShortenLink(shortenLink) },
    { status: 201 }
  );
}

// GET links related to a current user
export async function GET() {
  const shortenLinks = await prisma.shortenLink.findMany({
    where: { userId: "656c7b32af61b65258fe9fd0" },
  });

  return successResponse({
    shortenLinks: shortenLinks.map((sl) => cleanShortenLink(sl)),
  });
}
