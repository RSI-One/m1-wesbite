"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import ParallelogramButton from "@/components/ui/ParallelogramButton";

export interface EngagementCard {
  id: string;
  tag: string;
  title: string;
  location: string;
  date: string;
  summary: string;
  category: string;
  image: string;
  stats: string;
  ctaLabel: string;
  cardStyle: string;
  badgeStyle: string;
  buttonVariant: "silver" | "gold" | "white" | "black";
}

interface PartnerEngagementCarouselProps {
  cards: EngagementCard[];
}

type SlotRole = "left" | "center" | "right";

interface SlotCoords {
  x: number;
  y: number;
  z: number;
  rotY: number;
  scale: number;
  opacity: number;
  floatWeight: number;
}

interface AnimState {
  fromIndex: number;
  toIndex: number;
  startTime: number;
}

const AUTO_SWIPE_MS = 3000;
const FLIGHT_DURATION_MS = 1050;

function easeInOutCubic(p: number): number {
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function getSlotRole(cardIdx: number, centerIdx: number, count: number): SlotRole {
  if (cardIdx === centerIdx) return "center";
  if (cardIdx === (centerIdx - 1 + count) % count) return "left";
  return "right";
}

function getSlotCoords(role: SlotRole, shiftX: number): SlotCoords {
  if (role === "center") {
    return {
      x: 0,
      y: -4,
      z: 24,
      rotY: 0,
      scale: 1,
      opacity: 1,
      floatWeight: 0,
    };
  }
  const sign = role === "left" ? -1 : 1;
  return {
    x: sign * shiftX,
    y: 16,
    z: -145,
    rotY: -sign * 43,
    scale: 0.62,
    opacity: 0.92,
    floatWeight: 1,
  };
}

export default function PartnerEngagementCarousel({ cards }: PartnerEngagementCarouselProps) {
  const count = cards.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardWidthRef = useRef(565);
  const timerRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  const animRef = useRef<AnimState>({
    fromIndex: 0,
    toIndex: 0,
    startTime: -1,
  });

  const triggerFlight = useCallback((nextIndex: number) => {
    const currentTarget = animRef.current.toIndex;
    if (nextIndex === currentTarget) return;

    animRef.current = {
      fromIndex: currentTarget,
      toIndex: nextIndex,
      startTime: performance.now(),
    };
    setActiveIndex(nextIndex);
  }, []);

  const clearAutoSwipeTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetAutoSwipeTimer = useCallback(() => {
    clearAutoSwipeTimer();
    if (count < 2 || isHoveredRef.current) return;
    timerRef.current = window.setInterval(() => {
      const next = (animRef.current.toIndex + 1) % count;
      triggerFlight(next);
    }, AUTO_SWIPE_MS);
  }, [count, triggerFlight, clearAutoSwipeTimer]);

  const handleCardHover = useCallback(
    (hovered: boolean) => {
      isHoveredRef.current = hovered;
      if (hovered) {
        clearAutoSwipeTimer();
      } else {
        resetAutoSwipeTimer();
      }
    },
    [clearAutoSwipeTimer, resetAutoSwipeTimer]
  );

  const handleManualTarget = useCallback(
    (nextIndex: number) => {
      triggerFlight(nextIndex);
      resetAutoSwipeTimer();
    },
    [triggerFlight, resetAutoSwipeTimer]
  );

  // Track responsive card width without forcing per-frame DOM reads inside rAF
  useEffect(() => {
    const measureCardWidth = () => {
      const firstCard = cardRefs.current[0];
      if (firstCard) {
        cardWidthRef.current = firstCard.offsetWidth;
      }
    };
    measureCardWidth();

    const observer = new ResizeObserver(measureCardWidth);
    if (stageRef.current) observer.observe(stageRef.current);
    window.addEventListener("resize", measureCardWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureCardWidth);
    };
  }, []);

  // Strict 3-second auto-swipe scheduler (paused when hovering a card)
  useEffect(() => {
    resetAutoSwipeTimer();
    return clearAutoSwipeTimer;
  }, [resetAutoSwipeTimer, clearAutoSwipeTimer]);

  // Continuous 60/120fps rAF 3D flight + smooth side float engine
  useEffect(() => {
    let rafId = 0;

    const renderFrame = (now: number) => {
      const anim = animRef.current;
      const cardW = cardWidthRef.current;
      const shiftX = cardW <= 340 ? cardW * 0.92 : cardW * 0.98;

      let rawP = 1;
      if (anim.startTime >= 0) {
        rawP = Math.min(1, (now - anim.startTime) / FLIGHT_DURATION_MS);
      }

      const t = easeInOutCubic(rawP);
      const arc = Math.sin(Math.PI * rawP);

      for (let i = 0; i < count; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const fromRole = getSlotRole(i, anim.fromIndex, count);
        const toRole = getSlotRole(i, anim.toIndex, count);
        const from = getSlotCoords(fromRole, shiftX);
        const to = getSlotCoords(toRole, shiftX);

        let x = lerp(from.x, to.x, t);
        let y = lerp(from.y, to.y, t);
        let z = lerp(from.z, to.z, t);
        const rotY = lerp(from.rotY, to.rotY, t);
        let scale = lerp(from.scale, to.scale, t);
        let opacity = lerp(from.opacity, to.opacity, t);
        const floatWeight = lerp(from.floatWeight, to.floatWeight, t);

        let zIndex = 20;
        if (rawP < 1 && fromRole !== toRole) {
          if (toRole === "center") {
            // Side card takes off smoothly, arcs forward, and touches down cleanly in center
            y -= 44 * arc;
            z += 80 * arc;
            zIndex = 40;
          } else if (fromRole === "center") {
            // Front card uplifts off pad and glides cleanly into angled side slot
            y -= 56 * arc;
            z += 50 * arc;
            zIndex = 30;
          } else {
            // Side-to-side swap dips silently behind center
            z -= 210 * arc;
            y += 18 * arc;
            scale -= 0.08 * arc;
            opacity -= 0.45 * arc;
            zIndex = 10;
          }
        } else {
          zIndex = toRole === "center" ? 40 : 20;
          x = to.x;
          y = to.y;
          z = to.z;
        }

        // Smooth continuous side floating that blends seamlessly into takeoff/landing
        const floatOffset = floatWeight * 8 * Math.sin(now * 0.0017 + i * 2.1);

        el.style.transform = `translate3d(${x.toFixed(2)}px, ${(y + floatOffset).toFixed(2)}px, ${z.toFixed(2)}px) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(zIndex);
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    renderFrame(performance.now());
    return () => window.cancelAnimationFrame(rafId);
  }, [count]);

  const touchStartX = useRef<number | null>(null);

  return (
    <section
      className="relative z-20 w-full py-12 sm:py-16 px-4 sm:px-6 overflow-x-clip"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const deltaX = (e.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
        if (Math.abs(deltaX) > 40) {
          const delta = deltaX < 0 ? 1 : -1;
          handleManualTarget((animRef.current.toIndex + delta + count) % count);
        }
        touchStartX.current = null;
      }}
    >
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14 space-y-2.5">
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Partner Engagement Showcase
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto">
            Real-world aircraft deployments, avionics trials, and operator summits powering the M1 ecosystem.
          </p>
        </div>

        {/* 3D Perspective Stage */}
        <div
          ref={stageRef}
          className="relative w-full h-[535px] sm:h-[555px] lg:h-[575px]"
          style={{ perspective: "850px", perspectiveOrigin: "50% 48%" }}
        >
          {cards.map((slide, index) => {
            const isCenter = index === activeIndex;

            return (
              <div
                key={slide.id}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                onMouseEnter={() => handleCardHover(true)}
                onMouseLeave={() => handleCardHover(false)}
                onClick={!isCenter ? () => handleManualTarget(index) : undefined}
                aria-hidden={!isCenter}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform ${
                  !isCenter ? "cursor-pointer" : ""
                }`}
              >
                <div
                  className={`relative w-[310px] sm:w-[420px] md:w-[485px] lg:w-[530px] xl:w-[565px] h-[505px] sm:h-[525px] lg:h-[540px] rounded-2xl border p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-[filter] duration-700 ease-out ${
                    slide.cardStyle
                  } ${
                    isCenter
                      ? "brightness-100 ring-1 ring-white/25"
                      : "brightness-[0.88] hover:brightness-100"
                  }`}
                >
                  {/* Top Image Frame */}
                  <div className="relative z-10 w-full h-[195px] sm:h-[215px] lg:h-[230px] rounded-xl overflow-hidden border border-white/15 shadow-lg shrink-0 group">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      sizes="(max-width: 640px) 310px, (max-width: 1024px) 485px, 565px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                    {/* Protocol Badge on Image Top-Left */}
                    <div className="absolute top-3 left-3">
                      <div className={`-skew-x-12 inline-flex items-center px-3 py-1 border shadow-sm ${slide.badgeStyle}`}>
                        <span className="inline-block skew-x-12 text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase">
                          {slide.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Lower Text & Details */}
                  <div className="relative z-10 flex-1 flex flex-col justify-between pt-3.5 min-h-0">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300">
                        <span className="truncate">{slide.location}</span>
                        <span className="text-white font-semibold shrink-0 ml-2">{slide.date}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl lg:text-[26px] font-light tracking-tight text-white leading-snug line-clamp-2 drop-shadow-sm">
                        {slide.title}
                      </h3>

                      <p className="text-xs sm:text-sm leading-relaxed text-zinc-200 line-clamp-3">
                        {slide.summary}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="inline-flex items-center px-3 py-1.5 bg-black/50 rounded-lg border border-white/15 text-[11px] font-mono text-zinc-100">
                        {slide.stats}
                      </div>

                      {/* CTA Button */}
                      <div
                        className={`pt-2.5 border-t border-white/15 flex justify-center ${
                          !isCenter ? "pointer-events-none" : ""
                        }`}
                      >
                        <ParallelogramButton
                          href="/#contact"
                          variant={slide.buttonVariant}
                          className="py-2.5 px-8 text-xs sm:text-sm shadow-xl w-full sm:w-auto"
                        >
                          {slide.ctaLabel}
                        </ParallelogramButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal Sharp Indicator Bars */}
        <div className="mt-7 flex items-center justify-center gap-2.5">
          {cards.map((slide, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => handleManualTarget(idx)}
                aria-label={`Focus ${slide.title}`}
                className={`h-1.5 transition-all duration-300 cursor-pointer ${
                  active ? "w-10 bg-slate-200" : "w-3.5 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
