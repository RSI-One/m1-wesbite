import React from "react";
import ParallelogramButton from "./ParallelogramButton";

const BENEFITS = [
  "Early access to next-generation flight deck intelligence",
  "Exclusive industry partner network & executive roundtable access",
  "Featured operational case coverage in M1: Aviation Times",
  "Exclusive partnership discount on all current & future M1 solutions",
  "One full year of complimentary access to M1 SAIOS upon global launch",
];

export default function PlayYourRoleCTA({ className = "" }: { className?: string }) {
  return (
    <section
      aria-label="Partner Program"
      className={`relative py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-zinc-800/80 ${className}`}
    >
      <div className="relative z-10 bg-zinc-950 border border-zinc-800 p-8 md:p-14 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-mono mb-2">
            Partnership Opportunities
          </div>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-4">
            Play your role
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
            Become an M1 Industry Partner. If you are an aircraft operator, fleet manager, or aerospace OEM, join our exclusive alliance to co-pilot the next decade of intelligent aviation.
          </p>

          <div className="space-y-3 mb-2">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-300">
              Exclusive Partner Benefits:
            </div>
            <ul className="space-y-2 text-sm text-zinc-400">
              {BENEFITS.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-zinc-500 mt-1">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end justify-center w-full md:w-auto shrink-0">
          <ParallelogramButton href="/#contact" variant="gold" className="text-sm px-10 py-4">
            Apply Now
          </ParallelogramButton>
          <span className="text-[11px] text-zinc-500 font-mono mt-3">
            Review cycle: 2–3 business days
          </span>
        </div>
      </div>
    </section>
  );
}
