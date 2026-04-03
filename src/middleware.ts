import { NextRequest, NextResponse } from "next/server";

// ─── Simple in-memory rate limiter for auth endpoints ─────────────────────────
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > MAX_ATTEMPTS;
}

// Cookie name matches what's configured in auth.ts
const SESSION_COOKIE =
  process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Rate limit login POST requests ─────────────────────────────────────────
  if (pathname.startsWith("/api/auth") && req.method === "POST") {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";
    if (isRateLimited(ip)) {
      return new NextResponse(
        JSON.stringify({ error: "Too many login attempts. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", "Retry-After": "900" } }
      );
    }
  }

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  // Check for the JWT session cookie directly — the auth() wrapper from
  // NextAuth v5 beta.30 is unreliable on Next.js 16 (returns non-null empty
  // sessions even with no cookie, and causes build failures).
  const hasSessionCookie = !!req.cookies.get(SESSION_COOKIE)?.value;

  if (isAdminRoute && !isLoginPage && !hasSessionCookie) {
    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && hasSessionCookie) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl.origin));
  }

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*", "/((?!_next|favicon|uploads|portfolio).*)"],
};
