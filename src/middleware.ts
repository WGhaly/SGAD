import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = req.nextUrl.pathname === "/admin/login";
  const isAuthenticated = !!req.auth;

  if (isAdminRoute && !isLoginPage && !isAuthenticated) {
    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl.origin));
  }

  const response = NextResponse.next();
  response.headers.set("x-pathname", req.nextUrl.pathname);
  return response;
});

export const config = {
  matcher: ["/admin/:path*", "/((?!_next|favicon|api|uploads|portfolio).*))"],
};
