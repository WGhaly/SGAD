import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

type Params = { params: Promise<{ id: string }> };

const YOUTUBE_DOMAINS = new Set(["youtube.com", "www.youtube.com", "youtu.be", "m.youtube.com"]);
const ALLOWED_BLOB_HOSTS = ["public.blob.vercel-storage.com"];

function extractYoutubeId(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }

  const hostname = url.hostname.replace(/^www\./, "");
  if (!YOUTUBE_DOMAINS.has(url.hostname)) return null;

  if (hostname === "youtu.be") {
    const id = url.pathname.slice(1).split("?")[0];
    return /^[\w-]{11}$/.test(id) ? id : null;
  }

  const v = url.searchParams.get("v");
  if (v && /^[\w-]{11}$/.test(v)) return v;

  const match = url.pathname.match(/\/(embed|shorts|v)\/([\w-]{11})/);
  if (match) return match[2];

  return null;
}

function isTrustedBlobUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return (
      url.protocol === "https:" &&
      ALLOWED_BLOB_HOSTS.some((h) => url.hostname.endsWith(h))
    );
  } catch {
    return false;
  }
}

// ─── POST /api/projects/[id]/media ───────────────────────────────────────────
// Accepts JSON body for:
//   1. YouTube embed: { youtubeUrl, caption? }
//   2. Blob registration: { url, filename, type, caption? }
export async function POST(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: projectId } = await params;

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  // ── YouTube embed ──────────────────────────────────────────────────────────
  if (body.youtubeUrl) {
    const videoId = extractYoutubeId(String(body.youtubeUrl));
    if (!videoId) {
      return NextResponse.json({ error: "Invalid or unsupported YouTube URL" }, { status: 422 });
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const caption = body.caption ? String(body.caption).slice(0, 500) : null;

    const media = await prisma.media.create({
      data: { projectId, type: "youtube", url: embedUrl, filename: videoId, caption, sortOrder: 0 },
    });

    return NextResponse.json([media], { status: 201 });
  }

  // ── Blob registration (client-side upload completed) ───────────────────────
  if (body.url && body.filename) {
    const blobUrl = String(body.url);
    if (!isTrustedBlobUrl(blobUrl)) {
      return NextResponse.json({ error: "Invalid blob URL" }, { status: 400 });
    }

    const type = body.type === "video" ? "video" : "image";
    const filename = String(body.filename).replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 200);
    const caption = body.caption ? String(body.caption).slice(0, 500) : null;

    const media = await prisma.media.create({
      data: { projectId, type, url: blobUrl, filename, caption, sortOrder: 0 },
    });

    return NextResponse.json([media], { status: 201 });
  }

  return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
}

// ─── GET /api/projects/[id]/media ────────────────────────────────────────────
export async function GET(_req: NextRequest, { params }: Params) {
  const { id: projectId } = await params;
  const media = await prisma.media.findMany({
    where: { projectId },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(media);
}
