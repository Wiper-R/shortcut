import _errorCodes from "@/app/api/_error-codes";
import { successResponse } from "@/app/api/_response";
import prisma from "@/prisma";
import { createEngagementSchema } from "@/validators/engagementsValidator";
import { EngagementType } from "@prisma/client";
import { NextRequest } from "next/server";

type Params = {
  params: { slug: string };
};

export async function POST(request: NextRequest, { params: { slug } }: Params) {
  const body = await request.json();
  const data = createEngagementSchema.parse(body);
  const shortenLink = await prisma.shortenLink.findFirst({ where: { slug } });
  if (!shortenLink) return _errorCodes.NotFound();
  try {
    var engagement = await prisma.engagement.create({
      data: {
        shortenLinkId: shortenLink.id,
        type: EngagementType.link,
        ...data,
      },
    });
  } catch (e) {
    throw e;
  }

  return successResponse({ engagement }, { status: 201 });
}
