# CLAUDE.md — ApaAjaDigital Company Profile Redesign

## OBJECTIVE
Redesign `index.html` menjadi website company profile SPA (Single Page Application) yang **profesional, premium, dan clean** — tidak terlihat seperti buatan AI. Website harus terasa seperti dibuat oleh studio desain premium Indonesia.

---

## PROJECT STRUCTURE
```
ApaAjaDigital/
├── index.html          ← Main SPA file (REWRITE TOTAL)
├── styles.css          ← Custom vanilla CSS design system (REWRITE TOTAL)
├── app.js              ← JavaScript interactions & SPA routing (REWRITE TOTAL)
├── Logo-Apa-Aja-Digital.png  ← Logo resmi (GUNAKAN INI)
├── ApaAjaDigital_Copywriting.md  ← Sumber konten (IKUTI PERSIS)
└── CLAUDE.md           ← File ini
```

---

## RULES — WAJIB DIIKUTI

### Absolute Rules
1. **TIDAK BOLEH menggunakan TailwindCSS** — hapus semua CDN tailwind dan utility classes
2. **GUNAKAN Vanilla CSS murni** — semua styling via `styles.css` dengan semantic class names
3. **SEMUA KONTEN dari `ApaAjaDigital_Copywriting.md`** — jangan mengarang teks sendiri
4. **SEMUA LABEL & BADGE dalam Bahasa Indonesia** — tidak ada label English seperti `[ THE PROBLEM ]`, `[ ENTERPRISE CLASS ]` dll
5. **JANGAN masukkan section Tim/Team** pada halaman Tentang — skip bagian tersebut
6. **GUNAKAN logo `Logo-Apa-Aja-Digital.png`** sebagai logo utama di navbar dan footer
7. **Font stack:** DM Serif Display (display/headlines) + Inter (body/UI) + JetBrains Mono (mono/tech labels)
8. **WhatsApp number yang benar:** `6282180598494`
9. **Calendly:** belum ada — gunakan tombol CTA yang mengarah ke WhatsApp sebagai pengganti sementara
10. **Rate Card PDF:** kosongkan link, beri label "Segera Tersedia"

### Design Direction
- **TEMA TERANG / CLEAN LOOK** — bukan dark theme
- Terinspirasi oleh **Cuberto, Locomotive, Obys Agency** tapi dikalibrasi untuk audience Indonesia
- **Hangat, terpercaya, tidak intimidating**
- Warna dominan: putih/light background dengan aksen biru dan kuning (sesuai logo)

---

## DESIGN SYSTEM

### Color Palette — LIGHT THEME
```css
:root {
  /* Base */
  --bg-primary: #FFFFFF;           /* Main background — pure white */
  --bg-secondary: #F7F8FA;         /* Section alternating background */
  --bg-tertiary: #F0F2F5;          /* Card backgrounds */
  --bg-dark: #1A1A2E;              /* Dark sections (hero, CTA, footer) */
  --bg-dark-surface: #16213E;      /* Dark card surfaces */

  /* Brand Colors (dari logo) */
  --brand-primary: #2D3436;        /* Near-black — primary text */
  --brand-blue: #4B6BFF;           /* Blue accent — trust, CTA */
  --brand-yellow: #FFD600;         /* Yellow accent — dari logo "digital" */
  --brand-lime: #C4F56A;           /* Lime — energi, highlights */

  /* Text */
  --text-primary: #1A1A2E;         /* Headings on light bg */
  --text-secondary: #4A5568;       /* Body text on light bg */
  --text-muted: #8896AB;           /* Captions, labels */
  --text-on-dark: #FFFFFF;         /* Text on dark backgrounds */
  --text-on-dark-secondary: #B0BEC5; /* Secondary text on dark bg */

  /* Borders */
  --border-light: rgba(0, 0, 0, 0.08);
  --border-medium: rgba(0, 0, 0, 0.12);
  --border-dark: rgba(255, 255, 255, 0.08);

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.08);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.1);
  --shadow-glow-blue: 0 0 30px rgba(75, 107, 255, 0.15);

  /* Typography */
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', monospace;

  /* Spacing */
  --container: 1200px;
  --nav-height: 72px;
  --section-padding: 120px;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-pill: 100px;

  /* Easing */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### Typography Scale
```
h1: DM Serif Display, clamp(40px, 6vw, 72px), line-height 1.1
h2: DM Serif Display, clamp(32px, 4.5vw, 56px), line-height 1.15
h3: DM Serif Display, clamp(24px, 3vw, 36px), line-height 1.2
h4: Inter, 18-20px, font-weight 700
body: Inter, 16-17px, line-height 1.7, font-weight 400
small: Inter, 13-14px
mono: JetBrains Mono, 11-12px, letter-spacing 1-2px, uppercase
```

### Component Patterns

#### Cards (Light)
- Background: `#FFFFFF`
- Border: `1px solid rgba(0,0,0,0.06)`
- Border-radius: 20-24px
- Padding: 32-40px
- Shadow: `var(--shadow-md)`
- Hover: translate up 4px + shadow-lg + border-color change

