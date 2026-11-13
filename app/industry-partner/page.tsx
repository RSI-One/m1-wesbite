"use client";

import React from "react";
import Image from "next/image";
import ParallelogramButton from "@/components/ui/ParallelogramButton";
import PlayYourRoleCTA from "@/components/ui/PlayYourRoleCTA";
import { ALL_LOGOS } from "@/components/home/PartnerStrip";
import PartnerEngagementCarousel from "@/components/industry/PartnerEngagementCarousel";

const ENGAGEMENT_CARDS = [
  {
    id: "geneva",
    tag: "Protocol 01",
    title: "Geneva Executive Aviation Summit",
    location: "Geneva, Switzerland",
    date: "Q2 2026",
    summary:
      "Strategic roundtable with tier-1 jet operators aligning SAIOS autonomous airframe diagnostics with European business aviation workflows.",
    category: "Symposium & Protocol",
    image: "/images/article-1.jpg",
    stats: "48 Operators • 340 Aircraft Managed",
    ctaLabel: "Review Delegation Protocol",
    cardStyle:
      "bg-[#1c232d] border-slate-300/65 shadow-[0_28px_65px_rgba(0,0,0,0.7)]",
    badgeStyle: "bg-slate-950 text-slate-100 border-slate-500/50",
    buttonVariant: "silver" as const,
  },
  {
    id: "north-america",
    tag: "Trial 02",
    title: "North American Fleet Efficiency Trials",
    location: "Dallas / Fort Worth, TX",
    date: "Q3 2026",
    summary:
      "Field trials verifying automated flight telemetry capture and FAA digital airworthiness synchronization across 40 corporate jet airframes.",
    category: "Operational Trial",
    image: "/images/article-2.jpg",
    stats: "99.8% Telemetry Accuracy • Zero AOG Incidents",
    ctaLabel: "Examine Trial Telemetry",
    cardStyle:
      "bg-[#0d2847] border-sky-400/65 shadow-[0_28px_65px_rgba(6,32,70,0.75)]",
    badgeStyle: "bg-[#07182e] text-sky-300 border-sky-400/45",
    buttonVariant: "silver" as const,
  },
  {
    id: "transatlantic",
    tag: "Alliance 03",
    title: "Transatlantic MRO Digital Protocol",
    location: "London Luton Airport, UK",
    date: "Q4 2026",
    summary:
      "Ratifying interoperability standards with leading MROs for streamlined avionics component replacement and direct escrow clearance.",
    category: "MRO Alliance",
    image: "/images/article-3.jpg",
    stats: "12 Certified Repair Facilities • Instant Escrow",
    ctaLabel: "Access MRO Framework",
    cardStyle:
      "bg-[#2b1745] border-violet-400/65 shadow-[0_28px_65px_rgba(40,14,72,0.75)]",
    badgeStyle: "bg-[#1a0d2b] text-violet-200 border-violet-400/45",
    buttonVariant: "silver" as const,
  },
];

const INDUSTRY_PARTNER_BENEFITS = [
  {
    num: "01",
    title: "A Voice in Innovation",
    desc: "Contribute perspectives and feedback on emerging innovations being developed by M1.",
  },
  {
    num: "02",
    title: "Access to the M1 Industry Circle",
    desc: "Join a network of aviation professionals and industry partners exchanging ideas and exploring opportunities.",
  },
  {
    num: "03",
    title: "Early Access",
    desc: "Gain early access to eligible M1 features and products as they become available.",
  },
  {
    num: "04",
    title: "Preferential Pricing",
    desc: "Access special pricing across eligible M1 products and services.",
  },
  {
    num: "05",
    title: "Shape Aviation's Future",
    desc: "Work with M1 to help inform the development of technologies designed for the next era of aviation.",
  },
  {
    num: "06",
    title: "Industry Partner Marketplace Tiers",
    desc: "Access dedicated M1 Marketplace tiers designed for industry partners.",
  },
  {
    num: "07",
    title: "First Approach to New Opportunities",
    desc: "Receive priority consideration for relevant opportunities within the M1 ecosystem, subject to availability and applicable terms.",
  },
];

