import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { nanoid } from "nanoid";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { load as loadCheerio } from "cheerio";

async function getTitle(url: string) {
  try {
    const resp = await fetch(url);
    const html = await resp.text();
    const cheerio = loadCheerio(html);
    return cheerio("title").text();
  } catch (e) {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const title = await getTitle(data.url);

  try {
    const link = await prisma.link.create({
      data: {
        url: data.url,
        userId: request.headers.get("x-auth-user")!,
        id: data.subpath || nanoid(8),
        title,
      },
    });

    return NextResponse.json(link, { status: 201 });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code == "P2002") {
        return NextResponse.json(
          { message: `Sub path '${data.subpath}' not available.` },
          { status: 422 }
        );
      }
    }
  }
}

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-auth-user")!;
  const links = await prisma.link.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(links);
}
