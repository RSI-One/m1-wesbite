import React from "react";

export default function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full max-w-5xl mx-auto flex items-center justify-center py-6 px-6 pointer-events-none opacity-40 select-none ${className}`}
    >
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div className="mx-4 flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-zinc-800" />
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
        <span className="w-1 h-1 rounded-full bg-zinc-800" />
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </div>
  );
}
