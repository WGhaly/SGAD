import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import SectionReveal from "@/components/SectionReveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Al Safwa Group for Architecture and Decoration (SGAD) — call or email our Heliopolis office directly.",
};

const channels = [
  {
    icon: Phone,
    label: "Call Us",
    lines: [
      { display: "+20 105 005 7511", href: "tel:+201050057511" },
      { display: "+20 105 005 7544", href: "tel:+201050057544" },
    ],
    note: "Sunday – Thursday · 9 AM – 5 PM",
  },
  {
    icon: Mail,
    label: "Email",
    lines: [{ display: "info@sgad.com.eg", href: "mailto:info@sgad.com.eg" }],
    note: "We respond within one business day",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    lines: [
      { display: "23 Samir Moukhtar Street", href: null },
      { display: "Ard Al Golf, Heliopolis, Cairo", href: null },
    ],
    note: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ─── Hero ───────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[520px] bg-[#0A0A0C] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=2000&q=80"
          alt="Contact SGAD"
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
        />
        {/* Diagonal tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0C]/80 via-[#0A0A0C]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-20 lg:pb-32 max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <p className="eyebrow mb-5">Get In Touch</p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-[88px] font-bold text-white leading-[1.02] max-w-3xl">
            Let&apos;s Build<br />
            Something<br />
            Exceptional
          </h1>
        </div>
      </section>

      {/* ─── Intro + Channels ───────────────────────────────────── */}
      <section className="section-py bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">

            {/* Left — editorial copy */}
            <SectionReveal direction="left">
              <p className="eyebrow mb-5">Direct Contact</p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#1A1F35] leading-[1.1] gold-line mb-8">
                We prefer a<br /> real conversation
              </h2>
              <p className="text-[#1A1F35]/55 leading-relaxed text-base max-w-sm mb-10">
                No forms, no ticketing systems. Reach Al Safwa Group directly
                by phone or email — and a member of our team will respond the
                same business day.
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1A1F35] border-b border-[#C9A96E] pb-0.5 hover:text-[#C9A96E] transition-colors group"
              >
                View Our Work
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </SectionReveal>

            {/* Right — channel cards */}
            <SectionReveal direction="right" delay={0.1}>
              <div className="flex flex-col gap-px">
                {channels.map(({ icon: Icon, label, lines, note }) => (
                  <div
                    key={label}
                    className="bg-white px-8 py-8 flex gap-6 items-start group hover:bg-[#1A1F35] transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-[#1A1F35] group-hover:bg-[#C9A96E] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <Icon size={17} className="text-[#C9A96E] group-hover:text-[#1A1F35] transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] tracking-[0.2em] uppercase font-semibold text-[#1A1F35]/35 group-hover:text-white/35 mb-2 transition-colors duration-300">
                        {label}
                      </p>
                      {lines.map(({ display, href }) =>
                        href ? (
                          <a
                            key={display}
                            href={href}
                            className="block font-serif text-2xl font-bold text-[#1A1F35] group-hover:text-white hover:!text-[#C9A96E] transition-colors duration-300 leading-tight"
                          >
                            {display}
                          </a>
                        ) : (
                          <p
                            key={display}
                            className="font-serif text-2xl font-bold text-[#1A1F35] group-hover:text-white transition-colors duration-300 leading-tight"
                          >
                            {display}
                          </p>
                        )
                      )}
                      {note && (
                        <p className="text-[11px] text-[#1A1F35]/40 group-hover:text-white/40 mt-2 transition-colors duration-300">
                          {note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>

          </div>
        </div>
      </section>

      {/* ─── Dark address block ─────────────────────────────────── */}
      <section className="bg-[#1A1F35] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionReveal>
            <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-24">
              <div>
                <p className="eyebrow mb-4">Our Office</p>
                <address className="not-italic">
                  <p className="font-serif text-4xl lg:text-5xl font-bold text-white leading-[1.1]">
                    23 Samir Moukhtar Street
                  </p>
                  <p className="font-serif text-4xl lg:text-5xl font-bold text-white/30 leading-[1.1]">
                    Ard Al Golf, Heliopolis
                  </p>
                  <p className="font-serif text-4xl lg:text-5xl font-bold text-white/15 leading-[1.1]">
                    Cairo, Egypt
                  </p>
                </address>
              </div>
              <div className="lg:ml-auto flex flex-col gap-5 lg:pb-2">
                <a
                  href="tel:+201050057511"
                  className="text-white/50 text-sm hover:text-[#C9A96E] transition-colors tracking-wide"
                >
                  +20 105 005 7511
                </a>
                <a
                  href="tel:+201050057544"
                  className="text-white/50 text-sm hover:text-[#C9A96E] transition-colors tracking-wide"
                >
                  +20 105 005 7544
                </a>
                <a
                  href="mailto:info@sgad.com.eg"
                  className="text-white/50 text-sm hover:text-[#C9A96E] transition-colors tracking-wide"
                >
                  info@sgad.com.eg
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
