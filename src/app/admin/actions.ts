"use server";

import { encode } from "@auth/core/jwt";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

const SESSION_COOKIE =
  process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

const AUTH_SECRET = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "";
const MAX_AGE = 8 * 60 * 60; // 8 hours

// ─── Server-side login (fully manual — bypasses broken NextAuth API routes) ──
export async function handleSignIn(
  email: string,
  password: string,
  redirectTo: string = "/admin/dashboard"
): Promise<{ error?: string; success?: boolean; redirectUrl?: string }> {
  // Prevent open-redirect: only allow paths starting with /admin/
  const safeRedirect = redirectTo.startsWith("/admin/") ? redirectTo : "/admin/dashboard";

  try {
    const trimmedEmail = email.trim().toLowerCase();

    // 1. Look up the user
    const user = await prisma.user.findUnique({ where: { email: trimmedEmail } });
    if (!user) {
      return { error: "Invalid email or password. Please try again." };
    }

    // 2. Verify password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return { error: "Invalid email or password. Please try again." };
    }

    // 3. Build a JWT token compatible with NextAuth's expected shape
    const token = await encode({
      secret: AUTH_SECRET,
      salt: SESSION_COOKIE,
      token: {
        sub: user.id,
        name: user.name,
        email: user.email,
        id: user.id,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + MAX_AGE,
      },
      maxAge: MAX_AGE,
    });

    // 4. Set the session cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: MAX_AGE,
    });

    // 5. Return success — client handles redirect
    return { success: true, redirectUrl: safeRedirect };
  } catch (err) {
    console.error("[handleSignIn] Error:", err);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

// ─── Server-side logout ─────────────────────────────────────────────────────
// Manually clear all auth cookies (NextAuth's signOut has the same
// Next.js 16 incompatibility bug that affects the API routes)
export async function handleSignOut() {
  const cookieStore = await cookies();

  // Clear ALL cookies with "authjs" in the name (handles chunked cookies too)
  const allCookies = cookieStore.getAll();
  for (const cookie of allCookies) {
    if (cookie.name.includes("authjs") || cookie.name.includes("next-auth")) {
      const isSecure =
        cookie.name.startsWith("__Secure-") ||
        cookie.name.startsWith("__Host-");
      cookieStore.set(cookie.name, "", {
        maxAge: 0,
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        ...(isSecure && { secure: true }),
      });
    }
  }

  redirect("/admin/login");
}
