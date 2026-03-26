import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: "01",
    icon: "📞",
    title: "Contact Us",
    description: "Reach out via call, WhatsApp, or our contact form. Tell us what your business needs.",
  },
  {
    number: "02",
    icon: "📋",
    title: "Get a Custom Quote",
    description: "Our team assesses your requirements and provides a tailored, transparent quote with no hidden costs.",
  },
  {
    number: "03",
    icon: "✅",
    title: "We Deliver & Support",
    description: "We install, configure, and hand over — then stay with you through maintenance and ongoing support.",
  },
];

function SVGConnectingLine({ index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="hidden lg:flex items-center justify-center flex-1 mt-8">
      <svg width="100%" height="4" viewBox="0 0 200 4" preserveAspectRatio="none" className="overflow-visible">
        <line
          x1="0" y1="2" x2="200" y2="2"
          stroke="url(#lineGrad)"
          strokeWidth="2"
          strokeDasharray="8 4"
          className={`transition-all duration-[1500ms] ease-out ${isInView ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: `${index * 0.3}s` }}
        />
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0057FF" />
            <stop offset="100%" stopColor="#00C2FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-28 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="relative max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-4">THE PROCESS</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Simple, Fast, and{" "}
            <span className="gradient-text">Reliable</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Getting started with NI For Office Equipment Trading Co. LLC is straightforward — here's how it works.
          </p>
        </ScrollReveal>

        {/* Steps + connecting lines */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-0">
          {steps.map((step, i) => (
            <React.Fragment key={step.number}>
              <ScrollReveal delay={i * 0.18} className="flex-1">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="relative text-center lg:text-left p-8 rounded-3xl border border-gray-100 bg-white shadow-soft hover:shadow-soft-lg hover:border-blue-100 transition-all group"
                >
                  {/* Number badge */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 text-white font-bold text-lg mb-5 shadow-blue group-hover:scale-110 transition-transform mx-auto lg:mx-0"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="text-4xl mb-4">{step.icon}</div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{step.description}</p>

                  {/* Blue bottom accent */}
                  <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </ScrollReveal>

              {/* SVG line connector between steps */}
              {i < steps.length - 1 && <SVGConnectingLine index={i} />}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-4 rounded-full bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition-all shadow-blue hover:scale-105"
            >
              Start the Process →
            </button>
            <a
              href="tel:+97142345678"
              className="px-10 py-4 rounded-full border border-gray-200 text-gray-700 font-semibold text-base hover:border-blue-200 hover:bg-blue-50 transition-all"
            >
              📞 Call Us Directly
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
