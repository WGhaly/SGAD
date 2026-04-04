"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import { categories } from "@/lib/data";
import type { ProjectCategory } from "@/lib/data";

type DBProject = {
  id: string;
  title: string;
  description: string;
  location: string | null;
  coverImage: string | null;
  category: string;
};

const INITIAL_COUNT = 6;

export default function CategoryProjectsClient({
  category,
  projects,
}: {
  category: ProjectCategory;
  projects: DBProject[];
}) {
  const cat = categories[category];
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[60vh] min-h-[400px] bg-[#0A0A0C] overflow-hidden">
        <Image
          src={cat.image}
          alt={cat.label}
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/60 via-transparent to-[#0A0A0C]/80" />
        <div className="relative z-10 h-full flex items-end pb-16 lg:pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <nav className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-white/40 mb-4">
              <Link href="/projects" className="hover:text-[#C9A96E] transition-colors">Projects</Link>
              <span>/</span>
              <span className="text-[#C9A96E]">{cat.label}</span>
            </nav>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white">
              {cat.label}
            </h1>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="pt-16 pb-4 bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionReveal className="max-w-xl">
            <p className="text-[#1A1F35]/55 leading-relaxed">{cat.description}</p>
          </SectionReveal>
        </div>
      </section>

      {/* Project Grid */}
      <section className="section-py bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {projects.length === 0 ? (
            <div className="text-center py-24 text-[#1A1F35]/40">
              <p className="text-lg">No projects published yet.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {visible.map((project, i) => (
                  <SectionReveal key={project.id} delay={(i % 3) * 0.1} direction="none">
                    <Link
                      href={`/gallery/${project.id}`}
                      className="group block bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {project.coverImage ? (
                          <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-lg font-bold text-[#1A1F35] mb-2 leading-snug group-hover:text-[#C9A96E] transition-colors">
                          {project.title}
                        </h3>
                        {project.location && (
                          <div className="flex items-center gap-1 text-[#1A1F35]/40 text-xs mb-3">
                            <MapPin size={11} className="shrink-0" />
                            {project.location}
                          </div>
                        )}
                        <p className="text-[#1A1F35]/50 text-xs leading-relaxed line-clamp-2 mb-4">
                          {project.description}
                        </p>
                        <div className="flex justify-end">
                          <ArrowRight
                            size={14}
                            className="text-[#C9A96E] group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
                    </Link>
                  </SectionReveal>
                ))}
              </div>

              {/* Show More */}
              {!showAll && projects.length > INITIAL_COUNT && (
                <SectionReveal className="mt-14 text-center">
                  <button
                    onClick={() => setShowAll(true)}
                    className="inline-flex items-center gap-3 border border-[#1A1F35]/20 hover:border-[#C9A96E] text-[#1A1F35] hover:text-[#C9A96E] text-[11px] tracking-[0.2em] uppercase font-semibold px-8 py-4 transition-colors group"
                  >
                    Load More Projects
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </SectionReveal>
              )}
            </>
          )}
        </div>
      </section>

      {/* Back to All */}
      <div className="bg-[#FAF8F4] pb-16 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[#1A1F35]/50 hover:text-[#C9A96E] text-[11px] tracking-[0.15em] uppercase font-semibold transition-colors"
        >
          ← All Sectors
        </Link>
      </div>
    </>
  );
}
