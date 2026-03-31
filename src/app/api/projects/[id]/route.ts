import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import fs from "fs/promises";
import path from "path";

type Params = { params: Promise<{ id: string }> };

// ─── GET /api/projects/[id] ───────────────────────────────────────────────────
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { media: { orderBy: { sortOrder: "asc" } } },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

// ─── PUT /api/projects/[id] — update (admin only) ────────────────────────────
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => null);

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const project = await prisma.project.update({
    where: { id },
    data: {
      ...(body?.title !== undefined && { title: String(body.title).trim() }),
      ...(body?.description !== undefined && { description: String(body.description).trim() }),
      ...(body?.category !== undefined && { category: String(body.category) }),
      ...(body?.location !== undefined && { location: body.location ? String(body.location).trim() : null }),
      ...(body?.coverImage !== undefined && { coverImage: body.coverImage ? String(body.coverImage).trim() : null }),
      ...(body?.status !== undefined && { status: body.status === "draft" ? "draft" : "published" }),
      ...(body?.sortOrder !== undefined && { sortOrder: Number(body.sortOrder) }),
    },
    include: { media: { orderBy: { sortOrder: "asc" } } },
  });

  return NextResponse.json(project);
}

// ─── DELETE /api/projects/[id] — remove (admin only) ─────────────────────────
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { media: true },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const uploadBase = path.join(process.cwd(), "public");
  for (const m of project.media) {
    if (m.url.startsWith("/uploads/")) {
      const filePath = path.join(uploadBase, m.url);
      await fs.unlink(filePath).catch(() => {});
    }
  }

  await prisma.project.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
