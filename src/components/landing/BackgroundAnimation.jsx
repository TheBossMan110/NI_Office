import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {/* Animated blobs */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-blue-100/60 rounded-full animate-blob animate-pulse-soft"
        style={{ filter: "blur(60px)" }}
      />
      <div
        className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-indigo-100/50 rounded-full animate-blob animation-delay-2000 animate-pulse-soft"
        style={{ filter: "blur(70px)" }}
      />
      <div
        className="absolute -bottom-32 left-1/3 w-[400px] h-[400px] bg-sky-100/60 rounded-full animate-blob animation-delay-4000 animate-pulse-soft"
        style={{ filter: "blur(60px)" }}
      />

      {/* Floating dots grid */}
      <FloatingDots />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern-light opacity-100" />
    </div>
  );
}

function FloatingDots() {
  const dots = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 5,
    delay: Math.random() * 4,
    duration: 4 + Math.random() * 4,
  }));

  return (
    <>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-blue-400/20"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}