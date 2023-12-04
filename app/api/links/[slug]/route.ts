import { NextRequest } from "next/server";
import { successResponse } from "../../_response";
import { editLinkSchema } from "@/validators/linksValidator";
import prisma from "@/prisma";
import { cleanShortenLink } from "@/lib/utils";

type Params = { params: { slug: string } };

// TODO: Add exception handling
// TODO: Add ownership check

export async function PATCH(request: NextRequest, { params }: Params) {
  const { slug } = params;
  const body = await request.json();
  const data = editLinkSchema.parse(body);
  const shortenLink = await prisma.shortenLink.update({
    where: { slug },
    data,
  });
  return successResponse({ shortenLink: cleanShortenLink(shortenLink) });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { slug } = params;
  const shortenLink = await prisma.shortenLink.delete({ where: { slug } });
  return successResponse(
    { shortenLink: cleanShortenLink(shortenLink) },
    { status: 202 }
  );
}
