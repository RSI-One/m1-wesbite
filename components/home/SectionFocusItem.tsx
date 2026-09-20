"use client";

import React, { useEffect, useRef, useState } from "react";

interface SectionFocusItemProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionFocusItem({
  id,
  children,
  className = "",
}: SectionFocusItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInFocus, setIsInFocus] = useState(true);

  useEffect(() => {
    const checkFocus = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Section is in focus if it occupies the central viewing zone of the viewport
      // (between 25% and 75% of viewport height)
      const visibleTop = Math.max(rect.top, vh * 0.2);
      const visibleBottom = Math.min(rect.bottom, vh * 0.8);
      const overlap = visibleBottom - visibleTop;

      // In focus if substantial portion is in the center view
      const inView = overlap > 60 || (rect.top <= vh * 0.45 && rect.bottom >= vh * 0.55);
      setIsInFocus(inView);
    };

    window.addEventListener("scroll", checkFocus, { passive: true });
    window.addEventListener("resize", checkFocus, { passive: true });
    // Initial check
    checkFocus();

    return () => {
      window.removeEventListener("scroll", checkFocus);
      window.removeEventListener("resize", checkFocus);
    };
  }, []);

  return (
    <div
      id={id}
      ref={ref}
      className={`w-full transition-all duration-700 ease-out group ${
        isInFocus
          ? "opacity-100 filter-none scale-100"
          : "opacity-35 blur-[3.5px] scale-[0.985] hover:opacity-75 hover:blur-[1px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
