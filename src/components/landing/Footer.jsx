import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Instagram, Facebook, MessageCircle } from "lucide-react";
import niLogo from "../../images/logo.png";

const footerServices = [
  "CCTV Camera Systems", "Door Access Control", "Digital Attendance Systems",
  "Printers & Equipment", "Toner & Ink Supply", "Stationery Supplies", "Installation & Maintenance",
];

const quickLinks = ["Home", "Services", "Products", "About Us", "Contact Us"];

export default function Footer({ onTerms, onPrivacy }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const linkMap = {
    "Home": "#hero", "Services": "#services", "Products": "#products",
    "About Us": "#about", "Contact Us": "#contact",
  };

  return (
    <footer className="relative bg-gray-950 text-white overflow-hidden">
      {/* Subtle top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-800/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        {/* 4-Column grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src={niLogo} alt="NI Logo" className="w-12 h-12 object-contain bg-white rounded-xl p-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-white leading-tight">NI For Office Equipment</p>
                <p className="text-sm font-bold text-white leading-tight">Trading Co. LLC</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your Trusted Office & Security Solutions Partner in Dubai, UAE.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: "https://instagram.com/ni.offices", label: "Instagram" },
                { Icon: Facebook, href: "https://facebook.com/NIOffices", label: "Facebook" },
                { Icon: MessageCircle, href: "https://wa.me/971558560495", label: "WhatsApp" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-600 flex items-center justify-center transition-all"
                  aria-label={label}>
                  <Icon className="w-4 h-4 text-gray-300 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(linkMap[link])}
                    className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">→</span>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 tracking-wider uppercase">Our Services</h4>
            <ul className="space-y-3">
              {footerServices.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollTo("#services")}
                    className="text-sm text-gray-400 hover:text-white transition-colors text-left leading-tight"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 tracking-wider uppercase">Contact</h4>
            <ul className="space-y-4">
              <li className="text-sm text-gray-400">
                <span className="text-blue-400">📍</span> Dubai, United Arab Emirates
              </li>
              <li>
                <div className="flex flex-col gap-1">
                  <a href="tel:+971558560495" className="text-sm text-gray-400 hover:text-white transition-colors">
                    <span className="text-blue-400">📞</span> +971 55 856 0495
                  </a>
                  <a href="tel:+971569123171" className="text-sm text-gray-400 hover:text-white transition-colors pl-5">
                    +971 56 9123171
                  </a>
                </div>
              </li>
              <li>
                <a href="mailto:marketing.niofficedxb@gmail.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                  <span className="text-blue-400">📧</span> marketing.niofficedxb@gmail.com
                </a>
              </li>
              <li className="text-sm text-gray-400">
                <span className="text-blue-400">🕐</span> Sun–Thu: 9:00 AM – 6:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} NI For Office Equipment Trading Co. LLC. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={onTerms} className="text-xs text-gray-500 hover:text-white transition-colors">
              Terms & Conditions
            </button>
            <span className="text-gray-700">·</span>
            <button onClick={onPrivacy} className="text-xs text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </button>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3, scale: 1.1 }}
              className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-blue hover:bg-blue-700 transition-colors ml-2"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}