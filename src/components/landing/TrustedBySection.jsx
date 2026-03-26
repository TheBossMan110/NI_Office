import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const clients = [
  "Dubai Retail Group", "Emirates Trading LLC", "Gulf Ventures FZE",
  "Al Futtaim Group", "Horizon Real Estate LLC", "DEWA",
  "Majid Al Futtaim", "DP World", "Etisalat", "Emaar Properties",
  "Nakheel", "Dubai Holdings", "RTA Dubai", "Damac Properties",
];

// Double for seamless loop
const marqueeItems = [...clients, ...clients];

export default function TrustedBySection() {
  return (
    <section className="relative py-16 overflow-hidden bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <ScrollReveal>
          <p className="text-center text-sm font-semibold text-gray-400 tracking-widest uppercase">
            Trusted by businesses across Dubai & UAE
          </p>
        </ScrollReveal>
      </div>

      {/* Fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, white, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(-90deg, white, transparent)" }} />

        <div className="overflow-hidden">
          <div className="animate-marquee">
            {marqueeItems.map((name, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-6 px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-gray-600 hover:border-blue-100 transition-all"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
