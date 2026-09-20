"use client";

import React, { useEffect, useRef, useState } from "react";
import ParallelogramButton from "@/components/ui/ParallelogramButton";

interface ProductCard {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  isExternal?: boolean;
  ctaVariant: "white" | "silver" | "gold";
  colorClass: string;
  badgeClass: string;
}

const PRODUCTS: ProductCard[] = [
  {
    id: "marketplace",
    tag: "Product 01",
    title: "Marketplace",
    subtitle: "Global Aircraft Trading & Intelligence Platform",
    description:
      "A high-liquidity digital marketplace indexing thousands of commercial and executive jets with verified maintenance records, verified ownership, and seamless transaction settlement.",
    features: [
      "5,000+ Curated Aircraft Profiles",
      "Cryptographic Airframe Verification",
      "Instant Escrow & Valuation Telemetry",
    ],
    ctaLabel: "Sign Up for Portal",
    ctaHref: "https://app.m-1.tech",
    isExternal: true,
    ctaVariant: "white",
    colorClass: "bg-[#181614] border-[#3d372e] text-[#f5efeb]",
    badgeClass: "bg-[#2e281f] text-[#d6c4a8] border-[#473e31]",
  },
  {
    id: "saios",
    tag: "Product 02",
    title: "SAIOS",
    subtitle: "Super Artificially Intelligent Operating System",
    description:
      "The world's premier neural flight deck and fleet management system. Powered by predictive maintenance diagnostics and automated FAA/EASA airworthiness tracking.",
    features: [
      "Real-time Predictive Airframe Telemetry",
      "Autonomous Dispatch & Scheduling Engine",
      "Unified Digital Logbook & Passport",
    ],
    ctaLabel: "Explore SAIOS",
    ctaHref: "/saios",
    ctaVariant: "silver",
    colorClass: "bg-[#0f141c] border-[#1f2d3d] text-[#e8f0fe]",
    badgeClass: "bg-[#162333] text-[#93b4d7] border-[#253d5a]",
  },
  {
    id: "ecosystem",
    tag: "Product 03",
    title: "Ecosystem",
    subtitle: "Unified Aviation Infrastructure Alliance",
    description:
      "Bridging the disconnect between aircraft operators, maintenance repair organizations (MROs), and parts suppliers into one continuous real-time operating fabric.",
    features: [
      "OEM & Operator Alliance Protocol",
      "Direct Priority Maintenance Channels",
      "Integrated Aviation Times Media Hub",
    ],
    ctaLabel: "Become Part of the Vision",
    ctaHref: "/industry-partner",
    ctaVariant: "gold",
    colorClass: "bg-[#151516] border-[#38383a] text-white",
    badgeClass: "bg-[#252528] text-zinc-300 border-zinc-600",
  },
];

export default function OurLineup() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastActiveIndex = useRef<number>(-1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play gentle, futuristic aerospace chime on card transition
  const playCardSound = (cardIndex: number) => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Smooth custom frequencies for each card
      // Card 0: 440Hz -> 660Hz (Warm chime)
      // Card 1: 523Hz -> 784Hz (Tech pulse)
      // Card 2: 587Hz -> 880Hz (Harmonic resolution)
      const baseFreqs = [440, 523, 587];
      const targetFreqs = [660, 784, 880];
      const base = baseFreqs[cardIndex] ?? 440;
      const target = targetFreqs[cardIndex] ?? 660;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const now = ctx.currentTime;

      osc.frequency.setValueAtTime(base, now);
      osc.frequency.exponentialRampToValueAtTime(target, now + 0.12);

      // Very gentle volume envelope (max ~0.065)
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.065, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.33);
    } catch {
      // Graceful fallback if audio is blocked
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Sticky top-28 corresponds to ~112px from viewport top
      const stickyThreshold = 140;

      // Detect which card is currently active/stacked at top
      let activeIdx = -1;
      for (let i = cardRefs.current.length - 1; i >= 0; i--) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= stickyThreshold + 25 && rect.bottom > stickyThreshold) {
          activeIdx = i;
          break;
        }
      }

      if (activeIdx !== -1 && activeIdx !== lastActiveIndex.current) {
        lastActiveIndex.current = activeIdx;
        playCardSound(activeIdx);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [soundEnabled]);

  return (
    <section className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mt-2">
          Our Lineup
        </h2>

        {/* Audio FX Status Badge */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            type="button"
            onClick={() => {
              // Unlock AudioContext on first click if needed
              if (
                !audioCtxRef.current &&
                typeof window !== "undefined"
              ) {
                const AudioContextClass =
                  window.AudioContext ||
                  (window as unknown as { webkitAudioContext: typeof AudioContext })
                    .webkitAudioContext;
                if (AudioContextClass) {
                  audioCtxRef.current = new AudioContextClass();
                }
              }
              if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
                audioCtxRef.current.resume();
              }
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) {
                playCardSound(0);
              }
            }}
            className="text-[11px] font-mono tracking-wider px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer select-none"
            aria-label="Toggle card scroll audio effect"
          >
            <span>{soundEnabled ? "🔊" : "🔇"}</span>
            <span>Card Sound: {soundEnabled ? "On" : "Muted"}</span>
          </button>
        </div>
      </div>

      {/* Stacked Cards */}
      <div className="space-y-12">
        {PRODUCTS.map((prod, index) => (
          <div
            key={prod.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`sticky top-28 rounded-2xl border p-8 md:p-14 shadow-2xl transition-all duration-300 ${prod.colorClass}`}
            style={{
              zIndex: index + 10,
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-4">
                <h3 className="text-3xl md:text-4xl font-light tracking-tight">
                  {prod.title}
                </h3>

                <h4 className="text-sm font-medium text-zinc-300 font-mono">
                  {prod.subtitle}
                </h4>

                <p className="text-sm text-zinc-400 leading-relaxed pt-1">
                  {prod.description}
                </p>

                <div className="pt-3">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300 font-mono">
                    {prod.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-zinc-500">›</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Column */}
              <div className="flex flex-col items-start lg:items-end justify-center shrink-0 pt-4 lg:pt-0">
                <ParallelogramButton
                  href={prod.ctaHref}
                  isExternal={prod.isExternal}
                  variant={prod.ctaVariant}
                  className="w-full sm:w-auto text-sm py-4 px-8"
                >
                  {prod.ctaLabel}
                </ParallelogramButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
