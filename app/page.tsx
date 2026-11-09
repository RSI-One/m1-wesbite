import Hero from "@/components/home/Hero";
import OurLineup from "@/components/home/OurLineup";
import FullStackDeck from "@/components/home/FullStackDeck";
import AviGramSection from "@/components/home/AviGramSection";
import OneLiner from "@/components/home/OneLiner";
import PartnerStrip from "@/components/home/PartnerStrip";
import VisionTimeline from "@/components/home/VisionTimeline";
import ScrollFlightJet from "@/components/home/ScrollFlightJet";
import ContactSection from "@/components/home/ContactSection";
import SectionFocusItem from "@/components/home/SectionFocusItem";
import SectionDivider from "@/components/home/SectionDivider";

export default function Home() {
  return (
    <>
      {/* Main site */}
      <div className="w-full flex flex-col items-center">
        {/* 1. Fullscreen Cinematic Hero */}
        <Hero />

        {/* 2. Stacked Products Lineup with Card Scroll Sound Effects */}
        <div id="lineup" className="relative z-20 w-full">
          <OurLineup />
        </div>

        {/* 2b. The Full Stack: 4-Cards Fanned Perspective Deck (Desktop only to prevent card fatigue on mobile) */}
        <div id="fullstack" className="hidden lg:block relative z-10 w-full">
          <FullStackDeck />
        </div>

        {/* 2c. M1 AviGram: The High-Altitude Aviation Social Network */}
        <SectionFocusItem id="avigram">
          <AviGramSection />
        </SectionFocusItem>

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
