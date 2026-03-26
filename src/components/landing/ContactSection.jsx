import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Instagram, Facebook, ArrowUpRight, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ScrollReveal from "./ScrollReveal";
import { toast } from "sonner";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", service: "", message: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSuccess(true);
    toast.success("Message sent! We'll be in touch within 24 hours.");
    setFormData({ name: "", company: "", email: "", phone: "", service: "", message: "" });
    setTimeout(() => setSuccess(false), 6000);
  };

    const contactDetails = [
      { Icon: MapPin, label: "Location", value: "Dubai, United Arab Emirates", href: null },
      { Icon: Phone, label: "Phone", value: "+971 55 856 0495 / +971 56 9123171", href: "tel:+971558560495" },
      { Icon: MessageCircle, label: "WhatsApp", value: "+971 55 856 0495", href: "https://wa.me/971558560495" },
      { Icon: Mail, label: "Email", value: "marketing.niofficedxb@gmail.com", href: "mailto:marketing.niofficedxb@gmail.com" },
    ];

  return (
    <section id="contact" className="relative py-28 overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white">
      <div className="section-divider absolute top-0 left-0 right-0" />

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
              {/* Success overlay */}
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center gap-4 z-10 rounded-3xl"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <p className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Message Sent!</p>
                  <p className="text-gray-500 text-center max-w-xs">Thank you! We'll be in touch within 24 hours.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Full Name *</label>
                    <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    <Input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 000 0000" className="bg-gray-50 border-gray-200 h-12 rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Email Address *</label>
                    <Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com" className="bg-gray-50 border-gray-200 h-12 rounded-xl focus:border-blue-400" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Service Required *</label>
                  <Select required value={formData.service} onValueChange={(v) => setFormData({ ...formData, service: v })}>
                    <SelectTrigger className="bg-gray-50 border-gray-200 h-12 rounded-xl">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cctv">CCTV Camera Systems</SelectItem>
                      <SelectItem value="access">Door Access Control</SelectItem>
                      <SelectItem value="attendance">Digital Attendance System</SelectItem>
                      <SelectItem value="printers">Printers & Office Equipment</SelectItem>
                      <SelectItem value="toner">Toner & Ink Supply</SelectItem>
                      <SelectItem value="stationery">Stationery & Office Supplies</SelectItem>
                      <SelectItem value="installation">Installation / Repair / Maintenance</SelectItem>
                      <SelectItem value="general">General Enquiry</SelectItem>
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
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
            <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-soft space-y-5">
              <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Contact Information</h3>
              {contactDetails.map(({ Icon, label, value, href }) => {
                const content = (
                  <div className="flex items-start gap-4 group">
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
                  <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}
              <div className="pt-2 text-sm text-gray-400">
                🕐 Sun–Thu: 9:00 AM – 6:00 PM
              </div>
            </div>

            {/* Social links */}
            <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-soft">
              <h3 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Follow Us</h3>
              <div className="flex flex-col gap-3">
                {[
                  { Icon: Instagram, label: "Instagram", href: "https://instagram.com/ni.offices" },
                  { Icon: Facebook, label: "Facebook", href: "https://facebook.com/NIOffices" },
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