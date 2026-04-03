import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const pathname = (await headers()).get("x-pathname") ?? "";

  // Redirect unauthenticated users to login (middleware is primary guard;
  // this layout check is a second layer that catches any edge cases).
  if (!session && pathname !== "/admin/login") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      {children}
    </div>
  );
}
