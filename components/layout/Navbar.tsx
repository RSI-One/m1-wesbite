"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data/navigation";
import M1Logo from "@/components/ui/M1Logo";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Home: float at bottom of viewport (within hero/landing page). Other pages: fixed top.
  const positionClass = isHome
    ? "fixed bottom-8 left-0 right-0"
    : "fixed top-6 left-0 right-0";

  return (
    <header className={`${positionClass} z-40 flex justify-center px-4 pointer-events-none`}>
      <nav
        aria-label="Main Navigation"
        className="pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-6 md:px-8 py-3.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-zinc-300 shadow-2xl transition-all max-w-5xl lg:max-w-6xl w-full"
      >
        {/* Brand M1 Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group shrink-0 whitespace-nowrap"
          aria-label="M1 Aviation Home"
        >
          <M1Logo
            width={90}
            height={32}
            className="h-6 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <span className="text-xs uppercase tracking-[0.2em] font-light hidden sm:inline text-zinc-400 group-hover:text-zinc-200 transition-colors">
            Aviation
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs tracking-wider uppercase font-medium flex-nowrap shrink-0">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            if (item.isExternal) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] text-zinc-500">↗</span>
                </a>
              );
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`whitespace-nowrap transition-colors py-1 ${
                  isActive
                    ? "text-white border-b border-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Action Button: Connect / Contact */}
        <div className="hidden sm:flex items-center shrink-0">
          <Link
            href="/#contact"
            className="whitespace-nowrap text-xs uppercase tracking-widest px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white transition-all font-mono"
          >
            Connect
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          className="md:hidden p-1.5 text-zinc-400 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`pointer-events-auto absolute ${
            isHome ? "bottom-20" : "top-20"
          } left-4 right-4 bg-zinc-950/95 border border-zinc-800 backdrop-blur-xl rounded-2xl p-6 shadow-2xl flex flex-col gap-4 text-center z-50 md:hidden animate-in fade-in zoom-in-95 duration-150`}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-wider text-zinc-300 hover:text-white py-2 border-b border-zinc-900"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs uppercase tracking-widest px-6 py-2.5 rounded-full border border-white/20 bg-white/10 text-white font-mono mt-2"
          >
            Connect
          </Link>
        </div>
      )}
    </header>
  );
}
