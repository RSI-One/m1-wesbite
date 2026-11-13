import type { Metadata } from "next";
import AviGramSection from "@/components/home/AviGramSection";

export const metadata: Metadata = {
  title: "Avigram",
  description:
    "M1 Presents Avigram — the high-altitude socializing platform built specifically for the aviation community.",
  alternates: {
    canonical: "/avigram",
  },
};

export default function AvigramPage() {
  return (
    <div className="w-full flex-1 bg-[#08070d] flex flex-col justify-center">
      <AviGramSection />
    </div>
  );
}

