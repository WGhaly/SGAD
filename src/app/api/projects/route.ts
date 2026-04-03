import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

// ─── GET /api/projects — public list ─────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status") ?? "published";

  const projects = await prisma.project.findMany({
    where: {
      ...(category ? { category } : {}),
      // Admins can request drafts via ?status=all
      ...(status !== "all" ? { status } : {}),
    },
    include: {
      media: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(projects);
}

// ─── POST /api/projects — create (admin only) ─────────────────────────────────
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      title: String(body.title).trim(),
      description: String(body.description ?? "").trim(),
      category: String(body.category ?? "corporate"),
      location: body.location ? String(body.location).trim() : null,
      coverImage: body.coverImage ? String(body.coverImage).trim() : null,
      status: body.status === "draft" ? "draft" : "published",
      sortOrder: Number(body.sortOrder ?? 0),
    },
  });

  return NextResponse.json(project, { status: 201 });
}
