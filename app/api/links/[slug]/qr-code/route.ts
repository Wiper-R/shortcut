import errorCodes from "@/app/api/_error-codes";
import { successResponse } from "@/app/api/_response";
import { getSession } from "@/auth/session";
import { isUniqueValidationError } from "@/lib/db-errors";
import prisma from "@/prisma";
import { createQrCodeSchema } from "@/validators/qrCodeValidator";
import { NextRequest } from "next/server";

type Params = { params: { slug: string } };

export async function POST(request: NextRequest, { params: { slug } }: Params) {
  const body = await request.json();
  const data = createQrCodeSchema.parse(body);

  const session = await getSession();
  if (!session) return errorCodes.Unauthorized();

  const shortenLink = await prisma.shortenLink.findFirst({
    where: { slug },
  });

  if (!shortenLink) return errorCodes.NotFound();

  if (shortenLink.userId != session.user.id) return errorCodes.Forbidden();

  try {
    var qrCode = await prisma.qrCode.create({
      data: { shortenLinkId: shortenLink.id, ...data },
    });
  } catch (e) {
    if (isUniqueValidationError(e)) return errorCodes.Conflict();

    throw e;
  }

  return successResponse({ qrCode }, { status: 201 });
}
