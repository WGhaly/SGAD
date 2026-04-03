import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { put } from "@vercel/blob";
import path from "path";

type Params = { params: Promise<{ id: string }> };

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const ALLOWED_VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".webm", ".mov"]);

const YOUTUBE_DOMAINS = new Set(["youtube.com", "www.youtube.com", "youtu.be", "m.youtube.com"]);

function sanitizeFilename(name: string): string {
  return path.basename(name).replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 200);
}

function extractYoutubeId(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }

  const hostname = url.hostname.replace(/^www\./, "");
  if (!YOUTUBE_DOMAINS.has(url.hostname)) return null;

  // youtu.be/VIDEO_ID
  if (hostname === "youtu.be") {
    const id = url.pathname.slice(1).split("?")[0];
    return /^[\w-]{11}$/.test(id) ? id : null;
  }

  // youtube.com/watch?v=VIDEO_ID
  const v = url.searchParams.get("v");
  if (v && /^[\w-]{11}$/.test(v)) return v;

  // youtube.com/embed/VIDEO_ID or youtube.com/shorts/VIDEO_ID
  const match = url.pathname.match(/\/(embed|shorts|v)\/([\w-]{11})/);
  if (match) return match[2];

  return null;
}

// ─── POST /api/projects/[id]/media — upload files or add YouTube embed ─────
entryPoint
export async function POST(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: projectId } = await params;

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  const contentType = req.headers.get("content-type") ?? "";

  // ── YouTube embed (JSON body) ──────────────────────────────────────────────
  if (contentType.includes("application/json")) {
    const body = await req.json().catch(() => null);
    if (!body?.youtubeUrl) {
      return NextResponse.json({ error: "youtubeUrl is required" }, { status: 400 });
    }

    const videoId = extractYoutubeId(String(body.youtubeUrl));
    if (!videoId) {
      return NextResponse.json({ error: "Invalid or unsupported YouTube URL" }, { status: 422 });
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const caption = body.caption ? String(body.caption).slice(0, 500) : null;

    const media = await prisma.media.create({
      data: {
        projectId,
        type: "youtube",
        url: embedUrl,
        filename: videoId,
        caption,
        sortOrder: 0,
      },
    });

    return NextResponse.json([media], { status: 201 });
  }

  // ── File upload (multipart) ────────────────────────────────────────────
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid multipart data" }, { status: 400 });
  }

  const files = formData.getAll("files") as File[];
  if (!files.length) return NextResponse.json({ error: "No files provided" }, { status: 400 });

  const created = [];

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: `File "${file.name}" exceeds 100 MB limit` }, { status: 413 });
    }

    const mimeType = file.type.toLowerCase();
    const isImage = ALLOWED_IMAGE_TYPES.has(mimeType);
    const isVideo = ALLOWED_VIDEO_TYPES.has(mimeType);

    if (!isImage && !isVideo) {
      return NextResponse.json({ error: `File type "${mimeType}" is not allowed` }, { status: 415 });
    }

    const originalExt = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(originalExt)) {
      return NextResponse.json({ error: `File extension "${originalExt}" is not allowed` }, { status: 415 });
    }

    const safeOriginalName = sanitizeFilename(file.name);
    const blobPath = `uploads/${projectId}/${Date.now()}-${safeOriginalName}`;

    const blob = await put(blobPath, file, {
      access: "public",
      contentType: mimeType,
    });

    const media = await prisma.media.create({
      data: {
        projectId,
        type: isImage ? "image" : "video",
        url: blob.url,
        filename: safeOriginalName,
        sortOrder: 0,
      },
    });
    created.push(media);
  }

  return NextResponse.json(created, { status: 201 });
}

// ─── GET /api/projects/[id]/media — list media (public) ────────────────────
entryPoint
export async function GET(_req: NextRequest, { params }: Params) {
  const { id: projectId } = await params;
  const media = await prisma.media.findMany({
    where: { projectId },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(media);
}
