import { getSession } from "@/auth/session";
import prisma from "@/prisma";
import { listQrCodeSchema } from "@/validators/qrCodeValidator";
import { NextRequest } from "next/server";
import _errorCodes from "../_error-codes";
import { successResponse } from "../_response";
import { getNextPageCursor, getShortenLinksSearchFilter } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const data = listQrCodeSchema.parse(
    Object.fromEntries(request.nextUrl.searchParams),
  );
  const session = await getSession();
  if (!session) return _errorCodes.Unauthorized();

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

  return successResponse({
    qrCodes: qrCodes.slice(0, data.limit),
    nextPage: getNextPageCursor(qrCodes, "id", data.limit),
  });
}
