import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import SectionReveal from "@/components/SectionReveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Al Safwa Group for Architecture and Decoration (SGAD) — Egypt's trusted turnkey interior fitout contractor delivering projects across banking, hospitality and commercial sectors.",
};

const values = [
  {
    icon: "01",
    title: "Design Excellence",
    description:
      "We combine architectural rigour with interior artistry to create spaces that are both beautiful and functional.",
  },
  {
    icon: "02",
    title: "Delivery Discipline",
    description:
      "On-time, on-budget delivery is not a promise — it is the standard our clients have come to rely on.",
  },
  {
    icon: "03",
    title: "Client Partnership",
    description:
      "We treat every client relationship as a long-term partnership, not a transaction.",
  },
  {
    icon: "04",
    title: "Craftsmanship",
    description:
      "From bespoke joinery to precision stone installation, we maintain uncompromising quality at every scale.",
  },
  {
    icon: "05",
    title: "Transparency",
    description:
      "Detailed reporting, open communication and rigorous project management — at every stage of every project.",
  },
  {
    icon: "06",
    title: "Integrity",
    description:
      "Our reputation is built on honest relationships, fair practices and a commitment to always doing the right thing.",
  },
];

const process = [
  { step: "01", title: "Brief & Discovery", description: "We invest deeply in understanding your brand, operational needs and design aspirations before we draw a single line." },
  { step: "02", title: "Concept Design", description: "Our designers develop concepts that respond to your brief, exploring spatial layouts, material palettes and lighting strategies." },
  { step: "03", title: "Design Development", description: "Concepts are refined into detailed construction drawings, specifications and BOQ packages ready for tendering." },
  { step: "04", title: "Fitout & Construction", description: "Our experienced site teams execute the build with precision, coordinating all trades from structural to MEP to FF&E." },
  { step: "05", title: "Handover", description: "We conduct rigorous snagging, commissioning and handover — and remain available long after the keys are handed over." },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[60vh] min-h-[400px] bg-[#0A0A0C] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2000&q=80"
          alt="SGAD — Architecture and Interior Design"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/60 via-transparent to-[#0A0A0C]/80" />
        <div className="relative z-10 h-full flex items-end pb-16 lg:pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <p className="eyebrow mb-3">Our Story</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white">
              About SGAD
            </h1>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-py bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <SectionReveal direction="left">
              <p className="eyebrow mb-4">Who We Are</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1A1F35] mb-6 gold-line">
                A Legacy of Transforming Spaces Across Egypt
              </h2>
              <div className="space-y-4 text-[#1A1F35]/60 leading-relaxed">
                <p>
                  Al Safwa Group for Architecture and Decoration (SGAD) has grown
                  into one of Egypt&apos;s most trusted turnkey interior
                  contractors — delivering confirmed projects for the nation&apos;s
                  most prominent financial institutions, hotel groups and hospitality brands.
                </p>
                <p>
                  Our team of architects, interior designers, project managers and specialist
                  craftsmen brings together disciplines rarely found under one roof — ensuring
                  seamless delivery from first sketch to final snagging, without the complexity
                  of managing multiple contractors.
                </p>
                <p>
                  Headquartered in Heliopolis, Cairo, we operate across all of Egypt&apos;s major
                  cities and governorates, with a proven ability to execute large multi-site
                  programmes and tight-timeline handovers simultaneously.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 mt-8 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1A1F35] border-b border-[#C9A96E] pb-0.5 hover:text-[#C9A96E] transition-colors group"
              >
                Start a Project <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </SectionReveal>
            <SectionReveal direction="right" delay={0.15} className="space-y-6">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80"
                  alt="SGAD team at work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1A1F35] p-6">
                  <p className="font-serif text-3xl font-bold text-[#C9A96E]">Turnkey</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 font-medium mt-1">
                    Full-Service Delivery
                  </p>
                </div>
                <div className="bg-[#F0EDE7] p-6">
                  <p className="font-serif text-3xl font-bold text-[#1A1F35]">Cairo</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#1A1F35]/40 font-medium mt-1">
                    Heliopolis Headquarters
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-py bg-[#1A1F35]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionReveal className="mb-16">
            <p className="eyebrow mb-3">What We Stand For</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white">Our Values</h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {values.map((v, i) => (
              <SectionReveal key={v.icon} delay={i * 0.08} direction="none">
                <div className="bg-[#1A1F35] p-8 lg:p-10 hover:bg-[#1e243d] transition-colors group">
                  <span className="font-serif text-5xl font-bold text-white/5 group-hover:text-[#C9A96E]/20 transition-colors block mb-4 leading-none">
                    {v.icon}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mb-3">{v.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{v.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-py bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionReveal className="mb-16">
            <p className="eyebrow mb-3">How We Work</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#1A1F35] gold-line">
              Our Process
            </h2>
          </SectionReveal>
          <div className="space-y-0">
            {process.map((p, i) => (
              <SectionReveal key={p.step} delay={i * 0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-12 py-8 border-b border-[#1A1F35]/10 group hover:border-[#C9A96E]/40 transition-colors">
                  <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                    <span className="font-serif text-4xl font-bold text-[#1A1F35]/10 group-hover:text-[#C9A96E]/30 transition-colors leading-none">
                      {p.step}
                    </span>
                  </div>
                  <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-10 items-start">
                    <h3 className="font-serif text-xl font-bold text-[#1A1F35] mb-3 lg:mb-0">{p.title}</h3>
                    <p className="text-[#1A1F35]/55 leading-relaxed">{p.description}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="w-0 h-0" />

      {/* CTA */}
      <section className="bg-[#C9A96E] py-20">
        <SectionReveal className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#0A0A0C] mb-6">
            Ready to work with us?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#0A0A0C] text-white text-[11px] tracking-[0.2em] uppercase font-semibold px-8 py-4 hover:bg-[#1A1F35] transition-colors group"
          >
            Get in Touch
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </SectionReveal>
      </section>
    </>
  );
}
