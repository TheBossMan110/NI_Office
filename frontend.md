# NI For Office Equipment Co. LLC — Premium Landing Page Build Prompt
### For Developer / Antigravity Team

---

## ⚠️ PRE-BUILD CHECKLIST — Review Existing Code First

Before writing any new code, go through the existing frontend and verify:

- [ ] **Lenis smooth scroll** is installed, initialized, and working (`@studio-freight/lenis` or `lenis`)
- [ ] **GSAP + ScrollTrigger** plugin is registered and firing on all scroll animations
- [ ] **Three.js** (or React Three Fiber) is set up for 3D elements
- [ ] **Theme is WHITE** — not dark/black. Remove all dark navy/black backgrounds. Replace with white/off-white/light theme (see color system below)
- [ ] All section content matches the company info below (update anything outdated)
- [ ] All images are **real photographs** (Unsplash URLs provided below) — no AI-generated or placeholder images
- [ ] Mobile responsiveness is fully working across all sections
- [ ] Fonts are loading from Google Fonts or locally — not fallback system fonts
- [ ] All animations trigger correctly on scroll (not just on page load)
- [ ] NavBar blur/sticky effect is working
- [ ] Contact form is functional with validation
- [ ] Terms & Conditions section/page is present (see content below)
- [ ] 3D scroll-reactive object is present in Hero section

---

## 🏢 Company Information

**Company Name:** NI For Office Equipment Co. LLC
**Location:** Dubai, United Arab Emirates
**Industry:** Office Equipment, Security Systems & Corporate Solutions
**Target Clients:** Businesses of all sizes across Dubai, UAE

**Full Company Description:**
NI For Office Equipment Co. LLC is a trusted Dubai-based company dedicated to delivering complete office and security solutions tailored to modern business needs. We specialize in providing advanced CCTV camera systems, door access control solutions, and digital attendance systems designed to enhance security, efficiency, and workplace management. In addition to our security services, we offer a wide range of office essentials including toner and ink supply, office equipment, and stationery products to ensure smooth day-to-day operations for businesses of all sizes. Our expertise also extends to professional installation, reliable repair, and ongoing maintenance services, ensuring that every system we provide operates at peak performance. With a strong commitment to quality, innovation, and customer satisfaction, we aim to build long-term relationships by delivering dependable, cost-effective, and high-performance solutions that empower businesses across Dubai, UAE.

**Trust Signals:**
- 500+ Business Clients Served
- 10+ Years of Industry Experience
- 1,000+ Systems Successfully Installed
- 24/7 Technical Support Available
- UAE Trade License Registered Company
- Serving Dubai, Sharjah, Abu Dhabi & across UAE

---

## 🎨 Design Language & Theme

### ⚠️ IMPORTANT: WHITE THEME — NOT DARK

The original prompt requested a dark/navy theme. **Override that completely.**
This website uses a **clean white premium theme** — think Apple.com, not a dark SaaS product.

### Color System

```css
:root {
  /* Backgrounds */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F7F8FA;
  --bg-tertiary: #EEF1F5;
  --bg-card: #FFFFFF;

  /* Brand Colors */
  --brand-blue: #0057FF;
  --brand-blue-light: #3D7FFF;
  --brand-blue-dark: #003DBF;
  --brand-accent: #00C2FF;

  /* Text */
  --text-primary: #0A0A0F;
  --text-secondary: #4A4A5A;
  --text-muted: #8A8A9A;

  /* Borders & Shadows */
  --border-light: rgba(0, 0, 0, 0.06);
  --shadow-card: 0 4px 24px rgba(0, 87, 255, 0.08);
  --shadow-hover: 0 12px 48px rgba(0, 87, 255, 0.18);
  --glow-blue: 0 0 40px rgba(0, 87, 255, 0.15);
}
```

### Typography

```
Display / Hero Headings: "Clash Display" or "Cabinet Grotesk" (Bold 700–800)
Section Headings: "Satoshi" or "Plus Jakarta Sans" (SemiBold 600)
Body Text: "DM Sans" (Regular 400, Medium 500)
Accent / Labels: "Syne" (Medium 500) — for tags, badges, section labels
```

Google Fonts fallback order: Satoshi → Plus Jakarta Sans → DM Sans

### Aesthetic Direction

