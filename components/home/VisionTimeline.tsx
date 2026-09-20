"use client";

import React, { useState, useEffect } from "react";
import { VISION_MILESTONES, VISION_DURATION_MS } from "@/data/vision";

export default function VisionTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % VISION_MILESTONES.length);
    }, VISION_DURATION_MS);

    return () => clearInterval(timer);
  }, [isPaused]);

  const activeMilestone = VISION_MILESTONES[activeIndex];
  const isEven = activeIndex % 2 === 0;

  return (
    <section
      aria-label="10-Year Vision"
      className="relative py-32 px-6 md:px-12 max-w-5xl mx-auto overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
          The 10-Year Vision
        </h2>
      </div>

      {/* Interactive Alternating Spotlight Display */}
      <div className="relative min-h-[280px] sm:min-h-[240px] flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-black shadow-2xl">
        {/* Spotlight Radial Flare */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.06),transparent_65%)] pointer-events-none" />

        {/* Central Year Badge */}
        <div className="relative z-10 flex items-center justify-center mb-6">
          <div className="px-6 py-2 rounded-full border border-zinc-700 bg-black/80 shadow-lg text-2xl sm:text-3xl font-mono font-light tracking-widest text-white">
            {activeMilestone.year}
          </div>
        </div>

        {/* Statement with alternating Right/Left alignment animation */}
        <div
          key={activeMilestone.year}
          className={`relative z-10 w-full max-w-2xl transition-all duration-700 ease-out ${
            isEven ? "text-center sm:text-right" : "text-center sm:text-left"
          }`}
        >
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
            Milestone {activeIndex + 1} of {VISION_MILESTONES.length}
          </div>
          <p className="text-lg sm:text-2xl font-light text-zinc-200 leading-relaxed">
            &ldquo;{activeMilestone.statement}&rdquo;
          </p>
        </div>

        {/* Timeline Navigation Indicators */}
        <div className="relative z-10 mt-10 flex items-center gap-3">
          {VISION_MILESTONES.map((m, idx) => (
            <button
              key={m.year}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Jump to year ${m.year}`}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === activeIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-zinc-700 hover:bg-zinc-500"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-6 text-[11px] font-mono text-zinc-600">
        {isPaused ? "Paused" : ""}
      </div>
    </section>
  );
}
