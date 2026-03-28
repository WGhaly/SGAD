import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const SocialIcons = {
  Facebook: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Instagram: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Linkedin: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  ),
};

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Banking & Finance", href: "/projects/banking" },
  { label: "Hotels & Hospitality", href: "/projects/hospitality" },
  { label: "Restaurants & Retail", href: "/projects/restaurants" },
  { label: "Corporate & Commercial", href: "/projects/corporate" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0C] text-white/70">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex mb-6">
              <Image
                src="/sgad-logo.png"
                alt="SGAD — Al Safwa Group for Architecture and Decoration"
                width={140}
                height={65}
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/50 mb-6 max-w-xs">
              Al Safwa Group for Architecture and Decoration &mdash; Egypt&apos;s trusted partner for
              turnkey interior fitouts across banking, hospitality and commercial sectors.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: SocialIcons.Facebook, href: "#", label: "Facebook" },
                { Icon: SocialIcons.Instagram, href: "#", label: "Instagram" },
                { Icon: SocialIcons.Linkedin, href: "#", label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium mb-5">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={15} className="text-[#C9A96E] mt-0.5 shrink-0" />
                <span className="text-sm text-white/50 leading-relaxed">
                  23 Samir Moukhtar Street, Ard Al Golf, Heliopolis, Cairo, Egypt
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={15} className="text-[#C9A96E] mt-0.5 shrink-0" />
                <div className="text-sm text-white/50 space-y-1">
                  <a href="tel:+201050057511" className="block hover:text-white transition-colors">
                    +20 105 005 7511
                  </a>
                  <a href="tel:+201050057544" className="block hover:text-white transition-colors">
                    +20 105 005 7544
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={15} className="text-[#C9A96E] mt-0.5 shrink-0" />
                <a
                  href="mailto:info@sgad.com.eg"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  info@sgad.com.eg
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Al Safwa Group for Architecture and Decoration. All rights reserved.
          </p>
          <p className="text-xs text-white/20">Designed with precision. Built with integrity.</p>
        </div>
      </div>
    </footer>
  );
}
