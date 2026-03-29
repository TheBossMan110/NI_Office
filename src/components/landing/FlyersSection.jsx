import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

import img1 from "@/images/1.png";
import img2 from "@/images/2.png";
import img3 from "@/images/3.png";
import img4 from "@/images/4.png";
import img5 from "@/images/5.png";
import img6 from "@/images/6.png";
import img7 from "@/images/7.png";
import img8 from "@/images/8.png";
import img9 from "@/images/9.png";

const flyerImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

export default function FlyersSection() {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const flyers = flyerImages.map((src, i) => ({
    id: i + 1,
    src,
    alt: `Promotional Flyer ${i + 1}`,
  }));

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const prevFlyer = (e) => {
    e.stopPropagation();
    setLightbox((l) => ({ ...l, index: (l.index - 1 + flyers.length) % flyers.length }));
  };
  const nextFlyer = (e) => {
    e.stopPropagation();
    setLightbox((l) => ({ ...l, index: (l.index + 1) % flyers.length }));
  };

  return (
    <section id="flyers" className="relative py-28 bg-gray-50 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="relative max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-4">Latest Offers</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Current <span className="gradient-text">Promotions</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Take advantage of our special deals on copier rentals, plotter sales, and branded printing services.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flyers.map((flyer, idx) => (
            <ScrollReveal key={flyer.id} direction="up" delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => openLightbox(idx)}
                className="group relative bg-white rounded-2xl shadow-soft-lg overflow-hidden border border-blue-50 cursor-pointer"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100 flex items-center justify-center relative">
                  <img
                    src={flyer.src}
                    alt={flyer.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-300" />
                  {/* Click to expand hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                      🔍 Click to view
                    </span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ──── Lightbox ──── */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-5 z-10 text-white/70 text-sm font-medium">
              {lightbox.index + 1} / {flyers.length}
            </div>

            {/* Prev button */}
            <button
              onClick={prevFlyer}
              className="absolute left-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox.index}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-[90vw] sm:max-w-lg rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={flyers[lightbox.index].src}
                alt={flyers[lightbox.index].alt}
                className="max-h-[90vh] w-auto object-contain"
              />
            </motion.div>

            {/* Next button */}
            <button
              onClick={nextFlyer}
              className="absolute right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
