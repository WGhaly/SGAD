"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleSignOut() {
  const cookieStore = await cookies();

  // Delete all auth-related cookies (JWT strategy — no server-side session to clean up)
  const authCookies = [
    "__Secure-authjs.session-token",
    "authjs.session-token",
    "__Host-authjs.csrf-token",
    "authjs.csrf-token",
  ];
  for (const name of authCookies) {
    cookieStore.delete(name);
  }

  redirect("/admin/login");
}
