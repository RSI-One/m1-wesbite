import Link from "next/link";
import M1Logo from "@/components/ui/M1Logo";
import {
  NAV_ITEMS,
  SUPPORT_EMAIL,
  LINKEDIN_URL,
  X_URL,
} from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="relative bg-black text-zinc-400 border-t border-zinc-900 pt-20 pb-12 overflow-hidden">
      {/* Decorative Cloud & Aircraft Skyline Layer */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none opacity-20 flex justify-between items-center overflow-hidden">
        {/* Subtle cloud silhouette SVG */}
        <div className="w-full flex justify-around items-center">
          <span className="text-[10px] font-mono tracking-widest text-zinc-600">
            ✈ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
          </span>
          <span className="text-[10px] font-mono tracking-widest text-zinc-700 hidden sm:inline">
            ☁ ☁ ☁ ☁ ☁
          </span>
          <span className="text-[10px] font-mono tracking-widest text-zinc-600">
            ─ ─ ─ ─ ─ ─ ─ ─ ─ ✈
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="M1 Aviation Home"
            >
              <M1Logo
                width={120}
                height={42}
                className="h-7 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-white text-sm font-light tracking-widest uppercase text-zinc-400 group-hover:text-zinc-200 transition-colors">
                Aviation
              </span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Leading with a perfection in pixels philosophy to architect the next-generation digital ecosystem for business aviation.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-xs font-mono text-zinc-300 hover:text-white transition-colors"
              >
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  {item.isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {item.label} ↗
                    </a>
                  ) : (
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Operational Locations */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white">
              Global Presence
            </h3>
            <div className="space-y-3 text-xs text-zinc-400">
              <div>
                <div className="text-white font-medium mb-0.5">Canada</div>
                <div className="text-zinc-500">Brookroad, Pickering, Ontario</div>
              </div>
              <div>
                <div className="text-white font-medium mb-0.5">Pakistan</div>
                <div className="text-zinc-500">
                  2nd Floor, Hall 2, WWIC, UGS, University Road, Sargodha
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Network & Social */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white">
              Connect
            </h3>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>LinkedIn</span>
                <span className="text-[10px] text-zinc-600">↗</span>
              </a>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>X (Twitter)</span>
                <span className="text-[10px] text-zinc-600">↗</span>
              </a>
              <a
                href="https://app.m-1.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5 text-zinc-300"
              >
                <span>M1 Portal</span>
                <span className="text-[10px] text-zinc-500">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600 font-mono">
          <div>© {new Date().getFullYear()} M1 Aviation Ecosystem. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link href="/saios" className="hover:text-zinc-400">SAIOS Core</Link>
            <Link href="/industry-partner" className="hover:text-zinc-400">Partner Portal</Link>
            <Link href="/aviation-times" className="hover:text-zinc-400">Aviation Times</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
