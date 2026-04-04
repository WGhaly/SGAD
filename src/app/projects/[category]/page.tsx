import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories } from "@/lib/data";
import type { ProjectCategory } from "@/lib/data";
import { prisma } from "@/lib/db";
import CategoryProjectsClient from "./CategoryProjectsClient";

export const revalidate = 60;

type PageProps = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return Object.keys(categories).map((key) => ({ category: key }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  if (!(category in categories)) return {};
  const cat = categories[category as ProjectCategory];
  return {
    title: cat.label,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  if (!(category in categories)) notFound();

  const dbProjects = await prisma.project.findMany({
    where: { category, status: "published" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      coverImage: true,
      category: true,
    },
  });

  return (
    <CategoryProjectsClient
      category={category as ProjectCategory}
      projects={dbProjects}
    />
  );
}
