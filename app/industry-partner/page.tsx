"use client";

import React from "react";
import ParallelogramButton from "@/components/ui/ParallelogramButton";
import PlayYourRoleCTA from "@/components/ui/PlayYourRoleCTA";
import { PARTNERS_ROSTER } from "@/data/partners";

const ENGAGEMENT_ITEMS = [
  {
    title: "Geneva Executive Aviation Summit",
    location: "Geneva, Switzerland",
    date: "Q2 2026",
    summary:
      "Strategic roundtable with tier-1 jet operators aligning SAIOS autonomous airframe diagnostics with European business aviation workflows.",
    category: "Symposium",
  },
  {
    title: "North American Fleet Efficiency Trials",
    location: "Dallas / Fort Worth, TX",
    date: "Q3 2026",
    summary:
      "Field trials verifying automated flight telemetry capture and FAA digital airworthiness synchronization across 40 corporate jet airframes.",
    category: "Operational Trial",
  },
  {
    title: "Transatlantic MRO Digital Protocol",
    location: "London Luton Airport, UK",
    date: "Q4 2026",
    summary:
      "Ratifying interoperability standards with leading MROs for streamlined avionics component replacement and direct escrow clearance.",
    category: "MRO Alliance",
  },
];

export default function IndustryPartnerPage() {
  return (
    <div className="w-full flex flex-col items-center pt-24 pb-12">
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-block text-[11px] font-mono tracking-[0.3em] uppercase text-zinc-500">
            Global Operator Network
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-9xl font-extralight tracking-tight text-white">
            Industry Partner
          </h1>

          <p className="text-sm sm:text-base font-light text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Collaborating with world-class aircraft operators, avionics suppliers, and MROs to forge an interconnected sovereign flight ecosystem.
          </p>

          <div className="pt-6">
            <ParallelogramButton href="/#contact" variant="gold" className="text-xs px-10 py-4">
              Apply for Partnership
            </ParallelogramButton>
          </div>
        </div>

        {/* Partner Logo Ticker at Bottom of Hero */}
        <div className="w-full max-w-5xl mt-16 pt-8 border-t border-zinc-800/80">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 mb-6">
            Alliance Members & Operators
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {PARTNERS_ROSTER.map((partner) => (
              <div
                key={partner.id}
                className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 text-center flex flex-col items-center justify-center hover:border-zinc-600 transition-colors"
              >
                <span className="text-xs font-semibold text-zinc-200 tracking-wider">
                  {partner.name}
                </span>
                <span className="text-[9px] font-mono text-zinc-500 mt-1">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Partner Engagement Gallery (White Background Section) */}
      <section className="w-full bg-white text-black py-28 px-6 md:px-12 my-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
              Field Operations & Summits
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-900 mt-2">
              Partner Engagement Gallery
            </h2>
            <p className="text-sm text-zinc-600 mt-2 font-mono">
              Documenting joint engineering initiatives and worldwide executive roundtables.
            </p>
          </div>

          {/* Responsive Gallery Carousel / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {ENGAGEMENT_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-200 text-zinc-700">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">{item.date}</span>
                  </div>

                  <h3 className="text-xl font-light tracking-tight text-zinc-900 mb-2">
                    {item.title}
                  </h3>

                  <div className="text-xs font-mono text-zinc-500 mb-4">
                    📍 {item.location}
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Temporary Image / Blueprint Placeholder */}
                <div className="mt-6 pt-4 border-t border-zinc-200">
                  <div className="w-full h-32 rounded-lg bg-zinc-200/80 border border-zinc-300 flex flex-col items-center justify-center text-zinc-500 text-xs font-mono">
                    <span>[ Summit Photo Slot ]</span>
                    <span className="text-[10px] text-zinc-400 mt-1">
                      Ready for High-Res Media
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Reused Play Your Role CTA */}
      <PlayYourRoleCTA />
    </div>
  );
}
