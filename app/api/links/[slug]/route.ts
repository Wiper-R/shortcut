import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "../../_response";
import { editLinkSchema } from "@/validators/linksValidator";
import prisma from "@/prisma";
import { cleanShortenLink } from "@/lib/utils";
import { getSession } from "@/auth/session";
import { unauthorized } from "../../_error-codes";

type Params = { params: { slug: string } };

// TODO: Add exception handling

export async function PATCH(request: NextRequest, { params }: Params) {
  const { slug } = params;
  const body = await request.json();
  const data = editLinkSchema.parse(body);
  const check = await prisma.shortenLink.findFirst({ where: { slug } });

  const session = await getSession();
  if (!session) return unauthorized();

  if (!check)
    return errorResponse({ message: "Link not found" }, { status: 404 });

  const shortenLink = await prisma.shortenLink.update({
    where: { slug, userId: session.user.id },
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
