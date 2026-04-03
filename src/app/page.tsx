import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import ClientsSection from "@/components/home/ClientsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import SectionReveal from "@/components/SectionReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { projects, categories, services, stats } from "@/lib/data";
import type { ProjectCategory } from "@/lib/data";

export const metadata: Metadata = {
  title: "Al Safwa Group for Architecture & Decoration | SGAD",
  description:
    "Egypt's leading turnkey interior fitout contractor. 302+ completed projects across banking, hospitality, restaurants and corporate sectors.",
};

const categoryOrder: ProjectCategory[] = [
  "banking",
  "hospitality",
  "restaurants",
  "corporate",
];

const showcaseSlugs = [
  "egbank-branches",
  "casa-cook-el-gouna",
  "aib-branches",
  "conrad-corniche-nile",
  "mado-concord-plaza",
  "corporate-headquarters",
];

export default function HomePage() {
  const showcase = showcaseSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean) as typeof projects;

  return (
    <>
      {/* ─── 1. HERO ─────────────────────────────────────────── */}
      <HeroSlider />

      {/* ─── 2. ABOUT ────────────────────────────────────────── */}
      <section className="bg-[#1A1F35] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left — editorial text block */}
            <SectionReveal direction="left" className="py-20 lg:py-28 lg:pr-20">
              <p className="eyebrow mb-6">Heliopolis, Cairo &middot; Egypt</p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-8">
                The Contractor Egypt&apos;s Most Demanding Clients Keep Calling Back
              </h2>
              <p className="text-white/50 leading-relaxed mb-10 max-w-lg">
                Al Safwa Group for Architecture and Decoration (SGAD) executes bespoke
                interior fitouts for banks, hotels, restaurants and corporate clients
                across Egypt. From a 351M EGP bank network rollout to an intimate Red
                Sea boutique hotel — our name stands for precision, craft and unfailing
                delivery.
              </p>

              {/* Inline mini-stats */}
              <div className="grid grid-cols-3 gap-6 pb-10 border-b border-white/10 mb-10">
                {[
                  { n: "625M+", l: "EGP Project Value" },
                  { n: "6",     l: "Banking Institutions" },
                  { n: "4",     l: "Industry Sectors" },
                ].map(({ n, l }) => (
                  <div key={l}>
                    <p className="font-serif text-3xl lg:text-4xl font-bold text-[#C9A96E]">{n}</p>
                    <p className="text-[9px] tracking-[0.2em] uppercase text-white/30 font-medium mt-1 leading-tight">{l}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-semibold text-white/70 border-b border-[#C9A96E]/40 pb-px hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors group"
              >
                Our Story
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </SectionReveal>

            {/* Right — full-bleed photo */}
            <SectionReveal direction="right" delay={0.15} className="hidden lg:block relative min-h-[540px]">
              <div className="absolute inset-0">
                <Image
                  src="/portfolio/Egbank.jpeg"
                  alt="SGAD — premium bank interior fitout"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A1F35]/60 to-transparent" />
                {/* Floating value badge */}
                <div className="absolute bottom-10 left-10 bg-[#C9A96E] px-5 py-3">
                  <p className="text-[#0A0A0C] font-serif text-2xl font-bold leading-none">351M</p>
                  <p className="text-[#0A0A0C]/60 text-[9px] tracking-[0.15em] uppercase font-semibold mt-0.5">EGP — Largest Project</p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ─── 3. SERVICES ─────────────────────────────────────── */}
      <section className="section-py bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionReveal className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">What We Do</p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#1A1F35]">Our Services</h2>
            </div>
            <Link
              href="/services"
              className="flex-shrink-0 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1A1F35]/40 hover:text-[#C9A96E] transition-colors group"
            >
              Full Services <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1A1F35]/10">
            {services.map((service, i) => (
              <SectionReveal key={service.id} delay={i * 0.1} direction="none">
                <Link href={service.link} className="group block relative overflow-hidden">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/85 via-[#0A0A0C]/15 to-transparent" />
                    <span
                      aria-hidden="true"
                      className="absolute top-5 left-5 font-serif text-5xl font-bold text-white/8 group-hover:text-[#C9A96E]/15 transition-colors leading-none select-none"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="font-serif text-lg font-bold text-white leading-snug mb-2">{service.title}</h3>
                      <p className="text-white/0 group-hover:text-white/55 text-xs leading-relaxed transition-all duration-500 max-h-0 group-hover:max-h-20 overflow-hidden">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-[9px] tracking-[0.2em] uppercase text-[#C9A96E] font-semibold">Learn More</span>
                        <ArrowRight size={11} className="text-[#C9A96E]" />
                      </div>
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. PROJECTS GRID ────────────────────────────────── */}
      <section className="section-py bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionReveal className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">Portfolio</p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white">Selected Work</h2>
            </div>
            <Link
              href="/projects"
              className="flex-shrink-0 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold text-white/30 hover:text-[#C9A96E] transition-colors group"
            >
              All 302+ Projects <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </SectionReveal>

          {/* Editorial grid — first card is double-wide */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5">
            {showcase.map((project, i) => (
              <SectionReveal
                key={project.slug}
                delay={(i % 3) * 0.1}
                direction="none"
                className={i === 0 ? "lg:col-span-2" : ""}
              >
                <Link
                  href={`/projects/${project.category}/${project.slug}`}
                  className={`group block relative overflow-hidden bg-[#111118] ${
                    i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover opacity-70 transition-all duration-700 group-hover:opacity-50 group-hover:scale-105"
                    sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/90 via-[#0A0A0C]/10 to-transparent" />
                  <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between">
                    {/* Top — sector tag */}
                    <div className="flex justify-end">
                      <span className="text-[9px] tracking-[0.2em] uppercase text-white/30 bg-[#0A0A0C]/40 px-3 py-1 backdrop-blur-sm">
                        {categories[project.category].label.split(" ")[0]}
                      </span>
                    </div>
                    {/* Bottom — info */}
                    <div>
                      <p className="eyebrow text-[10px] mb-2">{project.client}</p>
                      <h3 className={`font-serif font-bold text-white leading-snug ${i === 0 ? "text-2xl lg:text-3xl" : "text-base lg:text-lg"}`}>
                        {project.name}
                      </h3>
                      {project.value && (
                        <p className="text-[#C9A96E] text-sm font-medium mt-1">{project.value}</p>
                      )}
                      <div className="flex items-center gap-2 mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-[9px] tracking-[0.2em] uppercase text-white/50 font-semibold">View Project</span>
                        <ArrowRight size={11} className="text-[#C9A96E]" />
                      </div>
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. FACTS & FIGURES ──────────────────────────────── */}
      <section className="section-py relative bg-[#0A0A0C] overflow-hidden border-t border-white/5">
        <p
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center font-serif font-bold text-white/[0.025] leading-none"
          style={{ fontSize: "clamp(6rem, 17vw, 18rem)" }}
        >
          SGAD
        </p>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <SectionReveal className="text-center mb-16">
            <p className="eyebrow mb-3">Facts &amp; Figures</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white">By the Numbers</h2>
          </SectionReveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {stats.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.1} direction="none">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. CLIENTS ──────────────────────────────────────── */}
      <section className="bg-[#F0EDE7]">
        <ClientsSection />
      </section>

      {/* ─── 7. TESTIMONIALS ─────────────────────────────────── */}
      <TestimonialsSection />

      {/* ─── 8. CTA STRIP ────────────────────────────────────── */}
      <section className="bg-[#C9A96E] py-20 lg:py-28">
        <SectionReveal className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-[9px] tracking-[0.3em] uppercase font-semibold text-[#0A0A0C]/40 mb-4">
            Start Something Great
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0C] leading-[1.1] mb-6">
            Your Next Project Deserves the Best
          </h2>
          <p className="text-[#0A0A0C]/55 mb-10 max-w-md mx-auto">
            Tell us about your space and we&apos;ll show you what SGAD can do.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#0A0A0C] text-white text-[11px] tracking-[0.2em] uppercase font-semibold px-8 py-4 hover:bg-[#1A1F35] transition-colors group"
            >
              Start a Project
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 border border-[#0A0A0C]/25 text-[#0A0A0C] text-[11px] tracking-[0.2em] uppercase font-semibold px-8 py-4 hover:bg-[#0A0A0C] hover:text-white hover:border-transparent transition-colors"
            >
              View Portfolio
            </Link>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}

