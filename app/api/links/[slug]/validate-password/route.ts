import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma";
import errorCodes from "@/app/api/error-codes";
import { validatePasswordSchema } from "@/validators/linksValidator";

type Params = {
  params: { slug: string };
};

export async function POST(request: NextRequest, { params }: Params) {
  const json = await request.json();
  const parsed = validatePasswordSchema.safeParse(json);
  if (!parsed.success) {
    return errorCodes.BadRequest(parsed.error.message);
  }
  const { data } = parsed;
  const { slug } = params;
  const link = await prisma.shortenLink.findFirst({ where: { slug } });
  if (!link) return errorCodes.NotFound();
  if (!link.password)
    return errorCodes.BadRequest("This link is not password protected");

  if (data.password == link.password) {
    return NextResponse.json(true);
  }

  return errorCodes.Unauthorized();
}
