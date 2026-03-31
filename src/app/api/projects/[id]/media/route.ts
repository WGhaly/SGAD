import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";

type Params = { params: Promise<{ id: string }> };

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const ALLOWED_VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".webm", ".mov"]);

function sanitizeFilename(name: string): string {
  return path.basename(name).replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 200);
}

export async function POST(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: projectId } = await params;

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid multipart data" }, { status: 400 });
  }

  const files = formData.getAll("files") as File[];
  if (!files.length) return NextResponse.json({ error: "No files provided" }, { status: 400 });

  const uploadDir = path.join(process.cwd(), "public", "uploads", projectId);
  await fs.mkdir(uploadDir, { recursive: true });

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
    const uniqueFilename = `${uuidv4()}${originalExt}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const urlPath = `/uploads/${projectId}/${uniqueFilename}`;

    const media = await prisma.media.create({
      data: {
        projectId,
        type: isImage ? "image" : "video",
        url: urlPath,
        filename: safeOriginalName,
        sortOrder: 0,
      },
    });
    created.push(media);
  }

  return NextResponse.json(created, { status: 201 });
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id: projectId } = await params;
  const media = await prisma.media.findMany({
    where: { projectId },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(media);
}
