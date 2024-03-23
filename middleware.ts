import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./auth/session";
import cnf from "./config";

export async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.append("x-pathname", request.nextUrl.pathname);

  const token = request.cookies.get(cnf.TOKEN_COOKIE_KEY);
  const pathname = request.nextUrl.pathname;
  const session = await verifySession(token?.value || "");

  const sub = session?.payload.sub;
  if (["/", "/login", "/sign-up"].includes(pathname) && sub) {
    const url = request.nextUrl.clone();
    // Callback Path
    const cbp = url.searchParams.get("cbp") || "/dashboard";
    url.pathname = cbp;
    url.searchParams.delete("cbp");
    return NextResponse.redirect(url, { headers });
  } else if (pathname.startsWith("/dashboard") && !sub) {
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
