import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories } from "@/lib/data";
import type { ProjectCategory } from "@/lib/data";
import CategoryProjectsClient from "./CategoryProjectsClient";

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
  return <CategoryProjectsClient category={category as ProjectCategory} />;
}
