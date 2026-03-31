import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import AdminNav from "@/components/admin/AdminNav";
import Link from "next/link";
import { PlusCircle, Pencil, Eye } from "lucide-react";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

export default async function AdminProjectsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { media: true } } },
  });

  const categoryLabels: Record<string, string> = {
    banking: "Banking",
    hospitality: "Hospitality",
    restaurants: "Restaurants",
    corporate: "Corporate",
    residential: "Residential",
  };

  return (
    <div className="flex min-h-screen">
      <AdminNav userName={session.user?.name} />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-white">Projects</h1>
              <p className="text-gray-400 text-sm mt-1">{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
            </div>
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] hover:bg-[#b8943e] text-gray-950 font-medium rounded-lg text-sm transition"
            >
              <PlusCircle className="w-4 h-4" />
              New Project
            </Link>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            {projects.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-sm mb-4">No projects found.</p>
                <Link href="/admin/projects/new" className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-gray-950 font-medium rounded-lg text-sm">
                  <PlusCircle className="w-4 h-4" />Create first project
                </Link>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                    <th className="text-left px-6 py-3 font-medium">Project</th>
                    <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Category</th>
                    <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Media</th>
                    <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {(projects as (typeof projects)[number][]).map((p) => (
                    <tr key={p.id} className="hover:bg-gray-800/40 transition">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white truncate max-w-[240px]">{p.title}</div>
                        {p.location && <div className="text-gray-500 text-xs mt-0.5 truncate">{p.location}</div>}
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <span className="text-gray-400 capitalize">{categoryLabels[p.category] ?? p.category}</span>
                      </td>
                      <td className="px-4 py-4 text-gray-400 hidden md:table-cell">{p._count.media} files</td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          p.status === "published"
                            ? "bg-emerald-950/50 text-emerald-400 border border-emerald-800/50"
                            : "bg-gray-800 text-gray-400 border border-gray-700"
                        }`}>{p.status}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/gallery/${p.id}`} target="_blank" className="p-1.5 text-gray-500 hover:text-gray-300 transition" title="View">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link href={`/admin/projects/${p.id}`} className="p-1.5 text-gray-500 hover:text-[#C9A84C] transition" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <DeleteProjectButton id={p.id} title={p.title} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
