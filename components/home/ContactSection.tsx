"use client";

import React, { useState } from "react";
import ParallelogramButton from "@/components/ui/ParallelogramButton";
import { CAL_BOOKING_URL } from "@/data/navigation";
import { ContactFormData } from "@/types";

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    phone: "",
    email: "",
    fullName: "",
    reason: "partnership",
    description: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.fullName) {
      setErrorMessage("Please provide your name and a valid email address.");
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
      className="relative py-28 px-6 md:px-12 max-w-4xl mx-auto scroll-mt-20"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
          Connect with M1
        </h2>
      </div>

      {/* White Form Card with Black Text and Silver Input Fields */}
      <div className="bg-white text-black rounded-3xl p-8 sm:p-12 md:p-14 shadow-2xl border border-zinc-200">
        {status === "success" ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-light tracking-tight text-zinc-900">
              Inquiry Dispatched
            </h3>
            <p className="text-sm text-zinc-600 max-w-md mx-auto">
              Thank you, {formData.fullName}. Your request has been logged. An M1 aviation director will reply to <span className="font-semibold">{formData.email}</span> within 24 hours.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="text-xs font-mono underline uppercase tracking-wider text-zinc-600 hover:text-black"
              >
                Send another message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Captain Alexander Vance"
                  className="w-full px-4 py-3 text-sm bg-zinc-100 border border-zinc-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 block">
                  Corporate Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 text-sm bg-zinc-100 border border-zinc-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone / WhatsApp / Signal */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 block">
                  Phone / WhatsApp / Signal
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-4 py-3 text-sm bg-zinc-100 border border-zinc-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>

              {/* Reason */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 block">
                  Reason for Inquiry
                </label>
                <select
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-4 py-3 text-sm bg-zinc-100 border border-zinc-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                >
                  <option value="partnership">Industry Partner Program</option>
                  <option value="saios">M1 SAIOS Fleet Integration</option>
                  <option value="marketplace">Aircraft Marketplace Listings</option>
                  <option value="press">Press & Media Editorial</option>
                  <option value="general">Executive Advisory</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 block">
                Description / Fleet Requirements
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detail your fleet profile, aircraft type, or operational collaboration objectives..."
                className="w-full px-4 py-3 text-sm bg-zinc-100 border border-zinc-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Dual CTAs: Submit & Book a Meeting */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full sm:w-auto px-8 py-3.5 bg-black text-white hover:bg-zinc-800 rounded-lg text-xs font-mono uppercase tracking-widest transition-colors font-semibold"
              >
                {status === "submitting" ? "Transmitting..." : "Submit Inquiry"}
              </button>

              <ParallelogramButton
                href={CAL_BOOKING_URL}
                isExternal={true}
                variant="silver"
                className="w-full sm:w-auto text-xs py-3.5 px-6"
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
