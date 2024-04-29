import errorCodes from "@/app/api/error-codes";
import { getSession } from "@/auth/session";
import { isUniqueValidationError } from "@/lib/db-errors";
import prisma from "@/prisma";
import { createQrCodeSchema } from "@/validators/qrCodeValidator";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

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
    if (isUniqueValidationError(e))
      return errorCodes.Conflict("QR code already exists");

    throw e;
  }

  return NextResponse.json(qrCode, { status: HttpStatusCode.Created });
}
