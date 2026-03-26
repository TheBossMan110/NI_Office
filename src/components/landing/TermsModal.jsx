import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function TermsModal({ open, onClose }) {
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
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Terms & Conditions</h2>
              <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="px-8 py-6 space-y-6 text-sm text-gray-600 leading-relaxed">
              <p className="text-xs text-gray-400">Last Updated: January 2025</p>

              {[
                { title: "1. Acceptance of Terms", text: "By accessing or using the services of NI For Office Equipment Trading Co. LLC (\"the Company\"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services." },
                { title: "2. Services", text: "NI For Office Equipment Trading Co. LLC provides office equipment sales, toner and ink supply, CCTV systems, access control solutions, digital attendance systems, stationery, and professional installation, repair, and maintenance services in Dubai and the UAE." },
                { title: "3. Quotations & Pricing", text: "All quotations are valid for 7 days from the date of issue unless otherwise stated. Prices are subject to change based on product availability and market conditions. VAT at the applicable UAE rate will be added to all invoices where applicable." },
                { title: "4. Orders & Payments", text: "Orders are confirmed only upon receipt of a signed purchase order or written confirmation. Payment terms will be specified in the quotation. The Company reserves the right to withhold delivery or service until payment is received in full." },
                { title: "5. Delivery & Installation", text: "Delivery timelines are estimated and not guaranteed. The Company will make every effort to meet agreed timelines. Installation services will be scheduled based on site readiness and team availability." },
                { title: "6. Warranty", text: "Products supplied by the Company carry the manufacturer's standard warranty unless otherwise stated. Warranty claims are subject to terms set by the respective manufacturer. Damage due to misuse, unauthorized modification, or negligence is not covered." },
                { title: "7. Maintenance Services", text: "Scheduled and emergency maintenance is subject to service agreement terms. The Company is not liable for downtime resulting from third-party hardware or software failures outside our supplied systems." },
                { title: "8. Returns & Refunds", text: "Goods may be returned within 7 days of delivery if found to be defective or not as specified, subject to prior written approval. Custom orders and consumable items (toner, ink) are non-refundable once opened." },
                { title: "9. Limitation of Liability", text: "The Company's liability is limited to the value of the product or service purchased. The Company is not liable for any indirect, consequential, or incidental damages arising from the use of our products or services." },
                { title: "10. Privacy", text: "Customer information collected during enquiries, orders, or service requests is used solely for business purposes and will not be shared with third parties without consent." },
                { title: "11. Governing Law", text: "These Terms and Conditions are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the jurisdiction of the courts of Dubai, UAE." },
                { title: "12. Contact", text: "For any questions regarding these Terms, please contact us at the details provided in the Contact section of this website." },
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
