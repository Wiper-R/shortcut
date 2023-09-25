import { NextRequest, NextResponse, NextMiddleware } from "next/server";
import { jwtVerify } from "jose";


const skipAuthorizationCheck = ["/api/auth/login", "/api/auth/signup"];

export async function middleware(request: NextRequest) {
  if (
    skipAuthorizationCheck.some((v) => request.nextUrl.pathname.startsWith(v))
  )
    return NextResponse.next();

  const token = request.cookies.get("token")?.value;
  if (token != null) {
    const secret = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY);
    try {
      const verify = await jwtVerify(token, secret);
      return NextResponse.next({
        headers: { "x-auth-user": verify.payload.sub! },
      });
    } catch (e) {
      return new NextResponse("", { status: 401 });
    }
  } else {
    return new NextResponse("", { status: 401 });
  }
}

export const config = {
  matcher: "/api/:path+",
};
