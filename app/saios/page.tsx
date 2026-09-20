"use client";

import React, { useState, useEffect } from "react";
import PlayYourRoleCTA from "@/components/ui/PlayYourRoleCTA";
import ParallelogramButton from "@/components/ui/ParallelogramButton";

const CORE_FUNCTIONS = [
  {
    num: "01",
    title: "Predictive Maintenance",
    desc: "Neural sensor algorithms foresee component stress cycles and turbine wear before scheduled inspection thresholds.",
  },
  {
    num: "02",
    title: "Streamlined Scheduling",
    desc: "Autonomous tail routing that dynamically aligns crew duty limits, fuel stops, and airport slot reservations.",
  },
  {
    num: "03",
    title: "Autonomous Monitoring",
    desc: "24/7 continuous airframe telemetry and avionics bus diagnostics streaming live to ground dispatch.",
  },
  {
    num: "04",
    title: "Compliance Monitoring",
    desc: "Automated FAA, EASA, and ICAO log synchronization with real-time auditability and airworthiness directive checks.",
  },
  {
    num: "05",
    title: "Digital Passport",
    desc: "Tamper-proof lifecycle registry tracking every component, serial number, overhaul history, and structural test.",
  },
  {
    num: "06",
    title: "Intelligent Operations",
    desc: "Unified mission planning hub integrating dispatchers, pilots, FBO ground handlers, and executive passengers.",
  },
];

const ACRONYM_ITEMS = [
  { letter: "S", word: "Super", desc: "Unprecedented compute density for flight envelope computation." },
  { letter: "A", word: "Artificially", desc: "Machine-learned diagnostic and weather routing models." },
  { letter: "I", word: "Intelligent", desc: "Autonomous decision heuristics trained on billions of air miles." },
  { letter: "O", word: "Operating", desc: "Low-latency real-time core interfacing directly with aircraft avionics." },
  { letter: "S", word: "System", desc: "A connected global grid linking aircraft, ground crews, and operators." },
];

export default function SaiosPage() {
  const [glitchActive, setGlitchActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGlitchActive(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center pt-24 pb-12">
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Subtle Tech Grid / Pixelation Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <h1
            className={`text-7xl sm:text-9xl md:text-[10rem] font-extralight tracking-tighter text-white transition-all duration-700 ${
              glitchActive
                ? "blur-sm opacity-60 scale-95 tracking-widest text-zinc-400"
                : "blur-none opacity-100 scale-100"
            }`}
          >
            SAIOS
          </h1>

          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-zinc-400 max-w-md mx-auto">
            Super Artificially Intelligent Operating System
          </p>

          <div className="pt-6">
            <ParallelogramButton href="#functions" variant="silver" className="text-xs">
              Explore Core Functions ↓
            </ParallelogramButton>
          </div>
        </div>
      </section>

      {/* 2. Core Functions Section (Motherboard Architecture) */}
      <section id="functions" className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white">
            6 Core Functions
          </h2>
        </div>

        {/* Semi-transparent Motherboard / Circuit Container */}
        <div className="relative rounded-3xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md p-8 md:p-14 overflow-hidden">

          {/* Center Brand Watermark on Desktop */}
          <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none opacity-5">
            <span className="text-[18rem] font-extralight tracking-tighter text-white font-mono">
              SAIOS
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_FUNCTIONS.map((func) => (
              <div
                key={func.num}
                className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800/80 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="mb-4">
                  <span className="inline-block text-[11px] font-mono tracking-widest text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                    {func.num}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{func.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{func.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Acronym Breakdown (Suspended in Clouds) */}
      <section className="relative py-28 px-6 md:px-12 max-w-5xl mx-auto w-full border-t border-zinc-900">
        {/* Cloud Atmosphere Elements */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white">
            The SAIOS Nomenclature
          </h2>
        </div>

        <div className="space-y-4">
          {ACRONYM_ITEMS.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-zinc-800/60 bg-zinc-950/40 hover:bg-zinc-900/40 transition-colors gap-4"
            >
              <div className="flex items-center gap-6">
                <span className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono text-xl font-semibold text-white">
                  {item.letter}
                </span>
                <span className="text-xl font-light text-white tracking-wide">
                  {item.word}
                </span>
              </div>
              <p className="text-xs text-zinc-400 sm:text-right max-w-md font-mono">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Founder Message Section */}
      <section className="relative py-24 px-6 md:px-12 max-w-4xl mx-auto w-full border-t border-zinc-900">
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Founder Portrait */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/founder.jpg"
            alt="Areez Rao – Founder & CEO"
            className="shrink-0 w-36 h-36 sm:w-44 sm:h-44 rounded-2xl object-cover object-top border border-zinc-700"
          />

          <div className="space-y-4 text-center md:text-left">
            <blockquote className="text-lg sm:text-xl font-light italic text-zinc-200 leading-relaxed">
              &ldquo;Our vision with RSI Studio is to lead with a perfection in pixels philosophy, in the international and national market.&rdquo;
            </blockquote>
            <div>
              <div className="text-sm font-semibold text-white">Areez Rao</div>
              <div className="text-xs text-zinc-400 font-mono">
                Founder & Chief Executive Officer, RSI Studio / M1 Ecosystem
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Play Your Role CTA */}
      <PlayYourRoleCTA />
    </div>
  );
}
