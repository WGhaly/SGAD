import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import SectionReveal from "@/components/SectionReveal";
import { categories } from "@/lib/data";
import type { ProjectCategory } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore SGAD's portfolio of interior fitout projects across banking, hospitality, restaurants and corporate sectors across Egypt.",
};

const categoryOrder: ProjectCategory[] = ["banking", "hospitality", "restaurants", "corporate"];

export default function ProjectsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[60vh] min-h-[400px] bg-[#0A0A0C] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80"
          alt="SGAD Portfolio"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/60 via-transparent to-[#0A0A0C]/80" />
        <div className="relative z-10 h-full flex items-end pb-16 lg:pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <p className="eyebrow mb-3">Our Work</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white">
              Portfolio
            </h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-py bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionReveal className="max-w-2xl">
            <p className="eyebrow mb-4">Completed Projects</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1A1F35] gold-line mb-6">
              Spaces Built for Excellence
            </h2>
            <p className="text-[#1A1F35]/55 leading-relaxed">
              Browse our work by sector. Every project in our portfolio represents a unique
              client brief, a carefully considered design response, and the uncompromising
              craftsmanship SGAD is known for.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Category Cards */}
      <section className="pb-24 bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1A1F35]/10">
            {categoryOrder.map((key, i) => {
              const cat = categories[key];
              return (
                <SectionReveal key={key} delay={i * 0.1} direction="none">
                  <Link href={`/projects/${key}`} className="group block bg-[#FAF8F4] overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.label}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-[#0A0A0C]/50 group-hover:bg-[#0A0A0C]/30 transition-colors" />
                      <div className="absolute inset-0 flex items-end p-8">
                        <div>
                          <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mt-1">
                            {cat.label}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 flex items-start justify-between gap-6 border border-t-0 border-[#1A1F35]/10 group-hover:border-[#C9A96E]/30 transition-colors">
                      <p className="text-[#1A1F35]/55 text-sm leading-relaxed flex-1">
                        {cat.description}
                      </p>
                      <ArrowRight
                        size={16}
                        className="text-[#C9A96E] mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </Link>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
