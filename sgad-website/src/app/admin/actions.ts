"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

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

// ─── Server-side logout (bypasses broken NextAuth API routes) ────────────────
export async function handleSignOut() {
  await signOut({ redirectTo: "/admin/login" });
}