- **Apple-level whitespace** — generous padding, breathing room between elements
- **Glassmorphism cards** on white: `background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.9);`
- **Subtle blue gradient accents** — not overwhelming, used for hero, CTAs, section dividers
- **Sharp, clean grid** — 12-column grid, consistent 24px/48px/96px spacing scale
- **Micro-texture** — optional very subtle noise texture overlay at 2–3% opacity on sections
- **No dark sections** except optionally a single dark CTA strip near the bottom

---

## ⚡ Animation & Interaction Stack

### Required Libraries

```bash
npm install lenis gsap @gsap/react three @react-three/fiber @react-three/drei
# or
yarn add lenis gsap @gsap/react three @react-three/fiber @react-three/drei
```

### Lenis Smooth Scroll Setup

```tsx
// app/layout.tsx or _app.tsx
import Lenis from 'lenis'
import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

useEffect(() => {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  return () => {
    lenis.destroy()
  }
}, [])
```

### GSAP ScrollTrigger Animations Required

Every section must implement at minimum:

```tsx
// Fade + slide up on scroll entry
gsap.fromTo(element, 
  { opacity: 0, y: 60 },
  { 
    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: element, start: 'top 80%', end: 'bottom 20%' }
  }
)

// Staggered children
gsap.fromTo(cards, 
  { opacity: 0, y: 40 },
  { 
    opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
    scrollTrigger: { trigger: container, start: 'top 75%' }
  }
)

// Text split/reveal for hero headline
// Use GSAP SplitText or manual span wrapping with staggered letter animation

// Parallax background layers
gsap.to(bgLayer, {
  yPercent: -20,
  ease: 'none',
  scrollTrigger: { trigger: section, scrub: 1.5 }
})

// Section pinning for storytelling
ScrollTrigger.create({
  trigger: section,
  start: 'top top',
  end: '+=400',
  pin: true,
  pinSpacing: true
})
```

### 3D Hero Object — Apple/Antigravity Style

```tsx
// Use React Three Fiber for the 3D object in the hero
// The 3D object should:
// 1. Float gently (sine wave Y position animation)
// 2. React to mouse movement (subtle X/Y rotation based on cursor position)
// 3. Scroll down → object scales down and moves to the side (ScrollTrigger scrub)
// 4. Soft environment lighting — white studio feel

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float } from '@react-three/drei'

// Object options (pick one, use GLTF model or procedural geometry):
// - Stylized printer/copier model
// - Abstract geometric shape representing technology (torus knot, icosahedron)
// - Camera/lens shape for CCTV section
// - Floating office supply composition

// Mouse parallax on hero:
const handleMouseMove = (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2
  const y = (e.clientY / window.innerHeight - 0.5) * 2
  // Apply to Three.js camera or object rotation
}

// Scroll-linked 3D animation:
// As user scrolls past hero, the 3D object:
// - Shrinks (scale: 1 → 0.3)
// - Drifts to the right and fades
// - Creates a "product flying in" feel
```

**Free 3D Model Sources to use:**
- https://market.pmnd.rs/ (Poly Pizza / pmndrs market)
- https://sketchfab.com/features/free-3d-models (free/CC license)
- Alternatively: create a stylized abstract tech geometry with Three.js primitives

---

## 🏗️ Landing Page Sections (Complete)

### Section 1 — Navigation Bar

**Behavior:**
- Fixed/sticky at top
- On scroll: `background: rgba(255,255,255,0.8); backdrop-filter: blur(24px); border-bottom: 1px solid rgba(0,0,0,0.06);`
- Logo left, nav links center, CTA button right
- Mobile: hamburger menu with smooth slide-in drawer

**Nav Links:** Home | Services | Products | About | Contact
**CTA Button:** "Get a Free Quote" (blue, rounded pill)

---

### Section 2 — Hero (WOW Factor)

**Layout:** Full viewport height (100vh), white background with subtle radial gradient from center

**Content:**
- **Top badge:** `🏆 Dubai's Trusted Office & Security Solutions Partner`
- **Headline (large, bold, split-text animated):**
  > Smart Office & Security Solutions for Modern Businesses
- **Subheadline:**
  > From CCTV systems and access control to printers, toner, and stationery — we power businesses across Dubai with everything they need.
- **CTA Buttons:**
  - Primary: "Get a Free Quote" (solid blue)
  - Secondary: "Explore Our Services" (outlined)
- **Trust line below CTAs:** `✓ UAE Licensed Company  ✓ 500+ Clients  ✓ 10+ Years Experience`

