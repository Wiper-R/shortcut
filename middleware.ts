import { NextRequest, NextResponse } from "next/server";
import { User } from "@prisma/client";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const sessionId = cookies().get("session-id")?.value;

  const pathname = request.nextUrl.pathname;
  if (["/", "/login", "/sign-up"].includes(pathname) && sessionId) {
    const cbp = request.nextUrl.searchParams.get("cbp") || "/dashboard";
    const url = new URL(cbp, request.url);
    url.searchParams.delete("cbp");
    return NextResponse.redirect(url);
  } else if (pathname.startsWith("/dashboard") && !sessionId) {
    const url = new URL("/login", request.url);
    url.searchParams.append("cbp", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// the following code has been copied from https://nextjs.org/docs/advanced-features/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
