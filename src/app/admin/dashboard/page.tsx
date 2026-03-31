import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import AdminNav from "@/components/admin/AdminNav";
import Link from "next/link";
import { PlusCircle, Images, ImageIcon, Film } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [projectCount, mediaCount] = await Promise.all([
    prisma.project.count(),
    prisma.media.count(),
  ]);

  const imageCount = await prisma.media.count({ where: { type: "image" } });
  const videoCount = await prisma.media.count({ where: { type: "video" } });

  const recentProjects = await prisma.project.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { media: true } } },
  });

  return (
    <div className="flex min-h-screen">
      <AdminNav userName={session.user?.name} />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
              <p className="text-gray-400 text-sm mt-1">
                Welcome back, {session.user?.name}
              </p>
            </div>
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] hover:bg-[#b8943e] text-gray-950 font-medium rounded-lg text-sm transition"
            >
              <PlusCircle className="w-4 h-4" />
              New Project
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Projects", value: projectCount, icon: Images, color: "text-[#C9A84C]" },
              { label: "Total Media", value: mediaCount, icon: ImageIcon, color: "text-blue-400" },
              { label: "Images", value: imageCount, icon: ImageIcon, color: "text-emerald-400" },
              { label: "Videos", value: videoCount, icon: Film, color: "text-purple-400" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <Icon className={`w-5 h-5 mb-3 ${color}`} />
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-gray-400 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Recent Projects */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="font-medium text-white">Recent Projects</h2>
              <Link href="/admin/projects" className="text-[#C9A84C] text-sm hover:underline">
                View all
              </Link>
            </div>
            <div className="divide-y divide-gray-800">
              {recentProjects.length === 0 && (
                <p className="text-gray-500 text-sm px-6 py-8 text-center">
                  No projects yet.{" "}
                  <Link href="/admin/projects/new" className="text-[#C9A84C] hover:underline">
                    Create your first one.
                  </Link>
                </p>
              )}
              {(recentProjects as (typeof recentProjects)[number][]).map((p) => (
                <div key={p.id} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-white">{p.title}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500 capitalize">{p.category}</span>
                      <span className="text-gray-700">&middot;</span>
                      <span className="text-xs text-gray-500">{p._count.media} media files</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        p.status === "published"
                          ? "bg-emerald-950/50 text-emerald-400 border border-emerald-800/50"
                          : "bg-gray-800 text-gray-400 border border-gray-700"
                      }`}
                    >
                      {p.status}
                    </span>
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="text-xs text-[#C9A84C] hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