**3D Element:**
- Floating 3D object (printer, or abstract tech shape) — center or right side
- Reacts to mouse movement
- Scroll down → animates away with parallax

**Background Details:**
- Very subtle blue radial glow behind 3D object
- Floating abstract geometric shapes (circles, dots grid) at very low opacity
- Light noise texture overlay

**Hero Image (fallback if no 3D):**
`https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=90`

---

### Section 3 — Trusted By / Social Proof Strip

**Layout:** Horizontal scrolling logo marquee (infinite loop animation)

**Content:**
- Label: "Trusted by businesses across Dubai & UAE"
- Show 6–8 generic corporate logos OR icons with company type names
- Slow, continuous left-scroll animation (CSS or GSAP)

---

### Section 4 — Services Section

**Section Label:** `OUR SERVICES`
**Headline:** Everything Your Business Needs, Under One Roof
**Subtext:** From security infrastructure to everyday office essentials — we deliver quality, reliability, and expertise.

**Service Cards (7 total) — Grid layout, hover: lift + blue glow shadow**

---

#### Card 1 — CCTV Camera Systems
- **Real Image:** `https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&q=85`
- **Icon:** 🎥
- **Title:** CCTV Camera Systems
- **Description:** Advanced HD and 4K surveillance systems with 24/7 monitoring, night vision, motion detection, and remote mobile access. Protect your business around the clock.
- **Features:** HD/4K Cameras • Night Vision • Remote Access • DVR/NVR Systems • Indoor & Outdoor
- **CTA:** "Learn More →"

#### Card 2 — Door Access Control
- **Real Image:** `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85`
- **Icon:** 🔐
- **Title:** Door Access Control Solutions
- **Description:** Control who enters your premises with smart card readers, biometric scanners, and face recognition systems — all integrated and managed from a central dashboard.
- **Features:** Card/PIN Access • Biometric Scanners • Face Recognition • Multi-Door Management • HR Integration
- **CTA:** "Learn More →"

#### Card 3 — Digital Attendance Systems
- **Real Image:** `https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=85`
- **Icon:** 🕐
- **Title:** Digital Attendance Systems
- **Description:** Automate workforce tracking with biometric and RFID attendance systems that integrate with payroll software — eliminating manual errors and saving HR hours.
- **Features:** Biometric & RFID • Real-Time Reports • Payroll Integration • Cloud Management • Multi-Location
- **CTA:** "Learn More →"

#### Card 4 — Printers & Office Equipment
- **Real Image:** `https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=85`
- **Icon:** 🖨️
- **Title:** Printers & Office Equipment
- **Description:** Supply and installation of professional-grade printers, multifunction copiers, scanners, shredders, and laminators from leading global brands — backed by full after-sales support.
- **Features:** Laser & Inkjet Printers • Photocopiers • Scanners • Shredders • Laminators
- **CTA:** "Learn More →"

#### Card 5 — Toner & Ink Supply
- **Real Image:** `https://images.unsplash.com/photo-1612815292201-39b59c37ff74?w=600&q=85`
- **Icon:** 🖋️
- **Title:** Toner & Ink Cartridge Supply
- **Description:** Genuine and compatible toner and ink cartridges for all major printer brands. Bulk ordering, subscription supply, and fast delivery across Dubai and the UAE.
- **Features:** HP • Canon • Epson • Brother • Ricoh • Bulk Discounts • Fast UAE Delivery
- **CTA:** "Order Now →"

#### Card 6 — Stationery & Office Supplies
- **Real Image:** `https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600&q=85`
- **Icon:** 📎
- **Title:** Stationery & Office Supplies
- **Description:** Complete range of stationery essentials — paper, pens, folders, binders, desk accessories, and more. Corporate bulk supply available with competitive pricing for Dubai businesses.
- **Features:** Paper & Notebooks • Pens & Markers • Files & Folders • Desk Accessories • Corporate Accounts
- **CTA:** "Browse Supplies →"

#### Card 7 — Installation, Repair & Maintenance
- **Real Image:** `https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=85`
- **Icon:** 🔧
- **Title:** Installation, Repair & Maintenance
- **Description:** Certified technicians for complete system setup, rapid on-site repairs, and scheduled preventive maintenance — keeping every system running at peak performance.
- **Features:** Certified Technicians • Fast Response • Preventive Maintenance • Warranty Support • 24/7 Availability
- **CTA:** "Book a Technician →"

---

### Section 5 — Products Showcase

