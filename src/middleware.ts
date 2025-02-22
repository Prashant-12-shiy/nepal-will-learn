import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get('nwl-token')?.value;
    const {pathname} = req.nextUrl;

    const authPages = ["/log-in", "/sign-up", "/forgot-password", "/verify-email", pathname.startsWith("/reset-password")];

    if (token && authPages.includes(pathname)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    

      if (!token && pathname.startsWith("/user")) {
        return NextResponse.redirect(new URL("/log-in", req.url));
      }
  

    return NextResponse.next();
}

export const config = {
    matcher: [
      "/user/:path*", // Protect all dashboard routes
      "/reset-password/:path*", 
      "/log-in", 
      "/sign-up", 
      "/forgot-password", 
      "/verify-email", 
    ],
  };