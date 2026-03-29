import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Phone, Mail, Instagram, Facebook, ArrowUpRight, MessageCircle, CheckCircle, XCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ScrollReveal from "./ScrollReveal";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", service: "", message: "",
  });
  const [sending, setSending] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: null, message: "" }); // type: "success" | "error"

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
  };

  const closePopup = () => {
    setPopup({ show: false, type: null, message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Manual validation (Radix Select doesn't support native required)
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      showPopup("error", "Please fill in all required fields (Name, Email, Phone).");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showPopup("error", "Please enter a valid email address.");
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        showPopup("success", "Your message has been sent successfully! We'll get back to you within 24 hours.");
        setFormData({ name: "", company: "", email: "", phone: "", service: "", message: "" });
      } else {
        showPopup("error", data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      showPopup("error", "Connection error. Please check your internet and try again.");
    } finally {
      setSending(false);
    }
  };

  const contactDetails = [
    { Icon: MapPin, label: "Location", value: "Dubai, United Arab Emirates", href: null },
    { Icon: Phone, label: "Mobile", value: "+971 55 856 0495 / +971 56 9123171", href: "tel:+971558560495" },
    { Icon: Phone, label: "Office Phone", value: "00971 4 259 7763", href: "tel:+97142597763" },
    { Icon: MessageCircle, label: "WhatsApp", value: "+971 55 856 0495", href: "https://wa.me/971558560495" },
    { Icon: MessageCircle, label: "WhatsApp", value: "+971 56 9123171", href: "https://wa.me/971569123171" },
    { Icon: Mail, label: "Email", value: "info@nioffice.com", href: "mailto:info@nioffice.com" },
  ];

  return (
    <section id="contact" className="relative py-28 overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white">
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ──── Popup Modal ──── */}
      <AnimatePresence>
        {popup.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            onClick={closePopup}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-10 max-w-md w-full text-center"
            >
              {/* Close button */}
              <button onClick={closePopup} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 18, delay: 0.1 }}
                className={`w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center ${
                  popup.type === "success"
                    ? "bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-green-200"
                    : "bg-gradient-to-br from-red-400 to-rose-500 shadow-lg shadow-red-200"
                }`}
              >
                {popup.type === "success" ? (
                  <CheckCircle className="w-10 h-10 text-white" />
                ) : (
                  <XCircle className="w-10 h-10 text-white" />
                )}
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {popup.type === "success" ? "Message Sent! ✉️" : "Oops! Something Went Wrong"}
              </h3>

              {/* Message */}
              <p className="text-gray-500 leading-relaxed mb-6">
                {popup.message}
              </p>

              {/* Action button */}
              <Button
                onClick={closePopup}
                className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
                  popup.type === "success"
                    ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200"
                    : "bg-rose-500 hover:bg-rose-600 shadow-rose-200"
                } shadow-lg`}
              >
                {popup.type === "success" ? "Got it!" : "Try Again"}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-4">CONTACT US</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Let's Solve Your Office &{" "}
            <span className="gradient-text">Security Needs</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Get in touch for a free consultation or quote — we respond within 24 hours.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <ScrollReveal className="lg:col-span-3">
            <div className="relative rounded-3xl border border-gray-100 bg-white shadow-soft-lg p-8 sm:p-10 overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Full Name *</label>
                    <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Smith" className="bg-gray-50 border-gray-200 h-12 rounded-xl focus:border-blue-400" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Company Name</label>
                    <Input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your Company LLC" className="bg-gray-50 border-gray-200 h-12 rounded-xl" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                    <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 000 0000" className="bg-gray-50 border-gray-200 h-12 rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Email Address *</label>
                    <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com" className="bg-gray-50 border-gray-200 h-12 rounded-xl focus:border-blue-400" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Service Required</label>
                  <Select value={formData.service} onValueChange={(v) => setFormData({ ...formData, service: v })}>
                    <SelectTrigger className="bg-gray-50 border-gray-200 h-12 rounded-xl">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CCTV Camera Systems">CCTV Camera Systems</SelectItem>
                      <SelectItem value="Door Access Control">Door Access Control</SelectItem>
                      <SelectItem value="Digital Attendance System">Digital Attendance System</SelectItem>
                      <SelectItem value="Printers & Office Equipment">Printers & Office Equipment</SelectItem>
                      <SelectItem value="Toner & Ink Supply">Toner & Ink Supply</SelectItem>
                      <SelectItem value="Stationery & Office Supplies">Stationery & Office Supplies</SelectItem>
                      <SelectItem value="Installation / Repair / Maintenance">Installation / Repair / Maintenance</SelectItem>
                      <SelectItem value="Laser Cutting Services">Laser Cutting Services</SelectItem>
                      <SelectItem value="General Enquiry">General Enquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Message / Requirements</label>
                  <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your requirements..." className="bg-gray-50 border-gray-200 rounded-xl min-h-[120px]" />
                </div>
                <Button type="submit" disabled={sending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-13 py-4 text-base font-semibold group shadow-blue transition-all">
                  {sending ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <>
                      Request a Free Quote
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </ScrollReveal>

          {/* Contact info */}
          <ScrollReveal delay={0.2} className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-soft space-y-1">
              <h3 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Contact Information</h3>
              {contactDetails.map(({ Icon, label, value, href }, idx) => {
                const content = (
                  <div className="flex items-start gap-4 group py-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                      <Icon className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{label}</p>
                      <p className="text-gray-800 font-semibold text-sm mt-0.5">{value}</p>
                    </div>
                  </div>
                );
                return href ? (
                  <a key={`${label}-${idx}`} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block border-b border-gray-50 last:border-0">
                    {content}
                  </a>
                ) : (
                  <div key={`${label}-${idx}`} className="border-b border-gray-50 last:border-0">{content}</div>
                );
              })}
              <div className="pt-3 text-sm text-gray-500 font-medium">
                🕐 Mon – Sat: 9:00 AM – 8:00 PM
              </div>
            </div>

            {/* Social links */}
            <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-soft">
              <h3 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Follow Us</h3>
              <div className="flex flex-col gap-3">
                {[
                  { Icon: Instagram, label: "Instagram", href: "https://instagram.com/ni.offices" },
                  { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/people/NI-Offices/61570202446854/" },
                ].map(({ Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors group">
                    <Icon className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">{label}</span>
                    <ArrowUpRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-blue-600 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map card */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-soft overflow-hidden">
              <div className="h-44 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative">
                <div className="grid-pattern-light absolute inset-0 opacity-60" />
                <div className="relative text-center z-10">
                  <MapPin className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-gray-800">Dubai, United Arab Emirates</p>
                  <p className="text-xs text-gray-400 mt-1">Business Bay — Central Dubai</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}