**Section Label:** `OUR PRODUCTS`
**Headline:** Premium Equipment, Trusted Brands
**Subtext:** Real products. Real quality. Delivered to your business in Dubai.

**Layout:** Horizontal scroll slider OR 3-column masonry grid
**Hover effect:** Zoom in slightly + show overlay with product name + "Enquire" button

**Product Images (all real, no AI):**

| Image URL | Caption |
|-----------|---------|
| `https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=700&q=85` | CCTV Security Camera |
| `https://images.unsplash.com/photo-1612815292201-39b59c37ff74?w=700&q=85` | Printer Toner Cartridges |
| `https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=700&q=85` | Office Printer / Copier |
| `https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=700&q=85` | Office Stationery |
| `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85` | Access Control Panel |
| `https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&q=85` | Biometric Attendance Device |
| `https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=700&q=85` | Office Technician / Maintenance |
| `https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=700&q=85` | Modern Office Setup |

---

### Section 6 — Why Choose Us

**Section Label:** `WHY NI FOR OFFICE EQUIPMENT`
**Headline:** The Trusted Partner for Dubai Businesses

**Layout:** Left column = text content. Right column = animated stats grid.

**Left — Feature List (icon + title + description):**

1. 🏆 **UAE Licensed & Trusted** — Registered company with years of proven delivery across Dubai and the UAE.
2. 🎯 **One-Stop Solution** — Security systems, office equipment, supplies, and maintenance — all from a single reliable partner.
3. ⚡ **Fast Response Times** — Our support team responds quickly and our technicians arrive on time, every time.
4. 💎 **Premium Quality Products** — We supply only certified, genuine, and high-performance products from leading global brands.
5. 🤝 **Long-Term Relationships** — We don't just sell — we partner with businesses and grow with them for the long term.
6. 🔧 **Expert Installation & Maintenance** — Certified engineers handle all installations, ensuring everything works perfectly from day one.

**Right — Animated Counters (count up on scroll entry):**

| Number | Label |
|--------|-------|
| 500+ | Businesses Served |
| 10+ | Years of Experience |
| 1,000+ | Systems Installed |
| 24/7 | Support Available |

**GSAP counter animation:**
```js
gsap.to(counter, {
  innerText: targetValue,
  duration: 2,
  ease: 'power2.out',
  snap: { innerText: 1 },
  scrollTrigger: { trigger: statsSection, start: 'top 70%' }
})
```

---

### Section 7 — How It Works (3-Step Process)

**Section Label:** `THE PROCESS`
**Headline:** Simple, Fast, and Reliable

**3 Steps (horizontal layout, connected with animated line):**

1. **📞 Contact Us** — Reach out via call, WhatsApp, or our contact form. Tell us what your business needs.
2. **📋 Get a Custom Quote** — Our team assesses your requirements and provides a tailored, transparent quote with no hidden costs.
3. **✅ We Deliver & Support** — We install, configure, and hand over — then stay with you through maintenance and support.

**Animation:** Steps reveal one by one on scroll. Connecting line draws itself (SVG stroke animation).

---

### Section 8 — Testimonials

**Section Label:** `CLIENT TESTIMONIALS`
**Headline:** Trusted by Businesses Across Dubai

**Layout:** Auto-sliding card carousel (pause on hover). 3 visible at a time on desktop.

**Testimonial 1:**
> "NI For Office Equipment installed our complete CCTV and access control system. Professional team, flawless execution, and the quality is outstanding. Highly recommended."
> — **Operations Manager**, Dubai Retail Group ⭐⭐⭐⭐⭐

**Testimonial 2:**
> "We rely on them for all our monthly toner and stationery supply. Always on time, always the right products, and always competitively priced. Excellent service."
> — **Office Administrator**, Emirates Trading LLC ⭐⭐⭐⭐⭐

**Testimonial 3:**
> "Their digital attendance system transformed our HR workflow entirely. No more manual tracking. The integration with our payroll was seamless."
> — **HR Director**, Gulf Ventures FZE ⭐⭐⭐⭐⭐

**Testimonial 4:**
> "Fast, reliable, and genuinely helpful. When our printer needed urgent repair, they had a technician on-site within hours. Couldn't ask for better support."
> — **Branch Manager**, Al Futtaim Group Partner ⭐⭐⭐⭐⭐

