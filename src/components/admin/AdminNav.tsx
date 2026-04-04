"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { handleSignOut } from "@/app/admin/actions";
import {
  LayoutDashboard,
  Images,
  PlusCircle,
  LogOut,
  ExternalLink,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: Images },
  { href: "/admin/projects/new", label: "New Project", icon: PlusCircle },
  { href: "/admin/admins", label: "Admin Users", icon: Users },
];

export default function AdminNav({ userName }: { userName?: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col min-h-screen">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <Image
            src="/sgad-logo.png"
            alt="SGAD"
            width={120}
            height={40}
            className="h-8 w-auto brightness-0 invert"
          />
          <span className="text-gray-400 text-xs font-medium">Admin</span>
        </div>
        {userName && (
          <p className="text-gray-500 text-xs mt-1.5 truncate">
            {userName}
          </p>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                active
                  ? "bg-[#C9A84C]/15 text-[#C9A84C] font-medium"
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-800 space-y-1">
        <Link
          href="/gallery"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          View Gallery
        </Link>
        <button
          onClick={() => handleSignOut()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-red-950/40 hover:text-red-400 transition"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
