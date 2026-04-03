"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleSignOut() {
  const cookieStore = await cookies();

  // Delete all auth-related cookies (JWT strategy — no server-side session to clean up)
  // Must match the original cookie options (path, secure, sameSite) for the browser to clear them
  const secureCookies = [
    "__Secure-authjs.session-token",
  ];
  const hostCookies = [
    "__Host-authjs.csrf-token",
  ];
  const plainCookies = [
    "authjs.session-token",
    "authjs.csrf-token",
    "authjs.callback-url",
  ];

  for (const name of secureCookies) {
    cookieStore.set(name, "", {
      maxAge: 0,
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    });
  }

  for (const name of hostCookies) {
    cookieStore.set(name, "", {
      maxAge: 0,
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    });
  }

  for (const name of plainCookies) {
    cookieStore.set(name, "", {
      maxAge: 0,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
  }

  redirect("/admin/login");
}