**Testimonial 5:**
> "We've been working with NI For Office Equipment for three years. They're not just a supplier — they're a real business partner. Consistent quality every time."
> — **CEO**, Horizon Real Estate LLC ⭐⭐⭐⭐⭐

---

### Section 9 — About the Company

**Section Label:** `ABOUT US`
**Headline:** Dubai's Trusted Office & Security Solutions Partner

**Layout:** Left = Image (real photo). Right = text content + trust badges.

**Image:**
`https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85`

**Content:**
NI For Office Equipment Co. LLC is a trusted Dubai-based company delivering complete office and security solutions tailored to the needs of modern businesses.

Founded on the principles of quality, reliability, and customer satisfaction, we have grown to become a dependable partner for businesses across the UAE — providing everything from advanced CCTV systems and access control to everyday office essentials like toner, stationery, and printing equipment.

Our team of certified technicians and experienced consultants ensures every solution we deliver is installed correctly, maintained regularly, and supported fully — giving your business the confidence to operate without interruption.

**Trust Badges (icons):**
- ✅ UAE Trade Licensed Company
- ✅ Certified Installation Engineers
- ✅ Genuine & Branded Products Only
- ✅ Serving Dubai, Sharjah & Abu Dhabi

---

### Section 10 — Contact & Get a Quote

**Section Label:** `CONTACT US`
**Headline:** Let's Solve Your Office & Security Needs
**Subtext:** Get in touch for a free consultation or quote — we respond within 24 hours.

**Layout:** Two columns — Left: contact details. Right: contact form.

**Contact Details:**
- 📍 Dubai, United Arab Emirates
- 📞 Phone: *(add number)*
- 📱 WhatsApp: *(add number)*
- 📧 Email: *(add email)*
- 🕐 Working Hours: Sunday – Thursday, 9:00 AM – 6:00 PM
- 📘 Facebook: *(add link)*
- 📸 Instagram: *(add link)*

**Contact Form Fields:**
```
Full Name *
Company Name
Phone Number *
Email Address *
Service Required * (dropdown):
  - CCTV Camera Systems
  - Door Access Control
  - Digital Attendance System
  - Printers & Office Equipment
  - Toner & Ink Supply
  - Stationery & Office Supplies
  - Installation / Repair / Maintenance
  - General Enquiry
Message / Requirements (textarea)
[Submit Button: "Send Message" or "Request a Free Quote"]
```

**Form Validation:** Required fields, email format, phone format.
**Success State:** Animated checkmark + "Thank you! We'll be in touch within 24 hours."

**Social Icons:** Instagram and Facebook only (as per original brief).

---

### Section 11 — Terms & Conditions

> **Add as a dedicated footer section or a separate scrollable modal/page linked from footer.**

**Title:** Terms & Conditions

**Content:**

---

**Last Updated:** January 2025

