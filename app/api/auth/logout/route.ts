import { NextResponse } from "next/server";
import { revokeSession } from "@/auth";
export async function GET() {
  await revokeSession();
  return NextResponse.json(null);
}
