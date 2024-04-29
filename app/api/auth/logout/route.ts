import config from "@/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  cookies().delete(config.TOKEN_COOKIE_KEY);
  return NextResponse.json(null);
}
