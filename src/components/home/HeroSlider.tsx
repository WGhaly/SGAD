"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { heroSlides } from "@/lib/data";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent((index + heroSlides.length) % heroSlides.length);
    },
    []
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

  const slideVariants = {
    enter: (d: number) => ({
      opacity: 0,
      scale: 1.04,
      x: d > 0 ? "3%" : "-3%",
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: "0%",
      transition: { duration: 1.1, ease: EASE },
    },
    exit: (d: number) => ({
      opacity: 0,
      scale: 0.98,
      x: d > 0 ? "-3%" : "3%",
      transition: { duration: 0.8, ease: EASE },
    }),
  };

  const textVariants: Variants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  const slide = heroSlides[current];

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-[#0A0A0C]">
      {/* Background images */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.headline}
            fill
            priority={current === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C]/85 via-[#0A0A0C]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Text content */}
      <div className="relative z-10 h-full flex items-end pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="max-w-2xl"
            >
              <p className="eyebrow mb-5">
                Al Safwa Group for Architecture &amp; Decoration
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 whitespace-pre-line">
                {slide.headline}
              </h1>
              <p className="text-white/60 text-base lg:text-lg mb-10 max-w-md">
                {slide.sub}
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-3 bg-[#C9A96E] text-[#0A0A0C] text-[11px] tracking-[0.2em] uppercase font-semibold px-7 py-3.5 hover:bg-[#E8C98A] transition-colors group"
                >
                  Explore Work
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="text-[11px] tracking-[0.2em] uppercase font-medium text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  Start a Project <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide counter + arrows */}
      <div className="absolute bottom-10 right-6 lg:right-10 z-10 flex items-center gap-5">
        <span className="text-[11px] tracking-[0.2em] text-white/40 font-medium">
          {String(current + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-10 left-6 lg:left-10 z-10 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 ${
              i === current
                ? "w-8 h-1 bg-[#C9A96E]"
                : "w-4 h-1 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-[#C9A96E] animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
