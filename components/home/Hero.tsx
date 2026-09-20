"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// Trim point: play only the first N seconds, then loop from 0
const TRIM_END_SECONDS = 10;

export default function Hero() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ── Scroll → fade away / fade to black transition ──────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Fade away effect as user scrolls down:
      // Starts smoothly as soon as scrolling begins, fully dark as leaving section
      const progress = Math.min(Math.max((scrollY - vh * 0.1) / (vh * 0.7), 0), 1);
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── 10-second trim: restart video when it passes TRIM_END_SECONDS ─────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= TRIM_END_SECONDS) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[650px] flex items-center justify-center overflow-hidden bg-black select-none">

      {/* ── Background Video ────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="/videos/hero.mp4"
        autoPlay
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Subtle dark tint over video for visual contrast */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Bottom gradient blending into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* ── Scroll Fade Overlay (1-2s transition feeling as user scrolls down) ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-500 ease-out"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />

      {/* ── Centered M1 Logo — Transparent for the Hero Page ─────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6">
        <h1 className="sr-only">M1 Aviation</h1>
        <div className="w-[280px] sm:w-[420px] md:w-[560px] lg:w-[680px] max-w-[90vw] transition-all duration-700 hover:scale-[1.02]">
          <Image
            src="/m1-logo.png"
            alt="M1 Logo"
            width={1302}
            height={461}
            priority
            className="w-full h-auto object-contain opacity-90 hover:opacity-100 transition-opacity drop-shadow-[0_0_50px_rgba(255,255,255,0.18)]"
          />
        </div>
      </div>

    </section>
  );
}
