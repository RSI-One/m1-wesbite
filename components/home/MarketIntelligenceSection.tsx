"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ParallelogramButton from "@/components/ui/ParallelogramButton";

export default function MarketIntelligenceSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedText, setSubmittedText] = useState("");

  return (
    <section
      id="market-intelligence"
      aria-label="M1 Market Intelligence"
      className="relative w-full pt-16 sm:pt-20 lg:pt-24 pb-36 sm:pb-40 px-4 sm:px-6 lg:px-10 bg-[#07080B] text-[#F2F2F0] select-none overflow-hidden"
    >
      {/* ── Realistic Cinematic Aviation Hangar Atmosphere (Full Section Backdrop) ── */}
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/mi-hangar-bg.jpg"
          alt="Luxury subterranean aerospace showroom and hangar"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.70] contrast-105"
          priority={false}
        />

        {/* Ambient Dark Scrims: Enhances readability while preserving floor reflections & side architectural LED lines */}
        <div className="absolute inset-0 bg-[#07080B]/60 backdrop-blur-[0.5px]" />
        {/* Deep Solid Dark Top: Extends across entire header region to eliminate distracting background lights behind text */}
        <div className="absolute inset-x-0 top-0 h-[480px] lg:h-[540px] bg-gradient-to-b from-[#07080B] via-[#07080B]/95 to-transparent z-[1]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#07080B] via-[#07080B]/75 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-28 sm:w-44 bg-gradient-to-r from-[#07080B]/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-28 sm:w-44 bg-gradient-to-l from-[#07080B]/90 to-transparent" />
      </div>

      {/* ── Main Section Content: 90-92% Desktop Viewport Width ── */}
      <div className="relative z-10 w-[92vw] max-w-[1400px] xl:max-w-[1440px] mx-auto flex flex-col gap-8 sm:gap-10">
        {/* ── Header: Left-Aligned Identity & Upper-Right Actions (Exact Ref 1 Layout) ── */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-2">
          {/* Left Column: Eyebrow, Heading (~56px), 2-Line Soft Neutral Description */}
          <div className="max-w-3xl space-y-3.5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="-skew-x-12 inline-flex items-center px-3 py-0.5 border border-white/40 bg-zinc-950">
                <span className="skew-x-12 text-[10px] font-mono font-bold tracking-[0.24em] uppercase text-white">
                  Coming Soon
                </span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-light tracking-tight text-[#F2F2F0] leading-[1.06]">
              M1: Market Intelligence
            </h2>

            {/* Original Copy: 2 Clean Wide Lines on Desktop in Soft Neutral-Grey (~18-20px) */}
            <p className="text-sm sm:text-base lg:text-[18px] xl:text-[19px] text-[#9DA2AB] font-light leading-relaxed">
              M1 Marketplace is now introducing cutting edge market intelligence features, enabling brokers to keep an eye on whole aviation market, discover opportunities, get leads and use multiple ai bots to interact and optimize market signals according to there needs.
            </p>
          </div>

          {/* Upper-Right Column: Primary Champagne CTA + Secondary CTA */}
          <div className="flex flex-col items-start lg:items-end gap-3 shrink-0 lg:pt-1">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#E8DCC4] hover:bg-[#F2E8D4] text-[#121417] text-xs font-mono font-bold tracking-[0.16em] uppercase shadow-[0_0_24px_rgba(217,193,139,0.35)] transition-all duration-300"
              >
                Enter Intelligence Terminal ↗
              </Link>

              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-xs font-mono tracking-[0.16em] uppercase text-[#F2F2F0] transition-all duration-300 backdrop-blur-md"
              >
                Schedule Private Demo
              </Link>
            </div>
          </div>
        </div>

        {/* ── Central Wide Flight Radar Terminal Card ── */}
        <div className="relative w-full rounded-2xl border border-[#32363E] bg-[#0A0D14]/90 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden aspect-[2392/708] group">
          <Image
            src="/images/mi-radar-terminal-cropped.png"
            alt="M1 Market Intelligence Atlantic Corridor Flight Radar Terminal"
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover object-center brightness-100 contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            priority
          />

          {/* Subtle atmospheric ambient telemetry glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(35,217,138,0.03)_0%,transparent_70%)]"
          />
        </div>

        {/* ── 4 Intelligence Cards (Metallic Charcoal Panels, Consistent Dimensions & Aligned Bottoms) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {/* ── Card 01: Broker Shield (Exact High-Res Dashboard Card Image) ── */}
          <div className="relative rounded-2xl border border-[#32363E] bg-[#16181D] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_20px_50px_rgba(0,0,0,0.65)] overflow-hidden aspect-[1224/840] flex items-center justify-center transition-all duration-300 hover:border-white/30 group">
            <Image
              src="/images/mi-card-broker-shield-v2.png"
              alt="01 // BROKER SHIELD - 01-Year Money-Back Guarantee"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
              priority
            />
          </div>

          {/* ── Card 02: Airframe Registry (Exact High-Res Dashboard Card Image) ── */}
          <div className="relative rounded-2xl border border-[#32363E] bg-[#16181D] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_20px_50px_rgba(0,0,0,0.65)] overflow-hidden aspect-[1224/840] flex items-center justify-center transition-all duration-300 hover:border-white/30 group">
            <Image
              src="/images/mi-card-airframe-registry.png"
              alt="02 // AIRFRAME REGISTRY - 300,000+ Datasets"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
              priority
            />
          </div>

          {/* ── Card 03: Live SIOS Telemetry (Original Active & Moving Radar Scanner) ── */}
          <div className="relative rounded-2xl border border-[#32363E] bg-gradient-to-b from-[#212429] via-[#1A1C20] to-[#131518] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_20px_50px_rgba(0,0,0,0.65)] p-5 xl:p-6 flex flex-col justify-between aspect-[1224/840] transition-all duration-300 hover:border-white/30">
            <div className="flex items-center justify-between">
              <span className="text-[10px] xl:text-[11px] font-mono tracking-[0.24em] uppercase text-[#9DA2AB]">
                03 / LIVE SIOS TELEMETRY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#23D98A] shadow-[0_0_8px_#23D98A] animate-ping" />
            </div>

            {/* Active Moving Radar + Live SIOS Stream Readout */}
            <div className="flex items-center gap-3.5 my-auto">
              {/* ── Active 360° Rotating Radar Scanner ── */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#03130C] border border-[#23D98A]/40 shadow-[0_0_18px_rgba(35,217,138,0.25)] flex items-center justify-center shrink-0 overflow-hidden">
                {/* Concentric Range Rings */}
                <span className="absolute inset-1.5 rounded-full border border-[#23D98A]/30" />
                <span className="absolute inset-3.5 rounded-full border border-[#23D98A]/45" />
                <span className="absolute inset-5 rounded-full border border-[#23D98A]/60" />

                {/* Crosshair grid lines */}
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#23D98A]/25" />
                <span className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#23D98A]/25" />

                {/* 360° Rotating Radar Sweep Wedge */}
                <div
                  className="absolute inset-0 rounded-full animate-[spin_2.8s_linear_infinite] pointer-events-none"
                  style={{
                    background:
                      "conic-gradient(from 0deg, rgba(35, 217, 138, 0.75) 0deg, rgba(35, 217, 138, 0.25) 35deg, transparent 70deg, transparent 360deg)",
                  }}
                />

                {/* Active Aircraft Radar Blip (Detected Target) */}
                <span className="absolute top-[26%] right-[24%] w-1.5 h-1.5 rounded-full bg-[#23D98A] shadow-[0_0_8px_#23D98A] animate-pulse" />
                <span className="absolute bottom-[28%] left-[26%] w-1 h-1 rounded-full bg-[#23D98A]/80 animate-ping" />

                {/* Center Origin Node */}
                <span className="relative w-2 h-2 rounded-full bg-[#23D98A] shadow-[0_0_10px_#23D98A] z-10" />
              </div>

              {/* Telemetry Metric & Live Pill */}
              <div className="space-y-1 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#23D98A]/10 border border-[#23D98A]/40 backdrop-blur-md shadow-[0_0_14px_rgba(35,217,138,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#23D98A] animate-ping" />
                  <span className="text-[10px] xl:text-[11px] font-mono font-bold tracking-[0.18em] text-[#23D98A] uppercase">
                    Live SIOS Stream
                  </span>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#F2F2F0] leading-tight">
                    LIVE DATA
                  </div>
                  <div className="text-[11px] xl:text-xs text-[#9DA2AB] font-light truncate">
                    From M1 SIOS Operators
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-0.5 pt-3 xl:pt-3.5 border-t border-white/10 text-left">
              <div className="flex items-center justify-between">
                <h3 className="text-xs xl:text-[13px] text-[#F2F2F0] font-medium leading-snug">
                  Active avionics status
                </h3>
                <span className="text-[9px] font-mono text-[#23D98A] tracking-wider uppercase font-semibold">
                  SYNCED
                </span>
              </div>
              <p className="text-[11px] xl:text-xs text-[#9DA2AB] leading-relaxed font-light">
                Maintenance dispatch readiness
              </p>
            </div>
          </div>

          {/* ── Card 04: AI Broker Copilot (Actual Interactive Search Card) ── */}
          <div className="relative rounded-2xl border border-[#32363E] bg-gradient-to-b from-[#212429] via-[#1A1C20] to-[#131518] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_20px_50px_rgba(0,0,0,0.65)] p-5 xl:p-6 flex flex-col justify-between aspect-[1224/840] transition-all duration-300 hover:border-white/30">
            <div className="flex items-center justify-between">
              <span className="text-[10px] xl:text-[11px] font-mono tracking-[0.24em] uppercase text-[#9DA2AB]">
                04 / AI BROKER COPILOT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C58AFF] shadow-[0_0_8px_#C58AFF]" />
            </div>

            {/* Interactive Search Input & Prompt Chips */}
            <div className="space-y-2.5 my-auto text-left">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    setIsSubmitted(true);
                    setSubmittedText(searchQuery.trim());
                  }
                }}
                className="relative flex items-center w-full"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (isSubmitted) setIsSubmitted(false);
                  }}
                  placeholder="Interactive AI query bar..."
                  className="w-full py-2 pl-3 pr-8 rounded-xl bg-[#14161B] border border-white/20 text-[11px] xl:text-xs font-mono text-[#F2F2F0] placeholder:text-[#9DA2AB]/60 focus:outline-none focus:border-[#C58AFF] focus:ring-1 focus:ring-[#C58AFF]/50 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  aria-label="Submit search query"
                  className="absolute right-2 p-1 text-zinc-400 hover:text-[#C58AFF] transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>

              {/* Clickable Quick Prompt Chips / Suggestions */}
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => {
                    const q = "Automated broker lead discovery";
                    setSearchQuery(q);
                    setSubmittedText(q);
                    setIsSubmitted(true);
                  }}
                  className="w-full text-left flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#C58AFF]/40 text-[11px] text-[#C5C7C9] hover:text-white transition-all cursor-pointer group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C58AFF] shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="truncate">Automated broker lead discovery</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const q = "Off-market aircraft matching signals";
                    setSearchQuery(q);
                    setSubmittedText(q);
                    setIsSubmitted(true);
                  }}
                  className="w-full text-left flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#C58AFF]/40 text-[11px] text-[#C5C7C9] hover:text-white transition-all cursor-pointer group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C58AFF] shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="truncate">Off-market aircraft matching signals</span>
                </button>
              </div>

              {/* Live Search Response Feedback Pill */}
              {isSubmitted && (
                <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-[#C58AFF]/15 border border-[#C58AFF]/35 text-[10px] font-mono text-[#E2C7FF]">
                  <span className="truncate">⚡ Signals active: &quot;{submittedText}&quot;</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSearchQuery("");
                    }}
                    className="ml-1 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-0.5 pt-3 xl:pt-3.5 border-t border-white/10 text-left">
              <div className="flex items-baseline gap-2">
                <span className="text-xs sm:text-[13px] font-bold text-[#F2F2F0] tracking-wider uppercase leading-snug">
                  1 STEP
                </span>
                <span className="text-[11px] text-zinc-300 font-normal">
                  Toward M1 Ecosystem
                </span>
              </div>
              <p className="text-[10px] xl:text-[11px] text-[#9DA2AB] font-light truncate">
                Autonomous market signal optimization
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom Dedicated Centered CTA (Sitting Fully Clear of Bottom Navbar) ── */}
        <div className="pt-6 sm:pt-8 flex flex-col items-center justify-center">
          <ParallelogramButton
            href="/#contact"
            variant="white"
            className="py-3.5 px-12 sm:px-14 text-xs sm:text-sm font-bold tracking-[0.22em] shadow-[0_0_35px_rgba(255,255,255,0.25)] cursor-pointer"
          >
            Register Now ↗
          </ParallelogramButton>
        </div>
      </div>
    </section>
  );
}
