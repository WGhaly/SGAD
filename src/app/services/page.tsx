import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import SectionReveal from "@/components/SectionReveal";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "SGAD delivers end-to-end architecture and interior design services across banking, hospitality, retail and corporate sectors in Egypt.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[60vh] min-h-[400px] bg-[#0A0A0C] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80"
          alt="SGAD Services"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/60 via-transparent to-[#0A0A0C]/80" />
        <div className="relative z-10 h-full flex items-end pb-16 lg:pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <p className="eyebrow mb-3">What We Offer</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white">
              Our Services
            </h1>
          </div>
        </div>
      </section>

      {/* Services — alternating image/text */}
      {services.map((service, i) => (
        <section
          key={service.id}
          className={`section-py ${i % 2 === 0 ? "bg-[#FAF8F4]" : "bg-[#1A1F35]"}`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start ${
                i % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Text */}
              <SectionReveal
                direction={i % 2 === 0 ? "left" : "right"}
                className={i % 2 === 1 ? "lg:col-start-2" : ""}
              >
                <p className="eyebrow mb-4">{`0${i + 1}`}</p>
                <h2
                  className={`font-serif text-3xl lg:text-4xl font-bold mb-6 gold-line ${
                    i % 2 === 0 ? "text-[#1A1F35]" : "text-white"
                  }`}
                >
                  {service.title}
                </h2>
                <p
                  className={`leading-relaxed mb-8 ${
                    i % 2 === 0 ? "text-[#1A1F35]/60" : "text-white/50"
                  }`}
                >
                  {service.description}
                </p>
                {service.highlights && (
                  <ul className="space-y-3 mb-8">
                    {service.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <CheckCircle
                          size={16}
                          className="text-[#C9A96E] mt-0.5 flex-shrink-0"
                        />
                        <span
                          className={`text-sm ${
                            i % 2 === 0 ? "text-[#1A1F35]/60" : "text-white/50"
                          }`}
                        >
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href="/projects"
                  className={`inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-semibold border-b pb-0.5 hover:text-[#C9A96E] transition-colors group ${
                    i % 2 === 0
                      ? "text-[#1A1F35] border-[#C9A96E]/50 hover:border-[#C9A96E]"
                      : "text-white/70 border-white/20 hover:border-[#C9A96E]"
                  }`}
                >
                  View Related Projects
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </SectionReveal>

              {/* Image */}
              <SectionReveal
                direction={i % 2 === 0 ? "right" : "left"}
                delay={0.15}
                className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover img-hover-zoom"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/30 to-transparent pointer-events-none" />
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-[#C9A96E] py-20">
        <SectionReveal className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#0A0A0C] mb-4">
            Let&apos;s discuss your project
          </h2>
          <p className="text-[#0A0A0C]/60 mb-8">
            Our team is ready to advise on the right service mix for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#0A0A0C] text-white text-[11px] tracking-[0.2em] uppercase font-semibold px-8 py-4 hover:bg-[#1A1F35] transition-colors group"
          >
            Start a Conversation
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </SectionReveal>
      </section>
    </>
  );
}