#### Cards (on Dark sections)
- Background: `rgba(255, 255, 255, 0.05)`
- Border: `1px solid rgba(255, 255, 255, 0.08)`
- Backdrop-filter: blur(20px)

#### Buttons — Primary
- Background: `var(--brand-blue)`
- Color: white
- Padding: 16px 32px
- Border-radius: pill (100px)
- Font: Inter, 13px, weight 700, uppercase, letter-spacing 1px
- Hover: shadow-glow-blue + slight translateY(-2px)

#### Buttons — Secondary/Ghost
- Background: transparent
- Border: 1.5px solid var(--border-medium)
- Color: var(--text-primary)
- Hover: background var(--bg-tertiary)

#### Section Labels/Badges
- Font: JetBrains Mono, 11px, uppercase, letter-spacing 3px
- Color: var(--brand-blue) on light bg, var(--brand-lime) on dark bg
- Contoh: "IT AGENCY JAKARTA · EST. 2020" (bukan bracket notation)

---

## SPA ARCHITECTURE — 6 HALAMAN

Semua halaman dalam satu `index.html`. Menggunakan `<div class="page" id="[id]">` pattern.
Default active: halaman Beranda.

### Navigation Menu Items
```
BERANDA     → onclick: nav('home')
AI SYSTEM   → onclick: nav('ai')
LAYANAN     → onclick: nav('layanan')
PORTOFOLIO  → onclick: nav('portofolio')
TENTANG     → onclick: nav('tentang')
HUBUNGI KAMI → onclick: nav('kontak')   ← styled as CTA button
```

---

## HALAMAN 1: BERANDA (id="home")

### Section 1.1 — Hero
- **Background:** Dark gradient (`--bg-dark`) — hero tetap gelap untuk kontras dramatis
- **Badge:** `IT Agency Jakarta · Est. 2020` (with pulsing green dot)
- **Headline (DM Serif Display, putih, besar):**
  ```
  Website siap kerja.
  Sistem AI custom.
  Hari ini.
  ```
- **Subheadline (Inter, light gray):**
  ```
  Dari landing page yang live dalam 1 hari, hingga sistem bisnis berbasis AI
  yang berjalan otomatis — semua by request, harga fix, tanpa biaya yang
  tiba-tiba muncul di tengah jalan.
  ```
- **CTA Buttons:**
  - Primary: "Mulai Konsultasi Gratis →" (blue, mengarah ke halaman kontak)
  - Ghost: "Lihat AI System" (border, mengarah ke halaman AI)
- **Stats bar (3 kolom):**
  - `200+` — "Bisnis yang sudah kami tangani"
  - `1 Hari` — "Garansi delivery website"
  - `50%` — "Refund jika kami telat"
- **Animasi:** Particle canvas di background, stat counter animation

### Section 1.2 — Layanan Preview (Light background)
- **Label:** "APA YANG BISA KAMI BANTU?"
- **Title (DM Serif Display):** "Solusi Digital Terbaik Untuk Skala Bisnis Anda."
- **4 Cards grid (2x2):**
  1. Landing Page — icon monitor — "Mulai Rp 1.500.000"
  2. Company Profile — icon file — "Mulai Rp 3.500.000"
  3. E-Commerce — icon cart — "Mulai Rp 8.000.000"
  4. AI System ★ — icon star (highlighted card) — "Custom quote · By request"
