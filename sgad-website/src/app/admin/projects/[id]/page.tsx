import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import AdminNav from "@/components/admin/AdminNav";
import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type Params = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Params) {
  const session = await auth();
  if (!session?.user?.email) redirect("/admin/login");

  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { media: { orderBy: { sortOrder: "asc" } } },
  });

  if (!project) notFound();

  return (
    <div className="flex min-h-screen">
      <AdminNav userName={session.user?.name} />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200 mb-6 transition"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Projects
          </Link>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-white truncate max-w-lg">
              {project.title}
            </h1>
            <Link
              href={`/gallery/${project.id}`}
              target="_blank"
              className="text-sm text-[#C9A84C] hover:underline shrink-0 ml-4"
            >
              View in Gallery \u2192
            </Link>
          </div>
          <ProjectForm
            mode="edit"
            projectId={project.id}
            initialData={{
              title: project.title,
              description: project.description,
              category: project.category,
              location: project.location ?? "",
              coverImage: project.coverImage ?? "",
              status: project.status,
              sortOrder: project.sortOrder,
              media: project.media.map((m: (typeof project.media)[number]) => ({
                id: m.id,
                type: m.type,
                url: m.url,
                filename: m.filename,
                caption: m.caption,
              })),
            }}
          />
        </div>
      </main>
    </div>
  );
}