export default function IndustryPartnerPage() {
  // Repeat 16x to guarantee uninterrupted infinite marquee across ultra-wide viewports
  const repeatedLogos = Array.from({ length: 16 }, () => ALL_LOGOS).flat();

  return (
    <div className="w-full flex flex-col items-center pt-24 pb-32 select-none">
      {/* ── 1. Hero Section ── */}
      <section className="relative w-full min-h-[55vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 border border-zinc-800 bg-zinc-950/80 rounded-full">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-400">
              Executive Alliance Network
            </span>
          </div>

          {/* Single-line text for Industry Partner */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-white whitespace-nowrap">
            Industry Partner
          </h1>

          <div className="pt-2">
            <ParallelogramButton href="/#contact" variant="silver" className="text-xs px-10 py-4 shadow-xl">
              Apply
            </ParallelogramButton>
          </div>
        </div>

        {/* ── Partner Logos Carousel (Clean, Plain Screen, Doubled Size, Bright White/Silver & Shine) ── */}
        <div
          aria-label="Industry Partners & Alliances"
          className="relative z-20 w-full mt-10 sm:mt-14 py-4 sm:py-6 overflow-hidden select-none group/marquee"
        >
          {/* ── Left Edge Blur & Fade ── */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-44 z-30 pointer-events-none bg-gradient-to-r from-black via-black/80 to-transparent" />

          {/* ── Right Edge Blur & Fade ── */}
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-44 z-30 pointer-events-none bg-gradient-to-l from-black via-black/80 to-transparent" />

          {/* Continuous Moving Logos Row */}
          <div className="relative w-full overflow-hidden">
            <div
              className="flex items-center gap-24 sm:gap-36 md:gap-44 lg:gap-52 w-max animate-marquee-rtl group-hover/marquee:[animation-play-state:paused] py-3"
              style={{ animationDuration: "80s" }}
            >
              {repeatedLogos.map((logo, i) => (
                <div
                  key={`industry-logo-${logo.id}-${i}`}
                  className="shrink-0 flex items-center justify-center cursor-pointer transition-transform duration-300 group/logo"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={400}
                    height={130}
                    className="object-contain max-h-[85px] sm:max-h-[110px] md:max-h-[125px] w-auto select-none pointer-events-none brightness-[2.0] contrast-[1.15] saturate-[1.2] opacity-95 group-hover/logo:opacity-100 group-hover/logo:scale-115 group-hover/logo:brightness-[2.8] group-hover/logo:drop-shadow-[0_0_24px_rgba(255,255,255,0.85)] group-hover/logo:drop-shadow-[0_0_12px_rgba(147,197,253,0.5)] transition-all duration-300 ease-out"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Partner Engagement Showcase: 3D Center-Peek Glide Carousel ── */}
      <PartnerEngagementCarousel cards={ENGAGEMENT_CARDS} />

      {/* ── 3. Industry Partner Benefits Section (Alliance Program) ── */}
      <section className="relative z-10 py-24 sm:py-32 px-6 md:px-12 max-w-6xl mx-auto w-full border-t border-zinc-900/80">
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-950/80 text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            <span>Alliance Program</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Industry Partner Benefits
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            Exclusive privileges, preferential access, and collaborative innovation opportunities for verified M1 partners.
          </p>
        </div>

        {/* Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRY_PARTNER_BENEFITS.map((b, idx) => (
            <div
              key={b.num}
              className={`group relative p-7 rounded-2xl border border-white/10 bg-[#0c0d12]/90 backdrop-blur-md hover:-translate-y-2 hover:border-zinc-400 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.08)] transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                idx === 6 ? "md:col-span-2 lg:col-span-3" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                    {b.num}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-white group-hover:shadow-[0_0_8px_#ffffff] transition-all duration-300" />
                </div>
                <h3 className="text-lg sm:text-xl font-light text-white tracking-tight group-hover:text-white transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {b.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500 group-hover:text-zinc-400">
                <span>M1 ALLIANCE PROTOCOL</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Play Your Role CTA ── */}
      <PlayYourRoleCTA />
    </div>
  );
}

