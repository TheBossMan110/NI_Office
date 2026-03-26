import React from "react";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import ServicesSection from "../components/landing/ServicesSection";
import ProductsSection from "../components/landing/ProductsSection";
import WhyUsSection from "../components/landing/WhyUsSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import ContactSection from "../components/landing/ContactSection";
import Footer from "../components/landing/Footer";
import CursorEffect from "../components/landing/CursorEffect";
import BackgroundAnimation from "../components/landing/BackgroundAnimation";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-foreground overflow-x-hidden relative">
      <CursorEffect />
      <BackgroundAnimation />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <ProductsSection />
        <WhyUsSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}