"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string; // e.g. "302"
  suffix: string; // e.g. "+", "K+ sqm"
  label: string;
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

export default function AnimatedCounter({ value, suffix, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [displayed, setDisplayed] = useState("0");
  const numericValue = parseInt(value, 10);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isInView || hasRun.current) return;
    hasRun.current = true;

    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = Math.round(eased * numericValue);
      setDisplayed(current.toString());
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, numericValue]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-serif text-5xl lg:text-6xl font-bold text-white leading-none">
        {displayed}
        <span className="text-[#C9A96E] text-3xl lg:text-4xl">{suffix}</span>
      </p>
      <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 font-medium mt-3">
        {label}
      </p>
    </div>
  );
}
