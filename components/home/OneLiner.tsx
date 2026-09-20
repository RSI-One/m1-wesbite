import React from "react";

export default function OneLiner() {
  return (
    <section
      aria-label="Core Philosophy"
      className="relative py-36 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden border-y border-zinc-900 bg-black"
    >
      {/* Background glow & subtle aeronautical grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white leading-tight">
          <span className="font-semibold text-zinc-100">M1</span>
          <span className="text-zinc-500 font-light mx-3">=</span>
          <span className="text-zinc-200">Marketplace</span>
          <span className="text-zinc-500 font-light mx-3">+</span>
          <span className="text-zinc-200">Operating System</span>
        </p>
      </div>
    </section>
  );
}
