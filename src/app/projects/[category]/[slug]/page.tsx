import type { ElementType } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MapPin, Layers, Clock, Ruler, ArrowRight } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import { projects, categories } from "@/lib/data";
import type { ProjectCategory } from "@/lib/data";

type PageProps = { params: Promise<{ category: string; slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { category, slug } = await params;
  const project = projects.find((p) => p.slug === slug && p.category === category);
  if (!project) notFound();

  const cat = categories[project.category as ProjectCategory];
  const related = projects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  const meta = [
    project.location && { icon: MapPin, label: "Location", value: project.location },
    project.area && { icon: Ruler, label: "Total Area", value: project.area },
    project.duration && { icon: Clock, label: "Duration", value: project.duration },
    project.delivery && { icon: Layers, label: "Delivery", value: project.delivery },
  ].filter(Boolean) as { icon: ElementType; label: string; value: string }[];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] bg-[#0A0A0C] overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/50 via-transparent to-[#0A0A0C]" />
        <div className="relative z-10 h-full flex items-end pb-16 lg:pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <nav className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-white/40 mb-4">
              <Link href="/projects" className="hover:text-[#C9A96E] transition-colors">Projects</Link>
              <span>/</span>
              <Link href={`/projects/${project.category}`} className="hover:text-[#C9A96E] transition-colors">
                {cat.label}
              </Link>
              <span>/</span>
              <span className="text-[#C9A96E]">{project.client}</span>
            </nav>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-2">{project.client}</p>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {project.name}
                </h1>
              </div>
              {project.status === "Ongoing" && (
                <span className="self-start sm:self-auto bg-[#C9A96E] text-[#0A0A0C] text-[9px] tracking-[0.2em] uppercase font-bold px-4 py-2">
                  Ongoing
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-py bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
            {/* Main content */}
            <SectionReveal direction="left">
              <p className="eyebrow mb-4">Project Brief</p>
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#1A1F35] mb-6 gold-line">
                Overview
              </h2>
              <p className="text-[#1A1F35]/60 leading-relaxed text-lg">{project.description}</p>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={img}
                        alt={`${project.name} — Gallery ${i + 1}`}
                        fill
                        className="object-cover img-hover-zoom"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-12">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-[#1A1F35] text-white text-[11px] tracking-[0.2em] uppercase font-semibold px-8 py-4 hover:bg-[#C9A96E] hover:text-[#0A0A0C] transition-colors group"
                >
                  Commission a Similar Project
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </SectionReveal>

            {/* Sidebar meta */}
            <SectionReveal direction="right" delay={0.15}>
              <div className="bg-[#1A1F35] p-8 space-y-6">
                <p className="eyebrow text-[#C9A96E]/80">Project Details</p>
                {meta.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <Icon size={16} className="text-[#C9A96E] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] tracking-[0.15em] uppercase text-white/30 font-medium">{label}</p>
                      <p className="text-white text-sm font-medium mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/10">
                  <Link
                    href={`/projects/${project.category}`}
                    className="flex items-center gap-2 text-[#C9A96E] text-[10px] tracking-[0.15em] uppercase font-semibold hover:gap-3 transition-all"
                  >
                    All {cat.label} <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-py bg-[#F0EDE7]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <SectionReveal className="mb-12">
              <p className="eyebrow mb-3">Continue Exploring</p>
              <h2 className="font-serif text-3xl font-bold text-[#1A1F35]">Related Projects</h2>
            </SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p, i) => (
                <SectionReveal key={p.slug} delay={i * 0.1} direction="none">
                  <Link
                    href={`/projects/${p.category}/${p.slug}`}
                    className="group block bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <p className="eyebrow text-[10px] mb-2">{p.client}</p>
                      <h3 className="font-serif text-base font-bold text-[#1A1F35] group-hover:text-[#C9A96E] transition-colors flex items-center justify-between">
                        {p.name}
                        <ArrowRight size={14} className="text-[#C9A96E] group-hover:translate-x-1 transition-transform" />
                      </h3>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
