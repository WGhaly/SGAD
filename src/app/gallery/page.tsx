import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import SectionReveal from "@/components/SectionReveal";
import { ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery — Our Portfolio",
  description:
    "Explore SGAD's portfolio of completed interior fitout projects across banking, hospitality, restaurants, and corporate sectors in Egypt.",
};

export const revalidate = 60;

const CATEGORY_LABELS: Record<string, string> = {
  banking: "Banking & Finance",
  hospitality: "Hotels & Hospitality",
  restaurants: "Restaurants & Retail",
  corporate: "Corporate & Commercial",
  residential: "Residential",
};

const CATEGORY_COLORS: Record<string, string> = {
  banking: "bg-blue-900/60 text-blue-300 border-blue-700/40",
  hospitality: "bg-amber-900/60 text-amber-300 border-amber-700/40",
  restaurants: "bg-emerald-900/60 text-emerald-300 border-emerald-700/40",
  corporate: "bg-purple-900/60 text-purple-300 border-purple-700/40",
  residential: "bg-rose-900/60 text-rose-300 border-rose-700/40",
};

export default async function GalleryPage() {
  const projects = await prisma.project.findMany({
    where: { status: "published" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: {
      _count: { select: { media: true } },
    },
  });

  const categories: string[] = Array.from(new Set(projects.map((p: (typeof projects)[number]) => p.category)));

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1A1F35] pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <SectionReveal>
            <div className="max-w-2xl">
              <span className="inline-block text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                Portfolio
              </span>
              <h1 className="text-5xl sm:text-6xl font-serif text-white leading-tight mb-6">
                Our Work,<br />
                <span className="text-[#C9A84C]">Crafted</span> With Purpose
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Discover a curated selection of SGAD's completed projects across Egypt —
                from banking interiors to boutique hotels and restaurant concepts.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Category pills */}
      {categories.length > 1 && (
        <section className="bg-[#1A1F35] border-t border-white/5 sticky top-[72px] z-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
              <Link
                href="/gallery"
                className="shrink-0 px-4 py-1.5 rounded-full border border-[#C9A84C]/60 text-[#C9A84C] text-xs font-medium hover:bg-[#C9A84C]/10 transition"
              >
                All
              </Link>
              {categories.map((cat: string) => (
                <Link
                  key={cat}
                  href={`/gallery?category=${cat}`}
                  className="shrink-0 px-4 py-1.5 rounded-full border border-white/20 text-gray-300 text-xs font-medium hover:border-[#C9A84C]/60 hover:text-[#C9A84C] transition capitalize"
                >
                  {CATEGORY_LABELS[cat] ?? cat}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section className="bg-[#FAF8F4] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {projects.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg">No projects published yet.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {(projects as (typeof projects)[number][]).map((project, index) => (
                <SectionReveal key={project.id} delay={index * 0.04}>
                  <Link
                    href={`/gallery/${project.id}`}
                    className="group block mb-6 break-inside-avoid"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {project.coverImage ? (
                          <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            unoptimized
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">No image</span>
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span
                            className={`text-[11px] px-2.5 py-1 rounded-full border font-medium backdrop-blur-sm ${
                              CATEGORY_COLORS[project.category] ??
                              "bg-gray-800/60 text-gray-200 border-gray-600/40"
                            }`}
                          >
                            {CATEGORY_LABELS[project.category] ?? project.category}
                          </span>
                        </div>
                        {project._count.media > 0 && (
                          <div className="absolute top-3 right-3">
                            <span className="text-[11px] px-2.5 py-1 rounded-full bg-gray-950/70 text-gray-200 backdrop-blur-sm">
                              {project._count.media} photos
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-5 bg-white">
                        <h3 className="font-serif text-gray-900 font-semibold text-lg leading-snug mb-1.5 group-hover:text-[#1A1F35] transition">
                          {project.title}
                        </h3>
                        {project.location && (
                          <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                            <MapPin className="w-3 h-3 shrink-0" />
                            {project.location}
                          </div>
                        )}
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-1 mt-4 text-[#1A1F35] text-sm font-medium group-hover:text-[#C9A84C] transition">
                          View Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
