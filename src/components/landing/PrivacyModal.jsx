import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function PrivacyModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between z-10 rounded-t-3xl">
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Privacy Policy</h2>
              <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="px-8 py-6 space-y-6 text-sm text-gray-600 leading-relaxed">
              <p className="text-xs text-gray-400">Last Updated: January 2025</p>

              {[
                {
                  title: "1. Information We Collect",
                  text: "We collect information you provide directly when using our contact form, requesting a quote, or placing an order. This may include your name, company name, email address, phone number, and service requirements.",
                },
                {
                  title: "2. How We Use Your Information",
                  text: "We use the information collected to respond to your enquiries, provide quotes, process orders, and deliver our services. We may also use it to send you relevant updates about our products and services, with your consent.",
                },
                {
                  title: "3. Data Sharing",
                  text: "NI For Office Equipment Trading Co. LLC does not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by UAE law or necessary for service delivery (e.g., delivery partners, payment processors).",
                },
                {
                  title: "4. Data Security",
                  text: "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure.",
                },
                {
                  title: "5. Data Retention",
                  text: "We retain your personal information for as long as necessary to provide services and comply with our legal obligations. You may request deletion of your data at any time by contacting us.",
                },
                {
                  title: "6. Your Rights",
                  text: "You have the right to access, correct, or delete your personal data we hold. You may also opt out of marketing communications at any time. To exercise these rights, please contact us using the details on our website.",
                },
                {
                  title: "7. Cookies",
                  text: "Our website may use cookies to improve your browsing experience. You can control cookie settings through your browser. Disabling cookies may affect some website functionality.",
                },
                {
                  title: "8. Governing Law",
                  text: "This Privacy Policy is governed by the laws of the United Arab Emirates. Any disputes shall be subject to the jurisdiction of the courts of Dubai, UAE.",
                },
                {
                  title: "9. Contact Us",
                  text: "For any questions or concerns about this Privacy Policy, or to exercise your data rights, please contact us at info@nioffice.ae or call +971 4 234 5678.",
                },
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{section.title}</h3>
                  <p>{section.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
