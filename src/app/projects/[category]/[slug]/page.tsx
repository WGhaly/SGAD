import { redirect, notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ category: string; slug: string }> };

export default async function ProjectPage({ params }: PageProps) {
  const { category, slug } = await params;
  const hardcoded = projects.find((p) => p.slug === slug && p.category === category);
  if (!hardcoded) notFound();

  // Find matching DB project by title (case-insensitive)
  const dbProject = await prisma.project.findFirst({
    where: {
      category,
      status: "published",
      title: { contains: hardcoded.name, mode: "insensitive" },
    },
    select: { id: true },
  });

  if (dbProject) {
    redirect(`/gallery/${dbProject.id}`);
  }

  // Fallback: no matching DB project found — go to gallery
  redirect(`/gallery`);
}
