"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { SAMPLE_ARTICLES } from "@/data/articles";
import { LINKEDIN_URL } from "@/data/navigation";
import ParallelogramButton from "@/components/ui/ParallelogramButton";

export default function AviationTimesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success">("idle");

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return SAMPLE_ARTICLES;
    const q = searchQuery.toLowerCase();
    return SAMPLE_ARTICLES.filter(
      (art) =>
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus("loading");
    setTimeout(() => {
      setSubStatus("success");
    }, 600);
  };

  return (
    <div className="w-full flex flex-col items-center pt-28 pb-20 px-6 md:px-12 max-w-5xl mx-auto">

      {/* 1. Header & Search */}
      <div className="w-full text-center space-y-4 mb-16">
        <h1 className="text-5xl sm:text-7xl font-extralight tracking-tight text-white">
          Aviation Times
        </h1>

        <div className="pt-6 max-w-xl mx-auto w-full">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-11 pr-4 py-3.5 bg-zinc-950 border border-zinc-800 rounded-full text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Article Feed */}
      <section aria-label="Published Articles" className="w-full space-y-6 mb-20">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 border border-zinc-800/80 rounded-2xl bg-zinc-950">
            <p className="text-sm text-zinc-400">
              No articles matched &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs font-mono underline text-zinc-300 mt-2 hover:text-white"
            >
              Reset
            </button>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <article
              key={article.id}
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center ${article.accentColor}`}
            >
              {/* Solid color thumbnail — no icon */}
              <div className={`shrink-0 w-full md:w-56 h-36 rounded-xl ${article.thumbBg}`} />

              {/* Text */}
              <div className="flex-1 space-y-2.5">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-zinc-400">
                  <span>{article.date}</span>
                  <span className="text-zinc-600">•</span>
                  <span>{article.readTime}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                  {article.title}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </article>
          ))
        )}
      </section>

      {/* 3. Subscribe */}
      <section
        aria-label="Newsletter Subscription"
        className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 mb-16 text-center"
      >
        <h3 className="text-2xl sm:text-3xl font-light text-white mb-6">
          Subscribe to Aviation Times
        </h3>

        {subStatus === "success" ? (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-400 text-xs font-mono max-w-md mx-auto">
            ✓ You have been added to the executive distribution list.
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your corporate email"
              className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
            />
            <button
              type="submit"
              disabled={subStatus === "loading"}
              className="w-full sm:w-auto px-6 py-3 bg-white text-black hover:bg-zinc-200 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg shrink-0 transition-colors"
            >
              {subStatus === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
      </section>

      {/* 4. LinkedIn CTA */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl border border-zinc-900 bg-black/60">
        <div className="text-center sm:text-left">
          <div className="text-sm font-light text-white">Join the Discussion on LinkedIn</div>
        </div>

        <div className="flex items-center gap-4">
          <ParallelogramButton href={LINKEDIN_URL} isExternal={true} variant="silver" className="text-xs">
            Follow on LinkedIn ↗
          </ParallelogramButton>
          <Link
            href="/#contact"
            className="text-xs font-mono text-zinc-400 hover:text-white underline uppercase tracking-wider"
          >
            Contact Editorial
          </Link>
        </div>
      </div>
    </div>
  );
}
