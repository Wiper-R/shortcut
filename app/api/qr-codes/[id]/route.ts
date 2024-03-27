import { updateQrCodeSchema } from "@/validators/qrCodeValidator";
import { NextRequest } from "next/server";
import _errorCodes from "../../_error-codes";
import { getSession } from "@/auth/session";
import prisma from "@/prisma";
import { successResponse } from "../../_response";

type Params = {
  params: { id: string };
};

const findQrCode = async (id: string) =>
  await prisma.qrCode.findFirst({
    where: { id },
    select: { ShortenLink: { select: { userId: true } } },
  });

export async function PATCH(request: NextRequest, { params: { id } }: Params) {
  const body = await request.json();
  const data = updateQrCodeSchema.parse(body);

  const session = await getSession();
  if (!session) return _errorCodes.Unauthorized();

  const _existingQrCode = await findQrCode(id);

  if (!_existingQrCode) return _errorCodes.NotFound();
  if (_existingQrCode.ShortenLink.userId != session.user.id)
    return _errorCodes.Forbidden();

  try {
    var qrCode = await prisma.qrCode.update({
      where: { id },
      data,
    });
  } catch (e) {
    throw e;
  }

  return successResponse({ qrCode }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params: { id } }: Params) {
  const session = await getSession();
  if (!session) return _errorCodes.Unauthorized();

  const _existingQrCode = await findQrCode(id);
  if (!_existingQrCode) return _errorCodes.NotFound();
  if (_existingQrCode.ShortenLink.userId != session.user.id)
    return _errorCodes.Forbidden();

  try {
    await prisma.qrCode.delete({ where: { id } });
  } catch (e) {
    throw e;
  }

  return successResponse(undefined, { status: 200 });
}
