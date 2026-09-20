"use client";

import React from "react";
import { PARTNERS_ROSTER } from "@/data/partners";

export default function PartnerStrip() {
  // Duplicate partner items to ensure infinite seamless loop across wide viewports
  const repeatedPartners = [
    ...PARTNERS_ROSTER,
    ...PARTNERS_ROSTER,
    ...PARTNERS_ROSTER,
    ...PARTNERS_ROSTER,
  ];

  return (
    <section
      aria-label="Industry Partners"
      className="relative w-full py-16 bg-black/60 border-b border-zinc-900/80 overflow-hidden select-none"
    >
      {/* Cloud-like fade mask at left & right ends for seamless edge blending */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 z-20 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 z-20 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />

      {/* Top Section Metadata */}
      <div className="max-w-7xl mx-auto px-6 mb-6 flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-500">
          Industry Alliances & Operators
        </span>
        <span className="text-[10px] font-mono text-zinc-600 hidden sm:inline">
          Verified Global Network
        </span>
      </div>

      {/* Continuous Marquee moving from Left to Right */}
      <div className="relative w-full overflow-hidden flex items-center py-3">
        <div className="flex items-center gap-6 sm:gap-8 w-max animate-marquee-ltr cursor-default">
          {repeatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex items-center gap-3 shrink-0 px-6 py-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-800/60 hover:border-zinc-700 transition-all duration-200"
            >
              <div className="w-2 h-2 rounded-sm bg-zinc-400 shadow-[0_0_6px_rgba(255,255,255,0.3)]" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-zinc-200 tracking-wider uppercase whitespace-nowrap">
                  {partner.name}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 whitespace-nowrap">
                  {partner.tagline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Telemetry Bar Moving from Left to Right */}
      <div className="max-w-5xl mx-auto px-6 mt-8">
        <div className="relative w-full h-[2px] bg-zinc-900/90 rounded-full overflow-hidden">
          {/* Glowing bar moving continuously from left to right */}
          <div className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-sweep-ltr shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
        </div>
        <div className="flex justify-between items-center text-[9px] font-mono text-zinc-600 uppercase tracking-widest mt-2 px-1">
          <span>TX-01 / Global Broadcast</span>
          <span className="flex items-center gap-1.5 text-zinc-500">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
            Live Alliance Stream
          </span>
          <span>RX-88 / Continuous Sync</span>
        </div>
      </div>
    </section>
  );
}
