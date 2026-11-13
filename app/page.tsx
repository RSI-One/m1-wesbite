"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import SectionFocusItem from "@/components/home/SectionFocusItem";
import SectionDivider from "@/components/home/SectionDivider";

// ── Below-the-fold components dynamically code-split for sub-second initial load & reduced JS payload ──
const OurLineup = dynamic(() => import("@/components/home/OurLineup"));
const FullStackDeck = dynamic(() => import("@/components/home/FullStackDeck"), { ssr: false });
const MarketIntelligenceSection = dynamic(() => import("@/components/home/MarketIntelligenceSection"));
const ScrollFlightJet = dynamic(() => import("@/components/home/ScrollFlightJet"), { ssr: false });
const OneLiner = dynamic(() => import("@/components/home/OneLiner"));
const PartnerStrip = dynamic(() => import("@/components/home/PartnerStrip"));
const VisionTimeline = dynamic(() => import("@/components/home/VisionTimeline"));
const ContactSection = dynamic(() => import("@/components/home/ContactSection"));

export default function Home() {
  return (
    <>
      {/* Main site */}
      <div className="w-full flex flex-col items-center">
        {/* 1. Fullscreen Cinematic Hero */}
        <Hero />

        {/* 2. M1: Market Intelligence */}
        <div className="relative z-20 w-full">
          <MarketIntelligenceSection />
        </div>

        {/* 3. Stacked Products Lineup with Card Scroll Sound Effects */}
        <div id="lineup" className="relative z-20 w-full">
          <OurLineup />
        </div>

        {/* 3b. The Full Stack: 4-Cards Fanned Perspective Deck (Desktop only to prevent card fatigue on mobile) */}
        <div id="fullstack" className="hidden lg:block relative z-10 w-full">
          <FullStackDeck />
        </div>

        <SectionDivider />

        {/* 3D Flying Jet connecting Ecosystem -> Logos -> Vision Timeline (Desktop only to prevent mobile clutter/slowdown) */}
        <div className="hidden lg:block">
          <ScrollFlightJet />
        </div>

        {/* 3. M1 One-Liner Statement */}
        <div id="philosophy" className="relative z-20 w-full">
          <OneLiner />
        </div>

        {/* 4. Industry Partner Logo Strip (Crisp, fully legible, z-30 in front of flying jet) */}
        <div id="partners" className="relative z-30 w-full">
          <PartnerStrip />
        </div>

        {/* Dedicated scroll corridor for cinematic 3D flight maneuver (Desktop only) */}
        <div id="flight-corridor" className="hidden lg:block relative w-full h-[65vh] pointer-events-none" />

        {/* 5. 10-Year Vision Timeline */}
        <SectionFocusItem id="vision">
          <VisionTimeline />
        </SectionFocusItem>

        {/* 6. Contact & Meeting Booking Section (Static watermark jet embedded in form) */}
        <SectionFocusItem id="contact">
          <ContactSection />
        </SectionFocusItem>
      </div>
    </>
  );
}