**1. Acceptance of Terms**
By accessing or using the services of NI For Office Equipment Co. LLC ("the Company"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.

**2. Services**
NI For Office Equipment Co. LLC provides office equipment sales, toner and ink supply, CCTV systems, access control solutions, digital attendance systems, stationery, and professional installation, repair, and maintenance services in Dubai and the UAE.

**3. Quotations & Pricing**
All quotations are valid for 7 days from the date of issue unless otherwise stated. Prices are subject to change based on product availability and market conditions. VAT at the applicable UAE rate will be added to all invoices where applicable.

**4. Orders & Payments**
Orders are confirmed only upon receipt of a signed purchase order or written confirmation. Payment terms will be specified in the quotation. The Company reserves the right to withhold delivery or service until payment is received in full.

**5. Delivery & Installation**
Delivery timelines are estimated and not guaranteed. The Company will make every effort to meet agreed timelines. Installation services will be scheduled based on site readiness and team availability.

**6. Warranty**
Products supplied by the Company carry the manufacturer's standard warranty unless otherwise stated. Warranty claims are subject to terms set by the respective manufacturer. Damage due to misuse, unauthorized modification, or negligence is not covered.

**7. Maintenance Services**
Scheduled and emergency maintenance is subject to service agreement terms. The Company is not liable for downtime resulting from third-party hardware or software failures outside our supplied systems.

**8. Returns & Refunds**
Goods may be returned within 7 days of delivery if found to be defective or not as specified, subject to prior written approval. Custom orders and consumable items (toner, ink) are non-refundable once opened.

**9. Limitation of Liability**
The Company's liability is limited to the value of the product or service purchased. The Company is not liable for any indirect, consequential, or incidental damages arising from the use of our products or services.

**10. Privacy**
Customer information collected during enquiries, orders, or service requests is used solely for business purposes and will not be shared with third parties without consent. See our Privacy Policy for details.

**11. Governing Law**
These Terms and Conditions are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the jurisdiction of the courts of Dubai, UAE.

**12. Contact**
For any questions regarding these Terms, please contact us at the details provided in the Contact section of this website.

---

### Section 12 — Footer

**Layout:** 4-column grid

**Column 1 — Brand:**
- Company Name: NI For Office Equipment Co. LLC
- Tagline: *Your Trusted Office & Security Solutions Partner in Dubai*
- Social Icons: Instagram | Facebook | WhatsApp

**Column 2 — Quick Links:**
- Home
- Services
- Products
- About Us
- Contact Us

**Column 3 — Our Services:**
- CCTV Camera Systems
- Door Access Control
- Digital Attendance Systems
- Printers & Equipment
- Toner & Ink Supply
- Stationery Supplies
- Installation & Maintenance

**Column 4 — Contact:**
- 📍 Dubai, UAE
- 📞 *(Phone number)*
- 📧 *(Email address)*
- 🕐 Sun–Thu: 9AM – 6PM

**Bottom Bar:**
`© 2025 NI For Office Equipment Co. LLC. All Rights Reserved. | Terms & Conditions | Privacy Policy`

---

## 🛠️ Tech Stack

```
Framework:     Next.js 14+ (App Router) with TypeScript
Styling:       Tailwind CSS v3
Smooth Scroll: Lenis (@studio-freight/lenis)
Animations:    GSAP + ScrollTrigger + SplitText
3D:            Three.js via @react-three/fiber + @react-three/drei
Fonts:         Google Fonts (Satoshi / Plus Jakarta Sans / DM Sans)
Icons:         Lucide React or Heroicons
Images:        Next.js <Image> with Unsplash URLs (real photography)
Forms:         React Hook Form + Zod validation
```

---

## 📱 Responsive Breakpoints

```
Mobile:  < 768px  — single column, reduced animation complexity
Tablet:  768–1024px — 2-column grid, simplified 3D
Desktop: > 1024px — full layout, all animations, 3D active
```

---

## 🎬 Advanced Animation Effects Summary

| Effect | Library | Trigger |
|--------|---------|---------|
| Smooth scroll | Lenis | Global |
| Hero text split reveal | GSAP SplitText | Page load |
| Section fade+slide | GSAP ScrollTrigger | Scroll |
| Parallax backgrounds | GSAP scrub | Scroll |
| 3D object float + mouse | Three.js | Mouse move |
| 3D scroll out | GSAP + ScrollTrigger | Scroll |
| Counter count-up | GSAP | Scroll into view |
| Card hover lift + glow | CSS + Tailwind | Hover |
| Testimonial auto-slide | GSAP or CSS | Auto |
| SVG line draw (process) | GSAP DrawSVG | Scroll |
| Navbar blur on scroll | CSS + JS | Scroll |
| Button micro-interactions | CSS transitions | Hover/Click |
| Section pin storytelling | GSAP ScrollTrigger pin | Scroll |
| Image reveal (clip-path) | GSAP | Scroll |

---

## ✅ Final Developer Checklist

- [ ] White theme applied throughout (no dark backgrounds except optional 1 section)
- [ ] Lenis initialized and connected to GSAP ticker
- [ ] GSAP ScrollTrigger registered and working on every section
- [ ] 3D element in hero — mouse reactive + scroll animated
- [ ] All 7 service cards present with real Unsplash images
- [ ] Product gallery with 8 real images
- [ ] Animated counters working on scroll
- [ ] 5 testimonials in auto-sliding carousel
- [ ] How It Works 3-step section with line animation
- [ ] Contact form with validation and success state
- [ ] Terms & Conditions content included
- [ ] Footer complete with all links and social icons
- [ ] Mobile responsive — all breakpoints tested
- [ ] Google Fonts loading correctly (not system fonts)
- [ ] All Unsplash images loading (check network tab)
- [ ] No console errors
- [ ] Performance: Lighthouse score > 85
- [ ] Meta tags: title, description, og:image set

---

*Prepared for: Development Team*
*Client: NI For Office Equipment Co. LLC, Dubai, UAE*
*Document Version: 2.0 — White Theme + Full Company Content + 3D Scroll + T&C*