import { errorResponse, successResponse } from "@/app/api/_response";
import { NextRequest } from "next/server";
import { z } from "zod";
import errorCodes from "@/app/api/_error-codes";
import prisma from "@/prisma";

type Params = {
  params: { slug: string };
};

export async function POST(request: NextRequest, { params }: Params) {
  const json = await request.json();
  const data = z.object({ password: z.string(), isQR: z.boolean() }).safeParse(json);
  const { slug } = params;
  const link = await prisma.shortenLink.findFirst({ where: { slug } });
  if (!link) return errorCodes.NotFound();
  if (!link.password)
    return errorCodes.BadRequest("This link is not password protected");

  if (data.success) {
    if (data.data.password == link.password) {
      await prisma.engagement.create({
        data: { type: data.data.isQR ? "qr" : "link", shortenLinkId: link.id },
      });
      return successResponse(true);
    }
  }

  return errorCodes.Unauthorized();
}