- **Guarantee line:** "Garansi delivery — Telat = 50% uang kembali"
- Klik card → navigasi ke halaman Layanan

### Section 1.3 — Trust Bar (ticker)
- Scrolling ticker: "UMKM JAKARTA · STARTUP SAAS · RETAIL BRAND · KORPORASI · F&B · PROPERTI"
- Second row (reverse): "DIPERCAYA OLEH BISNIS DARI BERBAGAI INDUSTRI"

### Footer (duplikat di setiap halaman)

---

## HALAMAN 2: AI SYSTEM (id="ai")

### Section 2.1 — Hero AI (Dark background)
- **Badge:** "★ Diferensiasi Utama Kami"
- **Headline:** "Sistem bisnis kamu, dijalankan AI."
- **Body:** (dari copywriting — paragraf tentang bukan template, bukan chatbot generik)
- **CTA:** "Mapping Sistem Gratis →"

### Section 2.2 — 6 Kapabilitas AI (Light background, grid 3x2)
- **Label:** "KAPABILITAS AI"
- **Title:** "6 Solusi Kecerdasan Buatan Untuk Automasi Bisnis Anda"
- 6 cards sesuai copywriting:
  1. AI Customer Service Agent — tags: WhatsApp, Web, Instagram DM
  2. AI Sales & CRM Automation — tags: CRM, Pipeline, Reporting
  3. AI Business Workflow — tags: Automation, Integration, Reporting
  4. AI Booking & Operations — tags: Booking, Reminder, Scheduling
  5. AI Analytics & Insight — tags: Dashboard, Insight, Alert
  6. Custom System — CTA link: "Ceritakan kebutuhan kamu →"

### Section 2.3 — Use Cases Per Industri (Alternating bg)
- **Label:** "USE CASES"
- **Title:** "Sistem AI kami, diimplementasi lintas industri."
- 4 cards: F&B/Resto, Properti, Klinik/Kesehatan, E-Commerce/UMKM
- Konten sesuai copywriting

---

## HALAMAN 3: LAYANAN & HARGA (id="layanan")

### Section 3.1 — Hero Harga
- **Label:** "PAKET & HARGA"
- **Headline:** "Harga fix. Tidak ada kejutan."
- **Subheadline:** (dari copywriting)

### Section 3.2 — 3 Paket Utama (Cards, light bg)
Pricing cards dengan detail lengkap dari copywriting:
1. **Landing Page** — Rp 1.500.000 — delivery 1 hari — 8 fitur
2. **Company Profile** — Rp 3.500.000 — delivery 7-14 hari — 8 fitur — BADGE "Paling Populer"
3. **E-Commerce** — Rp 8.000.000 — delivery 3-6 minggu — 8 fitur

### Section 3.3 — AI System Package (Dark section)
- **Badge:** "★ Paket Unggulan"
- **Headline:** "AI / Agentic System"
- **Body:** (dari copywriting)
- **Tier table:** MVP (Rp 30jt), Business (Rp 80jt), Scalable (Rp 200jt), High Performance Web (Custom), Mobile App (Custom)
- **CTA:** "Request Proposal Gratis →"

### Section 3.4 — Maintenance & Support (Light bg)
- **Header:** "Website yang live bukan akhir dari pekerjaan. Ini awalnya."
- 3 cards: Basic (Rp 2jt/bln), Growth (Rp 5jt/bln), Performance (Rp 10jt/bln)
- Detail fitur sesuai copywriting

### Section 3.5 — Garansi Callout (Blue gradient section)
- Visual callout: "Website Pasti Jadi Dalam 1 Hari — Garansi 50% Uang Kembali"
- 3 bullet alasan garansi

---

## HALAMAN 4: PORTOFOLIO (id="portofolio")

### Section 4.1 — Hero Portofolio
- **Label:** "PORTOFOLIO"
- **Headline:** "200+ website. Semua live tepat waktu."
- **Subheadline:** (dari copywriting)

