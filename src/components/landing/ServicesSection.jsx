import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    emoji: "🎥",
    title: "CCTV Camera Systems",
    description: "Advanced HD and 4K surveillance systems with 24/7 monitoring, night vision, motion detection, and remote mobile access. Protect your business around the clock.",
    features: ["HD/4K Cameras", "Night Vision", "Remote Access", "DVR/NVR Systems", "Indoor & Outdoor"],
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&q=85",
    cta: "Learn More →",
    gradient: "from-blue-500/8 to-cyan-500/8",
    border: "border-blue-100",
    hover: "hover:border-blue-300 hover:shadow-blue",
    tag: "bg-blue-600",
  },
  {
    emoji: "🔐",
    title: "Door Access Control",
    description: "Control who enters your premises with smart card readers, biometric scanners, and face recognition systems — all integrated and managed from a central dashboard.",
    features: ["Card/PIN Access", "Biometric Scanners", "Face Recognition", "Multi-Door Mgmt", "HR Integration"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85",
    cta: "Learn More →",
    gradient: "from-indigo-500/8 to-blue-500/8",
    border: "border-indigo-100",
    hover: "hover:border-indigo-300",
    tag: "bg-indigo-600",
  },
  {
    emoji: "🕐",
    title: "Digital Attendance Systems",
    description: "Automate workforce tracking with biometric and RFID attendance systems that integrate with payroll software — eliminating manual errors and saving HR hours.",
    features: ["Biometric & RFID", "Real-Time Reports", "Payroll Integration", "Cloud Management", "Multi-Location"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=85",
    cta: "Learn More →",
    gradient: "from-violet-500/8 to-purple-500/8",
    border: "border-violet-100",
    hover: "hover:border-violet-300",
    tag: "bg-violet-600",
  },
  {
    emoji: "🖨️",
    title: "Printers & Office Equipment",
    description: "Supply and installation of professional-grade printers, multifunction copiers, scanners, shredders, and laminators from leading global brands — backed by full after-sales support.",
    features: ["Laser & Inkjet", "Photocopiers", "Scanners", "Shredders", "Laminators"],
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=85",
    cta: "Learn More →",
    gradient: "from-teal-500/8 to-cyan-500/8",
    border: "border-teal-100",
    hover: "hover:border-teal-300",
    tag: "bg-teal-600",
  },
  {
    emoji: "🖋️",
    title: "Toner & Ink Cartridge Supply",
    description: "Genuine and compatible toner and ink cartridges for all major printer brands. Bulk ordering, subscription supply, and fast delivery across Dubai and the UAE.",
    features: ["HP • Canon • Epson", "Brother • Ricoh", "Bulk Discounts", "Fast UAE Delivery", "Genuine Products"],
    image: "https://images.unsplash.com/photo-1612815292201-39b59c37ff74?w=600&q=85",
    cta: "Order Now →",
    gradient: "from-amber-500/8 to-orange-500/8",
    border: "border-amber-100",
    hover: "hover:border-amber-300",
    tag: "bg-amber-500",
  },
  {
    emoji: "📎",
    title: "Stationery & Office Supplies",
    description: "Complete range of stationery essentials — paper, pens, folders, binders, desk accessories, and more. Corporate bulk supply available with competitive pricing for Dubai businesses.",
    features: ["Paper & Notebooks", "Pens & Markers", "Files & Folders", "Desk Accessories", "Corporate Accounts"],
    image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600&q=85",
    cta: "Browse Supplies →",
    gradient: "from-rose-500/8 to-pink-500/8",
    border: "border-rose-100",
    hover: "hover:border-rose-300",
    tag: "bg-rose-500",
  },
  {
    emoji: "🔧",
    title: "Installation, Repair & Maintenance",
    description: "Certified technicians for complete system setup, rapid on-site repairs, and scheduled preventive maintenance — keeping every system running at peak performance.",
    features: ["Certified Technicians", "Fast Response", "Preventive Maintenance", "Warranty Support", "24/7 Available"],
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=85",
    cta: "Book a Technician →",
    gradient: "from-emerald-500/8 to-green-500/8",
    border: "border-emerald-100",
    hover: "hover:border-emerald-300",
    tag: "bg-emerald-600",
  },
];

function ServiceCard({ s, index }) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative rounded-3xl border ${s.border} ${s.hover} bg-white overflow-hidden cursor-pointer shadow-soft transition-all duration-300 flex flex-col h-full`}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent`} />
          <div className={`absolute top-4 left-4 w-10 h-10 rounded-xl ${s.tag} flex items-center justify-center text-lg shadow-sm`}>
            {s.emoji}
          </div>
        </div>

        {/* Content */}
        <div className={`relative p-6 flex-1 flex flex-col bg-gradient-to-br ${s.gradient} opacity-100`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.title}</h3>
          <p className="text-gray-500 leading-relaxed text-sm mb-4 flex-1">{s.description}</p>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {s.features.map((feat) => (
              <span key={feat} className="px-2 py-0.5 rounded-full bg-white/80 text-xs text-gray-600 border border-gray-100 font-medium">
                {feat}
              </span>
            ))}
          </div>

          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 text-left group-hover:translate-x-1 transition-transform inline-flex items-center">
            {s.cta}
          </button>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-28 overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="relative max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-4">OUR SERVICES</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Everything Your Business Needs,{" "}
            <span className="gradient-text">Under One Roof</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            From security infrastructure to everyday office essentials — we deliver quality, reliability, and expertise.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}