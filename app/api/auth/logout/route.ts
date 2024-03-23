import { NextRequest } from "next/server";
import { successResponse } from "@/app/api/_response";
import config from "@/config";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  cookies().delete(config.TOKEN_COOKIE_KEY);
  return successResponse({});
}
