import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function NewProjectPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen">
      <AdminNav userName={session.user?.name} />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <Link href="/admin/projects" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200 mb-6 transition">
            <ChevronLeft className="w-4 h-4" /> Back to Projects
          </Link>
          <h1 className="text-2xl font-semibold text-white mb-8">New Project</h1>
          <ProjectForm mode="create" />
        </div>
      </main>
    </div>
  );
}
