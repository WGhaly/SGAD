"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "All Projects", href: "/projects" },
      { label: "Banking & Finance", href: "/projects/banking" },
      { label: "Hotels & Hospitality", href: "/projects/hospitality" },
      { label: "Restaurants & Retail", href: "/projects/restaurants" },
      { label: "Corporate & Commercial", href: "/projects/corporate" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On non-home pages, always show solid navbar
  const solid = scrolled || !isHome || mobileOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        solid ? "bg-[#111118]/95 backdrop-blur-sm shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/sgad-logo.png"
            alt="SGAD — Al Safwa Group for Architecture and Decoration"
            width={120}
            height={56}
            className="h-14 w-auto object-contain brightness-0 invert"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <li
                key={link.label}
                className="relative group"
                onMouseEnter={() => setProjectsOpen(true)}
                onMouseLeave={() => setProjectsOpen(false)}
              >
                <button className={`flex items-center gap-1 text-sm tracking-wide transition-colors ${
                  pathname.startsWith("/projects")
                    ? "text-[#C9A96E]"
                    : "text-white/80 hover:text-white"
                }`}>
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${projectsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {/* Dropdown */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 ${
                    projectsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <div className="bg-[#111118] border border-white/10 rounded-sm min-w-[220px] py-2 shadow-2xl">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-5 py-2.5 text-sm transition-colors ${
                          pathname === child.href
                            ? "text-[#C9A96E]"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`text-sm tracking-wide transition-colors ${
                    pathname === link.href
                      ? "text-[#C9A96E]"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-[#C9A96E] border border-[#C9A96E]/50 px-4 py-2 hover:bg-[#C9A96E] hover:text-[#111118] transition-all duration-300"
          >
            Start a Project
          </Link>
          <button
            className="lg:hidden text-white p-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden bg-[#111118] border-t border-white/10 overflow-hidden transition-all duration-400 ${
          mobileOpen ? "max-h-[100vh] pb-8" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 pt-4 gap-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.children ? (
                <div>
                  <p className="text-[11px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium pt-4 pb-1">
                    {link.label}
                  </p>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm text-white/70 hover:text-white pl-3 border-l border-white/10"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 text-base border-b border-white/5 transition-colors ${
                    pathname === link.href ? "text-[#C9A96E]" : "text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          <li className="pt-4">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-center text-[11px] tracking-[0.2em] uppercase font-medium text-[#C9A96E] border border-[#C9A96E]/50 px-4 py-3"
            >
              Start a Project
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
