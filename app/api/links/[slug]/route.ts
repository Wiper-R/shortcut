import { NextRequest, NextResponse } from "next/server";
import { updateLinkSchema } from "@/validators/linksValidator";
import prisma from "@/prisma";
import { getSession } from "@/auth/session";
import errorCodes from "../../error-codes";

type Params = { params: { slug: string } };

export async function PATCH(request: NextRequest, { params }: Params) {
  const { slug } = params;
  const json = await request.json();
  const parsed = updateLinkSchema.safeParse(json);

  if (!parsed.success) {
    return errorCodes.BadRequest(parsed.error.message)
  }

  const {data} = parsed;

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
    throw e;
  }
  return NextResponse.json(shortenLink);
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
      where: { id: _existingLink.id }
    });
  } catch (e) {
    throw e;
  }
  return NextResponse.json(null);
}
