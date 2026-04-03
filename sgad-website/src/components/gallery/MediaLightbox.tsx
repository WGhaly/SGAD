"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play, PlayCircle } from "lucide-react";

interface MediaItem {
  id: string;
  type: string;
  url: string;
  filename: string;
  caption: string | null;
}

function getYoutubeId(embedUrl: string) {
  return embedUrl.split("/embed/")[1]?.split("?")[0] ?? "";
}

export default function MediaLightbox({ media }: { media: MediaItem[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // All media items are navigable in lightbox
  const lightboxItems = media;

  function openAt(i: number) {
    setIndex(i);
    setOpen(true);
  }

  function prev() {
    setIndex((i) => (i - 1 + lightboxItems.length) % lightboxItems.length);
  }

  function next() {
    setIndex((i) => (i + 1) % lightboxItems.length);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") setOpen(false);
  }

  const current = lightboxItems[index];

  return (
    <>
      {/* ── Grid ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {media.map((m, i) => {
          const ytId = m.type === "youtube" ? getYoutubeId(m.url) : null;

          return (
            <div
              key={m.id}
              className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-pointer group"
              onClick={() => openAt(i)}
            >
              {m.type === "image" ? (
                <Image
                  src={m.url}
                  alt={m.caption ?? m.filename}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  quality={75}
                />
              ) : m.type === "youtube" && ytId ? (
                <>
                  <Image
                    src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                    alt={m.caption ?? m.filename}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    quality={70}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-950/30 group-hover:bg-gray-950/20 transition">
                    <div className="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center shadow-xl">
                      <PlayCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </>
              ) : (
                /* uploaded video */
                <div className="absolute inset-0">
                  <video
                    src={m.url}
                    className="w-full h-full object-cover"
                    preload="metadata"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-950/40 group-hover:bg-gray-950/30 transition">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 text-gray-900 ml-0.5" />
                    </div>
                  </div>
                </div>
              )}

              {m.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-gray-950/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition">
                  <p className="text-white text-xs truncate">{m.caption}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      {open && lightboxItems.length > 0 && current && (
        <div
          className="fixed inset-0 z-50 bg-gray-950/95 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/80 text-white hover:bg-gray-700 transition z-10"
            onClick={() => setOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          {lightboxItems.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-800/80 text-white hover:bg-gray-700 transition z-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Content */}
          <div
            className="relative max-w-5xl w-full flex items-center justify-center"
            style={{ maxHeight: "85vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {current.type === "image" && (
              <div className="relative w-full" style={{ maxHeight: "85vh", aspectRatio: "16/9" }}>
                <Image
                  src={current.url}
                  alt={current.caption ?? current.filename}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={85}
                  priority
                />
              </div>
            )}

            {current.type === "youtube" && (
              <div className="w-full" style={{ aspectRatio: "16/9" }}>
                <iframe
                  src={`${current.url}?autoplay=1&rel=0`}
                  title={current.caption ?? current.filename}
                  className="w-full h-full rounded-lg"
                  style={{ minHeight: "280px" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {current.type === "video" && (
              <video
                src={current.url}
                controls
                autoPlay
                className="max-w-full max-h-[85vh] rounded-lg outline-none"
              />
            )}
          </div>

          {/* Next */}
          {lightboxItems.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-800/80 text-white hover:bg-gray-700 transition z-10"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Counter + caption */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            {current.caption && (
              <p className="text-gray-200 text-sm mb-1">{current.caption}</p>
            )}
            {lightboxItems.length > 1 && (
              <p className="text-gray-500 text-xs">
                {index + 1} / {lightboxItems.length}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
