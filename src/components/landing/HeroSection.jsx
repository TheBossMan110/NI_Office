import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Printer3D from "./Printer3D";

const words = ["Smart Office", "&", "Security", "Solutions", "for", "Modern", "Businesses"];

function AnimatedHeadline() {
  return (
    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6 max-w-4xl mx-auto" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-3 ${i < 4 ? "text-gray-900" : "text-gray-900"} ${
            [0, 1, 2, 3].includes(i) ? "" : ""
          }`}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {[0, 1, 2, 3].includes(i) ? (
            <span className={i === 0 ? "gradient-text" : i <= 3 ? "gradient-text" : ""}>{word}</span>
          ) : word}
        </motion.span>
      ))}
    </h1>
  );
}

export default function HeroSection() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Radial glow bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(0,87,255,0.06) 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-16 w-full">
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 border border-blue-100 mb-8"
          >
            <span className="text-base">🏆</span>
            <span className="text-sm text-blue-600 font-semibold">Dubai's Trusted Office & Security Solutions Partner</span>
          </motion.div>

          {/* Animated headline */}
          <AnimatedHeadline />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-lg sm:text-xl text-gray-500 max-w-2xl leading-relaxed mb-10"
          >
            From CCTV systems and access control to printers, toner, and stationery — we power businesses across Dubai with everything they need.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap gap-4 justify-center mb-8"
          >
            <Button
              onClick={() => scrollTo("#contact")}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-6 text-base font-semibold group shadow-blue transition-all duration-300 hover:scale-105"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollTo("#services")}
              variant="outline"
              className="rounded-full px-10 py-6 text-base font-semibold border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-200 transition-all duration-300"
            >
              Explore Our Services
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-16 text-sm text-gray-400 font-medium"
          >
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> UAE Licensed Company</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> 500+ Clients</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> 10+ Years Experience</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> 24/7 Support</span>
          </motion.div>

          {/* 3D Embed Removed */}

          {/* Mobile fallback image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="lg:hidden w-72 h-52 rounded-3xl shadow-soft-lg overflow-hidden border border-blue-50 bg-gradient-to-br from-blue-50 to-white mx-auto"
          >
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=85"
              alt="Modern office setup"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-wrap gap-10 justify-center mt-16"
          >
            {[
              { value: "500+", label: "Business Clients" },
              { value: "10+", label: "Years Experience" },
              { value: "1000+", label: "Systems Installed" },
              { value: "24/7", label: "Support Available" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold gradient-text" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-300 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-gray-200 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-blue-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}