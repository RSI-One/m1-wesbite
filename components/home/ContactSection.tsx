"use client";

import React, { useState } from "react";
import Image from "next/image";
import ParallelogramButton from "@/components/ui/ParallelogramButton";
import { CAL_BOOKING_URL } from "@/data/navigation";
import { ContactFormData } from "@/types";

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    position: "",
    email: "",
    phone: "",
    whatsappSignal: "",
    objective: "M1 Marketplace Acquisition",
    description: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.fullName) {
      setErrorMessage("Please provide your full name and a valid email address.");
      return;
    }

    setErrorMessage("");
    setStatus("submitting");

    // Client-side confirmation state simulation
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Inquiries"
      className="relative pt-6 pb-24 md:pt-10 md:pb-28 px-6 md:px-12 max-w-5xl mx-auto scroll-mt-10 overflow-hidden"
    >
      {/* ── Background Radar Compass & Flight Vector Rings ─────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[600px] h-[600px] rounded-full border border-white/20 animate-[spin_60s_linear_infinite]" />
        <div className="w-[450px] h-[450px] rounded-full border border-dashed border-white/20" />
        <div className="w-[300px] h-[300px] rounded-full border border-white/10" />
      </div>

      <div className="text-center mb-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
          Connect with M1
        </h2>
        <p className="text-xs font-mono text-zinc-400 mt-2 uppercase tracking-widest">
          Executive Aviation Advisory • Fleet Operators • OEM Integration
        </p>
      </div>

      {/* ── Executive Obsidian Glassmorphic Form Card with Silver Inputs & Parallelogram CTAs ─── */}
      <div className="relative bg-[#0a0d14]/95 backdrop-blur-2xl text-white rounded-3xl p-6 sm:p-10 md:p-14 shadow-[0_25px_80px_rgba(0,0,0,0.95)] border border-white/15 overflow-hidden z-10">
        {/* Subtle Jet Watermark Blueprint in background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <div
            id="contact-jet-destination"
            className="absolute -bottom-6 -right-6 sm:right-0 sm:bottom-0 w-[380px] sm:w-[500px] h-[260px] sm:h-[350px] opacity-15"
          >
            <Image
              src="/images/footer-jet.png"
              alt="M1 Supersonic Aircraft"
              fill
              sizes="(max-width: 768px) 380px, 500px"
              className="object-contain object-right-bottom"
              priority={true}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0d14] via-transparent to-transparent" />
        </div>

        {/* Top Avionics Dispatch Telemetry Header */}
        <div className="pb-5 mb-6 sm:mb-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-zinc-400 relative z-10">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span className="font-semibold text-white tracking-wider">M1 FLIGHT COMMS // INQUIRY DISPATCH</span>
          </div>
          <div className="tracking-widest uppercase text-zinc-500">
            TRANSMISSION SECURE • CYOO / OPPS LINK
          </div>
        </div>

        {status === "success" ? (
          <div className="text-center py-12 sm:py-16 space-y-4 relative z-10">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto text-2xl font-bold shadow-inner">
              ✓
            </div>
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
              Inquiry Dispatched
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-white">{formData.fullName}</span>. Your inquiry has been transmitted to our flight team. An executive will connect at <span className="font-semibold text-white">{formData.email}</span> shortly.
            </p>
            <div className="pt-6">
              <ParallelogramButton
                onClick={() => setStatus("idle")}
                variant="white"
                className="text-xs py-3 px-8"
              >
                Send Another Dispatch
              </ParallelogramButton>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs font-mono">
                {errorMessage}
              </div>
            )}

            {/* Row 1: 1. Full name & 2. Position */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-300 block font-semibold">
                  1. Full name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Captain Alexander Vance"
                  className="w-full px-4 py-3 sm:py-3.5 text-sm bg-white/[0.05] border border-white/15 focus:border-white/50 focus:bg-white/[0.08] text-white rounded-xl placeholder-zinc-500 focus:outline-none transition-all font-normal"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-300 block font-semibold">
                  2. Position
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Fleet Director / Chief Executive"
                  className="w-full px-4 py-3 sm:py-3.5 text-sm bg-white/[0.05] border border-white/15 focus:border-white/50 focus:bg-white/[0.08] text-white rounded-xl placeholder-zinc-500 focus:outline-none transition-all font-normal"
                />
              </div>
            </div>

            {/* Row 2: 3. Email & 4. Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-300 block font-semibold">
                  3. Email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@aviation-operator.com"
                  className="w-full px-4 py-3 sm:py-3.5 text-sm bg-white/[0.05] border border-white/15 focus:border-white/50 focus:bg-white/[0.08] text-white rounded-xl placeholder-zinc-500 focus:outline-none transition-all font-normal"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-300 block font-semibold">
                  4. Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-4 py-3 sm:py-3.5 text-sm bg-white/[0.05] border border-white/15 focus:border-white/50 focus:bg-white/[0.08] text-white rounded-xl placeholder-zinc-500 focus:outline-none transition-all font-normal"
                />
              </div>
            </div>

            {/* Row 3: 5. WhatsApp / Signal & 6. Objective */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-300 block font-semibold">
                  5. WhatsApp / Signal
                </label>
                <input
                  type="text"
                  value={formData.whatsappSignal}
                  onChange={(e) => setFormData({ ...formData, whatsappSignal: e.target.value })}
                  placeholder="+1 (555) 019-2834 or handle"
                  className="w-full px-4 py-3 sm:py-3.5 text-sm bg-white/[0.05] border border-white/15 focus:border-white/50 focus:bg-white/[0.08] text-white rounded-xl placeholder-zinc-500 focus:outline-none transition-all font-normal"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-300 block font-semibold">
                  6. Objective
                </label>
                <select
                  value={formData.objective}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  className="w-full px-4 py-3 sm:py-3.5 text-sm bg-zinc-900 border border-white/15 focus:border-white/50 text-white rounded-xl focus:outline-none transition-all font-normal"
                >
                  <option value="M1 Marketplace Acquisition">M1 Marketplace Acquisition</option>
                  <option value="Aircraft Listings & Verification">Aircraft Listings & Verification</option>
                  <option value="SIOS Fleet Integration & Pilot Program">SIOS Fleet Integration & Pilot Program</option>
                  <option value="Avigram Early Access & Pre-signup">Avigram Early Access & Pre-signup</option>
                  <option value="M1 Industry Partner Program">M1 Industry Partner Program</option>
                  <option value="Executive Advisory Consultation">Executive Advisory Consultation</option>
                </select>
              </div>
            </div>

            {/* Row 4: 7. Description */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-300 block font-semibold">
                7. Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Specify your requirements, fleet composition, or inquiry details..."
                className="w-full px-4 py-3 text-sm bg-white/[0.05] border border-white/15 focus:border-white/50 focus:bg-white/[0.08] text-white rounded-xl placeholder-zinc-500 focus:outline-none transition-all resize-none font-normal"
              />
            </div>

            {/* Dual Iconic Parallelogram CTAs (Submit & Book Meeting) */}
            <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <ParallelogramButton
                onClick={() => {
                  const form = document.querySelector("form");
                  if (form) form.requestSubmit();
                }}
                variant="white"
                className="w-full sm:w-auto text-xs py-3.5 px-8 font-bold shadow-lg"
              >
                {status === "submitting" ? "Transmitting..." : "Submit Inquiry"}
              </ParallelogramButton>

              <ParallelogramButton
                href={CAL_BOOKING_URL}
                isExternal={true}
                variant="silver"
                className="w-full sm:w-auto text-xs py-3.5 px-8 font-bold shadow-lg"
              >
                Book a Direct Meeting ↗
              </ParallelogramButton>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
