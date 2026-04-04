"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { clients } from "@/lib/data";
import type { ProjectCategory } from "@/lib/data";
import SectionReveal from "@/components/SectionReveal";

const sectors: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "banking", label: "Banking & Finance" },
  { id: "hospitality", label: "Hospitality" },
  { id: "restaurants", label: "Restaurants" },
];

export default function ClientsSection() {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");

  const filtered =
    active === "all" ? clients : clients.filter((c) => c.sector === active);

  return (
    <section className="section-py bg-[#F0EDE7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <SectionReveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow mb-3">Trusted By</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#1A1F35] gold-line">
              Our Clients
            </h2>
          </div>
          <Link
            href="/clients"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-[#1A1F35] border-b border-[#1A1F35]/30 pb-0.5 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors self-start lg:self-auto"
          >
            View All Clients <ArrowUpRight size={13} />
          </Link>
        </SectionReveal>

        {/* Tabs */}
        <SectionReveal delay={0.1}>
          <div className="flex flex-wrap gap-0 mb-12 border-b border-[#1A1F35]/10">
            {sectors.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`px-5 py-3 text-[11px] tracking-[0.15em] uppercase font-medium transition-all border-b-2 -mb-px ${
                  active === s.id
                    ? "border-[#C9A96E] text-[#1A1F35]"
                    : "border-transparent text-[#1A1F35]/50 hover:text-[#1A1F35]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-[#1A1F35]/10">
          {filtered.map((client, i) => (
            <SectionReveal key={`${client.name}-${active}`} delay={i * 0.04} direction="none">
              <div className="bg-[#F0EDE7] h-28 flex items-center justify-center px-6 hover:bg-white transition-colors group">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={160}
                  height={80}
                  className="object-contain max-h-16 w-auto opacity-60 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
