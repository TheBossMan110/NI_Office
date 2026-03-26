import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Target, Zap, Gem, Handshake, Wrench } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

function AnimatedCounter({ target, suffix = "", prefix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    if (target === "24/7") { setCount("24/7"); return; }
    let start = 0;
    const numTarget = parseInt(target.replace(/\D/g, ""), 10);
    const increment = numTarget / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numTarget) {
        setCount(numTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  const displayCount = target === "24/7" ? "24/7" : `${count}${suffix}`;

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold gradient-text" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {prefix}{displayCount}
    </span>
  );
}

const stats = [
  { target: "500", suffix: "+", label: "Businesses Served" },
  { target: "10", suffix: "+", label: "Years of Experience" },
  { target: "1000", suffix: "+", label: "Systems Installed" },
  { target: "24/7", suffix: "", label: "Support Available" },
];

const features = [
  {
    icon: Shield,
    title: "UAE Licensed & Trusted",
    desc: "Registered company with years of proven delivery across Dubai and the UAE.",
    color: "bg-blue-600",
  },
  {
    icon: Target,
    title: "One-Stop Solution",
    desc: "Security systems, office equipment, supplies, and maintenance — all from a single reliable partner.",
    color: "bg-indigo-600",
  },
  {
    icon: Zap,
    title: "Fast Response Times",
    desc: "Our support team responds quickly and our technicians arrive on time, every time.",
    color: "bg-violet-600",
  },
  {
    icon: Gem,
    title: "Premium Quality Products",
    desc: "We supply only certified, genuine, and high-performance products from leading global brands.",
    color: "bg-blue-600",
  },
  {
    icon: Handshake,
    title: "Long-Term Relationships",
    desc: "We don't just sell — we partner with businesses and grow with them for the long term.",
    color: "bg-teal-600",
  },
  {
    icon: Wrench,
    title: "Expert Installation & Maintenance",
    desc: "Certified engineers handle all installations, ensuring everything works perfectly from day one.",
    color: "bg-emerald-600",
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="relative py-28 overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="relative max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-4">WHY NI FOR OFFICE EQUIPMENT TRADING CO. LLC</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            The Trusted Partner for{" "}
            <span className="gradient-text">Dubai Businesses</span>
          </h2>
        </ScrollReveal>

        {/* Animated stats counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center p-8 rounded-3xl border border-gray-100 bg-white shadow-soft hover:shadow-blue transition-all duration-300 hover:-translate-y-1">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                <p className="text-sm text-gray-400 mt-3 font-medium">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-4 p-7 rounded-2xl border border-gray-100 bg-white hover:border-blue-100 hover:shadow-soft-lg transition-all group shadow-soft"
                >
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1.5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}