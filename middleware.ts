import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  // Authentication middleware
  if (
    !request.url.endsWith("/api/auth/login") ||
    !request.url.endsWith("/api/auth/signup")
  ) {
    const token = request.cookies.get("token")?.value;
    if (token != null) {
      const secret = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY);
      try {
        const verify = await jwtVerify(token, secret);
      } catch (e) {
        return new NextResponse("", { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path+",
};
