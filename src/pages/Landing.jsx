import React, { useEffect, useState } from "react";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import TrustedBySection from "../components/landing/TrustedBySection";
import ServicesSection from "../components/landing/ServicesSection";
import FlyersSection from "../components/landing/FlyersSection";
import ProductsSection from "../components/landing/ProductsSection";
import WhyUsSection from "../components/landing/WhyUsSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import AboutSection from "../components/landing/AboutSection";
import ContactSection from "../components/landing/ContactSection";
import Footer from "../components/landing/Footer";
import CursorEffect from "../components/landing/CursorEffect";
import BackgroundAnimation from "../components/landing/BackgroundAnimation";
import TermsModal from "../components/landing/TermsModal";
import PrivacyModal from "../components/landing/PrivacyModal";

export default function Landing() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    // Lenis smooth scroll + GSAP ScrollTrigger setup
    let lenis;
    (async () => {
      try {
        const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        gsap.registerPlugin(ScrollTrigger);

        lenis = new Lenis({
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          smoothTouch: false,
        });

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } catch (e) {
        console.warn("Lenis/GSAP not available:", e);
      }
    })();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-foreground overflow-x-hidden relative">
      <CursorEffect />
      <BackgroundAnimation />
      <div className="relative z-10">
        <Navbar onTerms={() => setShowTerms(true)} onPrivacy={() => setShowPrivacy(true)} />
        <HeroSection />
        <TrustedBySection />
        <ServicesSection />
        <FlyersSection />
        <ProductsSection />
        <WhyUsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
        <Footer onTerms={() => setShowTerms(true)} onPrivacy={() => setShowPrivacy(true)} />
      </div>
      <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
      <PrivacyModal open={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </div>
  );
}
