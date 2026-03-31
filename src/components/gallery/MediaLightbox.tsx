"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

interface MediaItem {
  id: string;
  type: string;
  url: string;
  filename: string;
  caption: string | null;
}

export default function MediaLightbox({ media }: { media: MediaItem[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = media.filter((m) => m.type === "image");

  function openAt(i: number) { setIndex(i); setOpen(true); }
  function prev() { setIndex((i) => (i - 1 + images.length) % images.length); }
  function next() { setIndex((i) => (i + 1) % images.length); }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") setOpen(false);
  }

  let imageCounter = 0;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {media.map((m) => {
          const isImage = m.type === "image";
          const imgIndex = isImage ? imageCounter++ : -1;

          return (
            <div
              key={m.id}
              className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-pointer group"
              onClick={() => isImage && openAt(imgIndex)}
            >
              {isImage ? (
                <Image
                  src={m.url}
                  alt={m.caption ?? m.filename}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0">
                  <video src={m.url} className="w-full h-full object-cover" preload="metadata" />
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-950/40">
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

      {open && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-gray-950/95 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/80 text-white hover:bg-gray-700 transition z-10" onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </button>
          {images.length > 1 && (
            <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-800/80 text-white hover:bg-gray-700 transition z-10" onClick={(e) => { e.stopPropagation(); prev(); }}>
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image src={images[index].url} alt={images[index].caption ?? images[index].filename} fill className="object-contain" unoptimized priority />
          </div>
          {images.length > 1 && (
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-800/80 text-white hover:bg-gray-700 transition z-10" onClick={(e) => { e.stopPropagation(); next(); }}>
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            {images[index].caption && <p className="text-gray-200 text-sm mb-1">{images[index].caption}</p>}
            <p className="text-gray-500 text-xs">{index + 1} / {images.length}</p>
          </div>
        </div>
      )}
    </>
  );
}
