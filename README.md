# WAVECRAFT — Audio Podcast Gear Learning & Skills Academy
**Build Better Sound. Create With Confidence.**

A production-quality HTML5/CSS3/Vanilla JS website template that uniquely fuses **professional podcast audio hardware ecommerce** with a **creator skills academy**.

---

## 🎧 Brand & Design Direction

* **Brand:** WAVECRAFT
* **Tagline:** *Build Better Sound. Create With Confidence.*
* **Visual Identity:** High-End Audio Laboratory + Modern Creator Studio + Premium Ecommerce Showroom.
* **Palette:** Dark Charcoal (`#0b0e14`), Graphite (`#161b26`), Warm Off-White (`#f2f5f9`), Cool Silver, Muted Blue, and Restrained Electric Cyan Accent (`#00e5ff`).
* **Typography:**
  * **Primary:** [Manrope](https://fonts.google.com/specimen/Manrope) (Headlines & Body)
  * **Technical:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (Specs, Badges, Metrics)
  * **Editorial:** [DM Sans](https://fonts.google.com/specimen/DM+Sans) (Guides & Descriptions)

---

## 🚀 Key Functional Systems

### 1. 360° Interactive Product Viewer (`viewer-360.js`)
* **3D Perspective Interaction:** Smooth horizontal drag, touch swipe, and rotational momentum.
* **Dynamic Technical Hotspots:** Pins to specific microphone features (3-Pin Balanced XLR Output, USB-C Port, Rotary Gain/High-Pass Filter, Zero-Latency Headphone Monitoring).
* **Control Bar:** Rotate Left/Right, Zoom In/Out, Reset View, Auto-Spin Toggle, and Fullscreen.
* **Accessible Keyboard Controls:** Left/Right arrow keys rotate, `+`/`-` zoom, `Space` toggles spin, `Esc` resets.

### 2. Audio Spec Comparison Engine (`compare.js`)
* Side-by-side empirical comparison for 2 to 4 devices.
* **Difference Highlighting:** Interactive switch highlights rows where specs diverge (polar pattern, sensitivity, max SPL, sample rate, etc.).
* **State Persistence:** Preserves selected devices in `localStorage`.
* **Add/Remove Controls:** Add gear from dropdown or remove in real time.
* **Responsive Containment:** Self-contained horizontal scroll container guarantees zero page overflow on mobile.

### 3. Native Web Audio Acoustic Test Bench (`main.js`)
* Built with native browser `AudioContext` (no external audio files required).
* **1 kHz Reference Tone:** Calibrated sine wave for setting DAW levels to -18 dBFS.
* **Pink Noise Rumble Simulator:** Synthesizes low-frequency room rumble.
* **80 Hz High-Pass Filter Toggle:** Instant A/B demonstration of acoustic rumble reduction without vocal loss.

### 4. Interactive Warranty Registration & Authenticity Verification (`warranty.js`)
* Form validation with serial number format verification (`WCX1-XXXX-XXXX`).
* Instant generation of official digital authenticity certificate.
* Includes printable view via `@media print`.

### 5. Academy Hub & Course Player Demo (`academy.js`)
* Live client-side course filtering by skill level (Beginner, Intermediate, Advanced) and topic (Podcasting, Recording, Editing, Mixing, Noise Control, Streaming).
* Step-by-step curriculum syllabus (01 to 08/10 modules).
* Demo enrollment modal with instant student access key generation.

### 6. Light Mode + Dark Mode Theme Engine (`theme.js`)
* Dark mode default for audio laboratory feel.
* System preference detection (`prefers-color-scheme`).
* `localStorage` persistence with global toggle button and reactive events.

### 7. Slide-Out Studio Cart Drawer (`main.js`)
* Cart item storage, real-time quantity increments/decrements, subtotal calculation, and badge updates.

---

## 📁 File Structure

```text
/
├── index.html                     # Homepage (Hero, 360 Preview, Comparison, Academy Spotlight)
├── shop.html                      # Hardware Catalog (Multi-faceted filters & real-time search)
├── product-details.html           # Flagship Showroom (Gallery/360 toggle, Tech specs, Academy connect)
├── compare.html                   # Dedicated Technical Comparison Matrix
├── academy.html                   # Learning Hub (Course filtering & catalog)
├── course-details.html            # Course Syllabus, Audio preview, & Enrollment modal
├── guides.html                    # Knowledge Hub (Microphone selection, USB vs XLR, Glossary)
├── noise-cancellation-guide.html  # Acoustic Science deep dive with Web Audio rumble player
├── warranty.html                  # Instant Warranty Registration & Digital Certificate
├── about.html                     # Brand Story, Engineering Mission, & Core Pillars
├── contact.html                   # Support Form & Acoustic Lab details
├── login.html                     # Clean Account Login
├── signup.html                    # Creator Account Registration
├── forgot-password.html           # Password Recovery flow
├── 404.html                       # Audio-themed "Signal Lost / 404 Frequency Not Found"
├── coming-soon.html               # Launch preview with live countdown timer
│
├── assets/
│   ├── css/
│   │   ├── theme.css              # Dark & Light mode color schemes and CSS custom properties
│   │   ├── style.css              # Master styling, components, navbar, 360 viewer, comparison
│   │   └── responsive.css         # Zero-overflow media queries (320px to 2560px+)
│   │
│   ├── js/
│   │   ├── theme.js               # Theme toggle and persistence
│   │   ├── products.js            # Product catalog data and card renderer
│   │   ├── compare.js             # Comparison matrix and difference highlighter
│   │   ├── viewer-360.js          # Interactive 360 product viewer
│   │   ├── academy.js             # Academy courses data and filtering
│   │   ├── warranty.js            # Warranty registration & certificate generation
│   │   └── main.js                # Navbar, mobile offcanvas, cart drawer, Web Audio API, GSAP
│   │
│   └── images/
│       ├── products/              # Flagship product imagery (Mic X1, C3, HD-7, Core Stream, etc.)
│       ├── hero/                  # Studio desk photography
│       ├── academy/               # Course session photography
│       └── guides/                # Acoustic research laboratory photography
│
└── README.md                      # Documentation
```

---

## 🛠️ Testing & Browser Verification

* Open any page in modern browsers (Chrome, Edge, Firefox, Safari).
* Mobile viewports tested: 320px, 360px, 375px, 390px, 414px, 425px, 768px, 1024px, 1440px+.
* Zero horizontal overflow on all screen sizes.
* Full keyboard accessibility on 360 viewer and navigation drawers.
