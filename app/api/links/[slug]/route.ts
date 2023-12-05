import { NextRequest } from "next/server";
import { successResponse } from "../../_response";
import { updateLinkSchema } from "@/validators/linksValidator";
import prisma from "@/prisma";
import { cleanShortenLink, requiredRecordsNotFound } from "@/lib/utils";
import { getSession } from "@/auth/session";
import errorCodes from "../../_error-codes";

type Params = { params: { slug: string } };

export async function PATCH(request: NextRequest, { params }: Params) {
  const { slug } = params;
  const body = await request.json();
  const data = updateLinkSchema.parse(body);

  const session = await getSession();
  if (!session) return errorCodes.Unauthorized();

  const _existing = await prisma.shortenLink.findFirst({
    where: { slug },
  });

  if (!_existing) return errorCodes.NotFound();
  if (_existing.userId != session.user.id) return errorCodes.Forbidden();

  try {
    var shortenLink = await prisma.shortenLink.update({
      where: { id: _existing.id },
      data,
    });
  } catch (e) {
    return errorCodes.Unknown();
  }
  return successResponse({ shortenLink: cleanShortenLink(shortenLink) });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { slug } = params;
  const session = await getSession();
  if (!session) return errorCodes.Unauthorized();

  const _existingLink = await prisma.shortenLink.findFirst({
    where: { slug },
  });

  if (!_existingLink) return errorCodes.NotFound();
  if (_existingLink.userId != session.user.id) return errorCodes.Forbidden();
  try {
    await prisma.shortenLink.delete({
      where: { id: _existingLink.id },
    });
  } catch (e) {
    return errorCodes.Unknown();
  }
  return successResponse(undefined, { status: 204 });
}
