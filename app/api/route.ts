import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("You are not authorized 2", {status: HttpStatusCode.Unauthorized, statusText: "You are not authorized"});
}
