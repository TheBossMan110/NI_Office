import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    name: "Operations Manager",
    role: "Operations Manager",
    company: "Dubai Retail Group",
    text: "NI For Office Equipment installed our complete CCTV and access control system. Professional team, flawless execution, and the quality is outstanding. Highly recommended.",
    rating: 5,
  },
  {
    name: "Office Administrator",
    role: "Office Administrator",
    company: "Emirates Trading LLC",
    text: "We rely on them for all our monthly toner and stationery supply. Always on time, always the right products, and always competitively priced. Excellent service.",
    rating: 5,
  },
  {
    name: "HR Director",
    role: "HR Director",
    company: "Gulf Ventures FZE",
    text: "Their digital attendance system transformed our HR workflow entirely. No more manual tracking. The integration with our payroll was seamless.",
    rating: 5,
  },
  {
    name: "Branch Manager",
    role: "Branch Manager",
    company: "Al Futtaim Group Partner",
    text: "Fast, reliable, and genuinely helpful. When our printer needed urgent repair, they had a technician on-site within hours. Couldn't ask for better support.",
    rating: 5,
  },
  {
    name: "CEO",
    role: "CEO",
    company: "Horizon Real Estate LLC",
    text: "We've been working with NI For Office Equipment for three years. They're not just a supplier — they're a real business partner. Consistent quality every time.",
    rating: 5,
  },
];

const clientLogos = [
  "Dubai Retail Group", "Emirates Trading LLC", "Gulf Ventures FZE",
  "Al Futtaim Group", "Horizon Real Estate LLC", "DEWA", "DP World",
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (paused) {
      clearInterval(timerRef.current);
    } else {
      startTimer();
    }
    return () => clearInterval(timerRef.current);
  }, [paused]);

  const navigate = (dir) => {
    setDirection(dir);
    setCurrent((prev) =>
      dir === 1 ? (prev + 1) % testimonials.length : (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="relative py-28 overflow-hidden bg-gradient-to-b from-blue-50/30 via-white to-white">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="relative max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-4">CLIENT TESTIMONIALS</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Trusted by Businesses{" "}
            <span className="gradient-text">Across Dubai</span>
          </h2>
        </ScrollReveal>

        {/* Carousel */}
        <div
          className="max-w-3xl mx-auto mb-20"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative rounded-3xl border border-gray-100 bg-white shadow-soft-lg p-8 sm:p-12 min-h-[300px] flex items-center">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-blue-100" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full text-center"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8 italic">
                  "{testimonials[current].text}"
                </p>

                <div>
                  <p className="font-bold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    — {testimonials[current].role}
                  </p>
                  <p className="text-sm text-blue-600 font-semibold mt-0.5">
                    {testimonials[current].company}
                  </p>
                  <div className="flex justify-center mt-2 gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pause indicator */}
            {paused && (
              <div className="absolute top-4 right-4 text-xs text-gray-300 font-medium">⏸ Paused</div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="rounded-full w-10 h-10 border-gray-200 hover:border-blue-200">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all ${i === current ? "bg-blue-600 w-8" : "bg-gray-200 w-2"}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={() => navigate(1)} className="rounded-full w-10 h-10 border-gray-200 hover:border-blue-200">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Client logos */}
        <ScrollReveal>
          <div className="border-t border-gray-100 pt-12">
            <p className="text-center text-sm text-gray-400 mb-8 tracking-widest uppercase font-medium">
              Trusted by Leading Organizations
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
              {clientLogos.map((logo, i) => (
                <motion.div
                  key={logo}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="text-base font-bold text-gray-200 hover:text-gray-500 transition-colors cursor-default"
                >
                  {logo}
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}