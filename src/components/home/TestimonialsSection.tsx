"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import SectionReveal from "@/components/SectionReveal";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="section-py bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionReveal className="mb-16 text-center">
          <p className="eyebrow mb-3">What They Say</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#1A1F35]">
            Client Testimonials
          </h2>
        </SectionReveal>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative"
            >
              {/* Large decorative quote */}
              <Quote
                size={80}
                className="text-[#C9A96E]/15 absolute -top-4 -left-2 lg:-left-8"
                strokeWidth={1}
              />
              <blockquote className="relative z-10 pt-8">
                <p className="font-serif text-xl lg:text-2xl text-[#1A1F35] leading-relaxed text-center mb-10">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="flex flex-col items-center gap-1">
                  <div className="w-10 h-px bg-[#C9A96E] mb-4" />
                  <cite className="not-italic font-serif text-base font-bold text-[#1A1F35]">
                    {t.author}
                  </cite>
                  <p className="text-sm text-[#1A1F35]/50">
                    {t.title} — {t.company}
                  </p>
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-11 h-11 border border-[#1A1F35]/20 flex items-center justify-center text-[#1A1F35]/40 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`transition-all duration-300 h-1 rounded-full ${
                    i === current ? "w-8 bg-[#C9A96E]" : "w-3 bg-[#1A1F35]/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-11 h-11 border border-[#1A1F35]/20 flex items-center justify-center text-[#1A1F35]/40 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
