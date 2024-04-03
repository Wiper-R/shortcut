import { getTitleFromURL } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

// TODO: Add error codes and all things

export async function POST(request: NextRequest) {
  const json = await request.json();
  const d = await getTitleFromURL(json.url);
  return NextResponse.json(d);
}