### Section 4.2 — Case Studies (3 cards, light bg)
Ambil dari copywriting:
1. **F&B · Jakarta Selatan** — Landing page + WA order — "Konversi WhatsApp meningkat 3x"
2. **B2B SaaS · Jakarta** — Company profile 8 halaman — "Nol perubahan harga"
3. **Retail · Nationwide** — E-commerce platform — "Delivery sesuai timeline"

Setiap card memiliki:
- Tag industri
- Klien, Tantangan, Yang kami bangun, Hasilnya
- Quote testimonial + nama

### Section 4.3 — Testimonials highlight
- 3 testimonial cards (ambil dari case studies)

---

## HALAMAN 5: TENTANG (id="tentang")

> ⚠️ JANGAN masukkan bagian Tim/Team

### Section 5.1 — Hero Tentang
- **Label:** "TENTANG KAMI"
- **Headline:** "IT Agency yang tidak main-main."
- **Lead paragraph:** (dari copywriting — tentang frustrasi dan origin story)

### Section 5.2 — 4 Prinsip Kami (Cards atau timeline)
1. "Harga fix bukan slogan."
2. "Timeline adalah janji, bukan estimasi."
3. "Transparansi bukan fitur tambahan."
4. "Yang kami banggakan adalah hasil klien kami, bukan proses kami."
Detail sesuai copywriting.

### Section 5.3 — Nilai Kami (Icon grid, 2x2)
1. Speed — (deskripsi dari copywriting)
2. Transparansi — (deskripsi dari copywriting)
3. AI-First — (deskripsi dari copywriting)
4. Hasil Terukur — (deskripsi dari copywriting)

### Section 5.4 — Proses Kerja Timeline (5 Steps)
1. Konsultasi
2. Kontrak
3. Wireframe
4. Build
5. Launch
Visualisasi: vertical timeline dengan dots & progress line

---

## HALAMAN 6: KONTAK (id="kontak")

### Section 6.1 — Hero Kontak
- **Label:** "HUBUNGI KAMI"
- **Headline:** "Mulai hari ini. Bukan besok."
- **Lead:** (dari copywriting — tentang konsultasi 30 menit gratis)

### Section 6.2 — Metode Kontak (4 cards, grid 2x2)
1. **WhatsApp** — "Respons dalam 15 menit" — link: `https://wa.me/6282180598494`
2. **Booking Konsultasi** — "Pilih slot 30 menit" — CTA mengarah ke WhatsApp (sementara)
3. **Email** — `hello@apaajadigital.com`
4. **Kantor** — "Jakarta Selatan, Indonesia · Kunjungan dengan perjanjian"

### Section 6.3 — Contact Form
- **Header:** "Ceritakan kebutuhan kamu."
- Fields:
  - Nama / Perusahaan (text)
  - Nomor WhatsApp (tel)
  - Layanan yang dibutuhkan (dropdown: Landing Page, Company Profile, E-Commerce, AI System, High Performance Web/App, Maintenance & Support, Belum tahu — butuh konsultasi)
  - Ceritakan lebih lanjut (textarea, opsional)
- **CTA:** "Kirim & Mulai Konsultasi →"
- Form action: dapat berupa `https://wa.me/6282180598494` redirect sementara

### Section 6.4 — Garansi Reminder
- "Website live dalam 1 hari. Atau 50% uang kembali."

---

## GLOBAL ELEMENTS

### Navigation Bar
- **Desktop:** Floating pill navbar, glassmorphism effect
- **Logo:** `Logo-Apa-Aja-Digital.png` (width ~140px)
- **Links:** 5 menu items + 1 CTA button
- **Scroll behavior:** Compact on scroll (reduce padding, increase opacity)
- **Mobile:** Hamburger toggle → slide-in drawer from right

