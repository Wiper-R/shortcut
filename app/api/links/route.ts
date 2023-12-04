import { cleanShortenLink, isUniqueValidationError } from "@/lib/utils";
import prisma from "@/prisma";
import { createLinkSchema } from "@/validators/linksValidator";
import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "../_response";
import { getSession } from "@/auth/session";

// NOTE: Maybe use a shared unauthorized error?

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = createLinkSchema.parse(body);

  const session = await getSession();

  if (!session)
    return errorResponse({ message: "Unauthorized" }, { status: 401 });

  try {
    var shortenLink = await prisma.shortenLink.create({
      data: { ...data, userId: session.user.id },
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
  const session = await getSession();

  if (!session)
    return errorResponse({ message: "Unauthorized" }, { status: 401 });

  const shortenLinks = await prisma.shortenLink.findMany({
    where: { userId: session.user.id },
  });

  return successResponse({
    shortenLinks: shortenLinks.map((sl) => cleanShortenLink(sl)),
  });
}
