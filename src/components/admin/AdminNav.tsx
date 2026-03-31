"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderOpen, PlusCircle, LogOut, Images } from "lucide-react";
import { handleSignOut } from "@/app/admin/actions";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/projects/new", label: "New Project", icon: PlusCircle },
  { href: "/gallery", label: "View Gallery", icon: Images },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <div className="p-6 border-b border-zinc-800">
        <span className="text-xl font-bold text-white tracking-wide">SGAD Admin</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === href
                ? "bg-amber-500 text-black"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-zinc-800">
        <form action={handleSignOut}>
          <button
            type="submit"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors w-full"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