### Footer (setiap halaman)
- Logo + tagline: "Website siap kerja. Sistem AI custom. Hari ini."
- Kolom Layanan: links ke Landing Page, Company Profile, E-Commerce, AI System, Maintenance
- Kolom Perusahaan: links ke Portofolio, Tentang Kami, Harga, Garansi
- Kolom Kontak: email, lokasi, social icons (WhatsApp, Instagram, LinkedIn)
- Bottom bar: "© 2026 ApaAjaDigital.com. All rights reserved."
- Footer tagline: "Website yang bekerja. Sistem yang berpikir."

---

## JAVASCRIPT FEATURES (app.js)

### Libraries (CDN)
```html
<!-- GSAP -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/ScrollTrigger.min.js"></script>
<!-- Lenis Smooth Scroll -->
<script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"></script>
<!-- Anime.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
```

### Features to Implement
1. **Lenis smooth scroll** — buttery smooth scrolling
2. **SPA page navigation** — `nav(pageId)` function, toggle `.active` class, scroll to top
3. ~~Custom cursor~~ — **DIHAPUS** (tidak digunakan)
4. **Scroll reveal** — `.reveal-up` elements fade+slide up on scroll via GSAP ScrollTrigger
5. **Stat counter** — animate numbers (200+, 1, 50%) on scroll into view
6. **Price counter** — Anime.js rollover for pricing numbers (1.500.000, etc)
7. **Particle canvas** — floating particles on hero section background
8. ~~Magnetic buttons~~ — **DIHAPUS** (buttons tetap diam, tidak bergerak)
9. **Navbar scroll** — shrink on scroll, increase backdrop opacity
10. **Glow cards** — `.glow-card` mouse-tracking radial gradient glow
11. **Mobile menu** — `toggleMobileMenu()`, hamburger morph, drawer slide
12. **Timeline progress** — vertical line draw on scroll (halaman Tentang)
13. **Active nav highlighting** — current page nav link gets active style

---

## VISUAL QUALITY CHECKLIST

### Agar Tidak Terlihat AI-Generated:
- [ ] **Tidak ada bracket notation** `[ LIKE THIS ]` — semua label natural bahasa Indonesia
- [ ] **Spacing tidak seragam** — variasi section padding (100-160px) agar tidak monoton
- [ ] **Typographic contrast kuat** — DM Serif (large, dramatic headlines) vs Inter (clean body)
- [ ] **Warna accent digunakan sparingly** — biru hanya untuk CTA & highlights, kuning hanya untuk detail kecil
- [ ] **Whitespace generous** — biarkan konten bernafas, jangan cramped
- [ ] **Card styles bervariasi** — tidak semua card identik, ada variasi padding/radius/border
- [ ] **Micro-interactions subtle** — hover tidak terlalu berlebihan
- [ ] **Light sections dominant** — dark hanya untuk hero & CTA sections
- [ ] **Foto/visual real** — gunakan Logo-Apa-Aja-Digital.png, bukan generic SVG

### Performance:
- [ ] Tidak ada TailwindCSS CDN (hemat ~300KB)
- [ ] Font loading optimized (preconnect + display=swap)
- [ ] Minimal external dependencies
- [ ] Semantic HTML5 tags
- [ ] Proper heading hierarchy (single h1 per page)

---

## EXECUTION ORDER

1. **styles.css** — Bangun SELURUH design system terlebih dahulu (CSS custom properties, typography, components, layouts, animations, responsive)
2. **index.html** — Tulis markup lengkap semua 6 halaman dengan semantic CSS class names. Tidak boleh ada Tailwind class.
3. **app.js** — Implementasi semua JavaScript interactions
4. **Testing** — Buka di browser, pastikan semua halaman navigasi & animasi berfungsi

---

## IMPORTANT REMINDERS

- Baca `ApaAjaDigital_Copywriting.md` dan gunakan PERSIS untuk semua teks
- Logo file: `Logo-Apa-Aja-Digital.png` — gunakan di navbar & footer
- WhatsApp: `https://wa.me/6282180598494`
- Email: `hello@apaajadigital.com`
- TIDAK ADA section Tim pada halaman Tentang
- Rate Card: link kosong dengan label "Segera Tersedia"
- Calendly: belum ada, redirect ke WhatsApp sementara
- TEMA TERANG/CLEAN dengan dark hero sections saja
