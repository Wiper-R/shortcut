import { successResponse } from "@/app/api/_response";
import { NextRequest } from "next/server";
import { getSession } from "@/auth/session";
import errorCodes from "../../_error-codes";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (session) {
    return successResponse({ user: session.user });
  }
  return errorCodes.Unauthorized();
}
