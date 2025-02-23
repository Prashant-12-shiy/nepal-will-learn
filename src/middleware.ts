import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("nwl-token")?.value;
  const adminToken = req.cookies.get("nwl-admin-token")?.value;
  const { pathname } = req.nextUrl;

  const authPages = [
    "/log-in",
    "/sign-up",
    "/forgot-password",
    "/verify-email",
    pathname.startsWith("/reset-password"),
  ];

  if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/admin")) {
    if (!adminToken) {
      // Redirect to admin login if no admin token is found
      return NextResponse.redirect(new URL("/", req.url));
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    "/reset-password/:path*",
    "/log-in",
    "/sign-up",
    "/forgot-password",
    "/verify-email",
    "/admin/:path*",
  ],
};
