import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import SectionReveal from "@/components/SectionReveal";
import MediaLightbox from "@/components/gallery/MediaLightbox";
import { ChevronLeft, MapPin } from "lucide-react";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description.slice(0, 160),
  };
}

export const revalidate = 60;

const CATEGORY_LABELS: Record<string, string> = {
  banking: "Banking & Finance",
  hospitality: "Hotels & Hospitality",
  restaurants: "Restaurants & Retail",
  corporate: "Corporate & Commercial",
  residential: "Residential",
};

export default async function ProjectGalleryPage({ params }: Params) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id, status: "published" },
    include: { media: { orderBy: { sortOrder: "asc" } } },
  });

  if (!project) notFound();

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] flex items-end bg-[#1A1F35] overflow-hidden">
        {project.coverImage && (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
            quality={75}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-14 pt-32 w-full">
          <SectionReveal>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-6 transition"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Gallery
            </Link>

            <div className="flex items-start gap-3 mb-4 flex-wrap">
              <span className="text-xs px-3 py-1 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/40 text-[#C9A84C] font-medium capitalize">
                {CATEGORY_LABELS[project.category] ?? project.category}
              </span>
              {project.location && (
                <span className="flex items-center gap-1 text-gray-400 text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  {project.location}
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6 max-w-3xl">
              {project.title}
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Media Grid ────────────────────────────────────────── */}
      <section className="bg-[#FAF8F4] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {project.media.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p>No photos or videos have been added to this project yet.</p>
            </div>
          ) : (
            <>
              <SectionReveal>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-2xl text-gray-900">
                    Project Photos &amp; Videos
                  </h2>
                  <span className="text-gray-400 text-sm">
                    {project.media.length} file{project.media.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </SectionReveal>

              <MediaLightbox media={project.media} />
            </>
          )}
        </div>
      </section>

      {/* ── Back CTA ──────────────────────────────────────────── */}
      <section className="bg-[#1A1F35] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-serif text-3xl text-white mb-4">Explore More Projects</h2>
          <p className="text-gray-400 mb-8">
            Discover our full portfolio across banking, hospitality, restaurants, and more.
          </p>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3 border border-[#C9A84C] text-[#C9A84C] font-medium rounded-lg hover:bg-[#C9A84C] hover:text-gray-950 transition"
          >
            View All Projects
          </Link>
        </div>
      </section>
    </>
  );
}
