import { updateQrCodeSchema } from "@/validators/qrCodeValidator";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/auth/session";
import prisma from "@/prisma";
import errorCodes from "../../error-codes";

type Params = {
  params: { id: string };
};

const findQrCode = async (id: string) =>
  await prisma.qrCode.findFirst({
    where: { id },
    select: { ShortenLink: { select: { userId: true } } },
  });

export async function PATCH(request: NextRequest, { params: { id } }: Params) {
  const json = await request.json();
  const parsed = updateQrCodeSchema.safeParse(json);
  if (!parsed.success) return errorCodes.Unauthorized(parsed.error.message)
  const {data} = parsed;

  const session = await getSession();
  if (!session) return errorCodes.Unauthorized();

  const _existingQrCode = await findQrCode(id);

  if (!_existingQrCode) return errorCodes.NotFound();
  if (_existingQrCode.ShortenLink.userId != session.user.id)
    return errorCodes.Forbidden();

  try {
    var qrCode = await prisma.qrCode.update({
      where: { id },
      data,
    });
  } catch (e) {
    throw e;
  }

  return NextResponse.json(qrCode);
}

export async function DELETE(request: NextRequest, { params: { id } }: Params) {
  const session = await getSession();
  if (!session) return errorCodes.Unauthorized();

  const _existingQrCode = await findQrCode(id);
  if (!_existingQrCode) return errorCodes.NotFound();
  if (_existingQrCode.ShortenLink.userId != session.user.id)
    return errorCodes.Forbidden();

  try {
    await prisma.qrCode.delete({ where: { id } });
  } catch (e) {
    throw e;
  }

  return NextResponse.json(null);
}
