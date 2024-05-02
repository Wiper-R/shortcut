import { NextRequest, NextResponse } from "next/server";
import { User } from "@prisma/client";

export async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.append("x-pathname", request.nextUrl.pathname);
  var user: User | null = null;
  try {
    const url = new URL("/api/auth/user", request.nextUrl.origin);
    const req = await fetch(url, {
      headers: request.headers,
    });
    if (req.ok) {
      user = await req.json();
    }
  } catch (e) {
    console.error(e);
  }

  const pathname = request.nextUrl.pathname;
  if (["/", "/login", "/sign-up"].includes(pathname) && user) {
    const url = request.nextUrl.clone();
    // Callback Path
    const cbp = url.searchParams.get("cbp") || "/dashboard";
    url.pathname = cbp;
    url.searchParams.delete("cbp");
    return NextResponse.redirect(url, { headers });
  } else if (pathname.startsWith("/dashboard") && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.append("cbp", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

// the following code has been copied from https://nextjs.org/docs/advanced-features/middleware#matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
  unstable_allowDynamic: ["/node_modules/@prisma/**"],
};
