import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const products = [
  {
    caption: "CCTV Security Camera",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=700&q=85",
  },
  {
    caption: "Printer Toner Cartridges",
    image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=700&q=85",
  },
  {
    caption: "Office Printer / Copier",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=700&q=85",
  },
  {
    caption: "Office Stationery",
    image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=700&q=85",
  },
  {
    caption: "Access Control Panel",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85",
  },
  {
    caption: "Biometric Attendance Device",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&q=85",
  },
  {
    caption: "Office Technician & Maintenance",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=700&q=85",
  },
  {
    caption: "Modern Office Setup",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=700&q=85",
  },
];

function ProductCard({ product, index }) {
  return (
    <ScrollReveal delay={index * 0.07}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="group relative rounded-2xl overflow-hidden shadow-soft border border-gray-100 cursor-pointer bg-white"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.caption}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
          <p className="text-white font-semibold text-sm mb-3">{product.caption}</p>
          <button className="self-start px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors">
            Enquire Now
          </button>
        </div>
        {/* Caption always visible below */}
        <div className="p-4 bg-white">
          <p className="text-sm font-semibold text-gray-700">{product.caption}</p>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function ProductsSection() {
  return (
    <section id="products" className="relative py-28 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-4">OUR PRODUCTS</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Premium Equipment,{" "}
            <span className="gradient-text">Trusted Brands</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Real products. Real quality. Delivered to your business in Dubai.
          </p>
        </ScrollReveal>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product, index) => (
            <ProductCard key={product.caption} product={product} index={index} />
          ))}
        </div>

        {/* Brand strip */}
        <ScrollReveal className="mt-16 text-center">
          <p className="text-sm text-gray-400 font-medium mb-6 tracking-widest uppercase">Authorized Dealer For</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {["Konica Minolta", "Canon", "Ricoh", "Kyocera", "HP", "Epson", "Sharp", "Hikvision"].map((brand) => (
              <motion.div
                key={brand}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-5 py-2.5 rounded-2xl bg-white border border-gray-100 shadow-soft text-sm font-bold text-gray-400 hover:text-gray-700 hover:border-blue-100 transition-all"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}