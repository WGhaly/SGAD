"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ─── Server-side login (bypasses broken NextAuth API routes) ─────────────────
export async function handleSignIn(
  email: string,
  password: string,
  redirectTo: string = "/admin/dashboard"
) {
  // Prevent open-redirect: only allow paths starting with /admin/
  const safeRedirect = redirectTo.startsWith("/admin/") ? redirectTo : "/admin/dashboard";

  try {
    await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirectTo: safeRedirect,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password. Please try again." };
    }
    throw error; // Re-throw redirect (NEXT_REDIRECT) and other non-auth errors
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
