import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import fs from "fs/promises";
import path from "path";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (media.url.startsWith("/uploads/")) {
    const filePath = path.join(process.cwd(), "public", media.url);
    const uploadsBase = path.join(process.cwd(), "public", "uploads");
    const resolved = path.resolve(filePath);
    if (resolved.startsWith(uploadsBase)) {
      await fs.unlink(resolved).catch(() => {});
    }
  }

  await prisma.media.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => null);

  const updated = await prisma.media.update({
    where: { id },
    data: {
      ...(body?.caption !== undefined && { caption: String(body.caption) }),
      ...(body?.sortOrder !== undefined && { sortOrder: Number(body.sortOrder) }),
    },
  });

  return NextResponse.json(updated);
}
