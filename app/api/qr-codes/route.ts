import { getSession } from "@/auth/session";
import prisma from "@/prisma";
import { listQrCodeSchema } from "@/validators/qrCodeValidator";
import { NextRequest, NextResponse } from "next/server";
import { getNextPageCursor, getShortenLinksSearchFilter } from "@/lib/utils";
import errorCodes from "../error-codes";

export async function GET(request: NextRequest) {
  const parsed = listQrCodeSchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );

  if (!parsed.success) {
    return errorCodes.BadRequest(parsed.error.message);
  }

  const { data } = parsed;
  const session = await getSession();
  if (!session) return errorCodes.Unauthorized();

  const qrCodes = await prisma.qrCode.findMany({
    where: {
      ShortenLink: {
        userId: session.user.id,
        ...getShortenLinksSearchFilter(data.search),
      },
    },
    include: {
      ShortenLink: {
        include: {
          _count: { select: { Engagement: { where: { type: "qr" } } } },
        },
      },
    },
    cursor: data.cursor ? { id: data.cursor } : undefined,
    orderBy: { createdAt: "desc" },
    take: data.limit + 1,
  });

  return NextResponse.json({
    entries: qrCodes.slice(0, data.limit),
    nextPage: getNextPageCursor(qrCodes, "id", data.limit),
  });
}
