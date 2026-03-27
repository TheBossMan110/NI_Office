import React from "react";
import { motion } from "framer-motion";
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
  const flyers = flyerImages.map((src, i) => ({
    id: i + 1,
    src,
    alt: `Promotional Flyer ${i + 1}`,
  }));

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
                className="group relative bg-white rounded-2xl shadow-soft-lg overflow-hidden border border-blue-50 cursor-pointer"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100 flex items-center justify-center relative">
                  <img
                    src={flyer.src}
                    alt={flyer.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-300" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
