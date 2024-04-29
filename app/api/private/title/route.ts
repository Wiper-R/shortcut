import { getTitleFromURL } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import errorCodes from "../../error-codes";

// TODO: Add error codes and all things

const validator = z.object({ url: z.string().url() });

export async function POST(request: NextRequest) {
  const json = await request.json();
  const parsed = validator.safeParse(json);
  if (!parsed.success) return errorCodes.BadRequest(parsed.error.message);
  const d = await getTitleFromURL(json.url);
  return NextResponse.json(d);
}
