import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { del } from "@vercel/blob";

type Params = { params: Promise<{ id: string }> };

// ─── DELETE /api/media/[id] — remove media item (admin only) ─────────────────
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Delete from Vercel Blob if it's a blob URL, ignore errors (file may not exist)
  if (media.url.startsWith("https://")) {
    await del(media.url).catch(() => {});
  }

  await prisma.media.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

// ─── PATCH /api/media/[id] — update caption / sort order (admin only) ────────
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
