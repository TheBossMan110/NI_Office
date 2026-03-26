import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { CheckCircle2 } from "lucide-react";

const trustBadges = [
  "✅ UAE Trade Licensed Company",
  "✅ Certified Installation Engineers",
  "✅ Genuine & Branded Products Only",
  "✅ Serving Dubai, Sharjah & Abu Dhabi",
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: image with clip-path reveal */}
          <ScrollReveal direction="left">
            <div className="relative">
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl overflow-hidden shadow-soft-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85"
                  alt="Modern office — NI For Office Equipment Trading Co. LLC"
                  className="w-full h-[480px] object-cover"
                />
              </motion.div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 30, x: 30 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-soft-lg border border-gray-100 p-5 flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center shadow-blue flex-shrink-0">
                  <span className="text-white font-bold text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>NI</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>10+ Years</p>
                  <p className="text-xs text-gray-400">Trusted in Dubai & UAE</p>
                </div>
              </motion.div>

              {/* Blue accent blob */}
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-blue-100 rounded-full blur-2xl opacity-60 pointer-events-none" />
            </div>
          </ScrollReveal>

          {/* Right: content */}
          <ScrollReveal direction="right" delay={0.15}>
            <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-4">ABOUT US</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Dubai's Trusted Office &{" "}
              <span className="gradient-text">Security Solutions Partner</span>
            </h2>

            <p className="text-gray-500 leading-relaxed mb-5 text-base">
              NI For Office Equipment Trading Co. LLC is a trusted Dubai-based company delivering complete office and security solutions tailored to the needs of modern businesses.
            </p>
            <p className="text-gray-500 leading-relaxed mb-5 text-base">
              Founded on the principles of quality, reliability, and customer satisfaction, we have grown to become a dependable partner for businesses across the UAE — providing everything from advanced CCTV systems and access control to everyday office essentials like toner, stationery, and printing equipment.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8 text-base">
              Our team of certified technicians and experienced consultants ensures every solution we deliver is installed correctly, maintained regularly, and supported fully — giving your business the confidence to operate without interruption.
            </p>

            {/* Trust badges */}
            <div className="grid sm:grid-cols-2 gap-3">
              {trustBadges.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-blue-50 border border-blue-100 text-sm text-gray-700 font-medium"
                >
                  {badge}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
