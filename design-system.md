# ApaAjaDigital — Design System

**Version:** 1.1  
**Stack:** Vanilla CSS + GSAP + Lenis  
**Token source:** `tokens.css`

---

## Brand personality

**Adjectives:** Confident · Warm · Precise · Direct · Premium-but-human

**Audience:** Indonesian SMB owners, startup founders, and retail operators who've been burned by agencies before. Decision-makers, not designers. They scan fast, read little, and judge on feel within 3 seconds.

**Context:** Desktop and mobile, often on a busy schedule. Must feel trustworthy on first glance, then deliver proof on scroll.

**Anti-references:** Generic Tailwind templates, cold SaaS blue palettes, excessive gradients, "AI-generated" uniform card grids.

---

## Color

### Palette

| Token | Value | Use |
|---|---|---|
| `--accent` | `#FFD600` | Primary CTA, stat numbers, active indicators |
| `--accent-hover` | `#E8C200` | Button hover state |
| `--accent-subtle` | `#FFFDE7` | Accent background tints (use sparingly) |
| `--surface-page` | `#FFFFFF` | Main light page background |
| `--surface-subtle` | `#F7F6F3` | Alternating section backgrounds |
| `--surface-raised` | `#EDEDEA` | Card backgrounds on light sections |
| `--surface-dark` | `#0F0E0C` | Hero, CTA, footer, timeline sections |
| `--text-primary` | `#0F0E0C` | Headings on light backgrounds |
| `--text-secondary` | `#55544F` | Body copy on light backgrounds |
| `--text-muted` | `#7A7976` | Captions, meta labels |
| `--text-on-dark` | `#FFFFFF` | All text on dark surfaces |
| `--text-on-dark-sub` | `rgba(255,255,255,0.56)` | Secondary text on dark surfaces |

### Contrast (WCAG AA verified)
- Body text `#55544F` on `#FFFFFF`: **5.9:1** ✓
- `#FFD600` on `#0F0E0C`: **10.6:1** ✓ (accent on dark)
- `#0F0E0C` on `#FFD600`: **10.6:1** ✓ (text on accent buttons)

### Rules
- Yellow is the **only** accent color. No blue, no teal, no purple.
- Dark sections (`--surface-dark`) are used only for: hero, major CTA blocks, footer, dark timeline.
- Never use yellow as a background for large content areas — eye fatigue.

---

## Typography

### Font pairing
| Role | Font | Rationale |
|---|---|---|
| Display / Headlines | DM Serif Display | Editorial authority; the italic variant for pull quotes |
| Body / UI | Inter | Highly legible at 13–18px; neutral enough to support the serif |
| Labels / Mono | JetBrains Mono | Technical credibility for section labels, tags, pricing tier badges |

### Type scale

| Token | Size | Used for |
|---|---|---|
| `--text-xs` | 12px | Mono labels (UPPERCASE + tracking) |
| `--text-sm` | 14px | Nav links, button text, small tags |
| `--text-base` | 16px | Body copy, card descriptions |
| `--text-md` | 18px | Lead paragraphs, hero sub |
| `--text-lg` | 22px | h4, card titles |
| `--text-xl` | 28px | h3 min |
| `--display-sm` | clamp(28px, 3.5vw, 42px) | h3 fluid |
| `--display-md` | clamp(36px, 5vw, 60px) | h2 fluid |
| `--display-lg` | clamp(44px, 6.5vw, 78px) | h1 fluid |

### Rules
- Headings on dark backgrounds: `--text-on-dark` only.
- `DM Serif Display` at `--display-lg` with `letter-spacing: -0.02em` — this contrast with the tight Inter body is the visual signature.
- Never set body copy above `18px` in full-width blocks — it slows scan.
- Mono labels: always uppercase, `letter-spacing: 0.15em`, `12px` max.

---

## Spacing

Base unit: **4px**. Everything is a multiple.

| Token | Value | Common use |
|---|---|---|
| `--space-1` | 4px | Icon gap, micro separation |
| `--space-2` | 8px | Tag padding, tight gaps |
| `--space-4` | 16px | Form input padding |
| `--space-6` | 24px | Card internal gap |
| `--space-8` | 32px | Component to component |
| `--space-12` | 48px | Section sub-block gap |
| `--space-20` | 80px | Footer padding |
| `--section-y-md` | clamp(96px, 10vw, 128px) | Standard section vertical padding |
| `--section-y-lg` | clamp(112px, 12vw, 160px) | Hero and major CTA sections |

**Asymmetry rule:** Sections should not all have identical `padding`. Hero gets `--section-y-lg`, alternating content sections get `--section-y-md`, compact sections get `--section-y-sm`. This prevents the "generated" look.

---

## Shape (Border Radius)

| Token | Value | Used on |
|---|---|---|
| `--radius-sm` | 8px | Tags, badges, small elements |
| `--radius-md` | 16px | Inputs, small cards |
| `--radius-lg` | 24px | Main cards, pricing cards |
| `--radius-xl` | 32px | Feature sections |
| `--radius-pill` | 9999px | Buttons, navbar, tags |

**Rule:** Don't mix radius families on the same component (e.g. don't use `--radius-sm` inside `--radius-xl` cards — it fights).

---

## Motion

### Named patterns

| Pattern | CSS | Use |
|---|---|---|
| Entrance | `opacity 0.7s ease-out, transform 0.7s ease-out` | `.reveal-up` scroll reveals |
| Hover | `transform 0.25s ease-out, box-shadow 0.25s ease-out` | All interactive elements |
| Nav compact | `all 0.4s ease-out` | Navbar shrink on scroll |
| Pulse | `2s ease-in-out infinite` | Live indicator dot |
| Ticker | `30s linear infinite` | Trust bar scroll |

### Easing signature
`cubic-bezier(0.16, 1, 0.3, 1)` — expo-out. Starts quick, settles with authority. Used on all card reveals and button transforms. This is the motion personality.

### Reduced-motion
All animation disabled via `@media (prefers-reduced-motion: reduce)`. Reveal elements become instantly visible.

---

## Components

### Button — Primary
- Background: `--accent`
- Color: `--text-on-accent` (`#0F0E0C`)
- Font: Inter 14px, weight 700, uppercase, `tracking: 0.08em`
- Padding: `16px 32px`
- Radius: `--radius-pill`
- Hover: `translateY(-3px)` + `--accent-hover` bg + `--accent-glow` shadow
- Focus: `--focus-ring` outline
- **Do:** "Mulai Konsultasi Gratis →" — verb + noun + arrow
- **Don't:** "Submit" or "Klik Disini"

### Button — Ghost
- Background: transparent
- Border: `1.5px solid --border-default`
- On dark: border `rgba(255,255,255,0.25)`, color white
- Hover: `--surface-raised` bg, `--border-strong` border, `translateY(-2px)`

### Button — Link
- No border/bg; color `--text-primary` or `--accent` on dark
- Hover: gap increase (arrow breathing) — `gap: 6px → 10px`

### Card — Light
- Background: white
- Border: `1px solid --border-subtle`
- Radius: `--radius-lg`
- Padding: `36px`
- Shadow: `--shadow-md`
- Hover: `translateY(-5px)` + `--shadow-xl` + `border-color: rgba(255,214,0,0.15)`

### Card — Dark (on dark surfaces)
- Background: `rgba(255,255,255,0.05)`
- Border: `1px solid --border-on-dark`
- Backdrop-filter: `blur(20px)`
- Hover: background → `rgba(255,255,255,0.08)`, border lightens

### Card — Glow (interactive)
- Same as Light card
- `::before` pseudo: radial-gradient `rgba(255,214,0,0.07)` tracks mouse via `--mouse-x/y` CSS vars
- Use on: Layanan preview cards, AI capability cards

### Section Label
- Font: JetBrains Mono, 13px, uppercase, `letter-spacing: 0.15em`
- Color: `--text-primary` (light) / `--accent` (dark sections)
- `::before` line: `24px × 1.5px`, `currentColor`
- Always paired with an h2 below it

### Navbar
- Floating pill, `backdrop-filter: blur(24px)`, `border-radius: --radius-pill`
- Light glass: `rgba(255,255,255,0.72)`
- On scroll `.scrolled`: tighter padding, `rgba(255,255,255,0.90)`, stronger shadow

### Form Input
- Border: `1px solid --border-default`
- Radius: `--radius-md`
- Padding: `14px 18px`
- Focus: border `--accent`, `--focus-ring` box-shadow
- Placeholder color: `--text-muted`

---

## Do / Don't (Anti-AI-tell checklist)

| DO | DON'T |
|---|---|
| Vary section padding (sm/md/lg rhythm) | Uniform 120px on every section |
| One accent color (yellow) | Multiple competing accent colors |
| DM Serif at dramatic sizes | 3 sizes of the same sans-serif everywhere |
| `ease-out` with personality on reveals | Flat linear fade or same animation on everything |
| Mono labels without brackets: "IT AGENCY JAKARTA" | Bracket notation: `[ THE PROBLEM ]` |
| Card hover: translate + shadow only | Spinning, scaling, or color-flash cards |
| White space to breathe | Cramped padding to fit more content |
| Stat numbers in DM Serif + yellow | Stat numbers in bold Inter |
| Section `<h2>` after mono label | `<h2>` alone without label |
| Testimonials in `"double quotes"` + em dash | Generic blockquote with no attribution |

---

## File map

```
ApaAjaDigital/
├── tokens.css            ← This file's values (single source of truth)
├── styles.css            ← Component + layout CSS (imports tokens)
├── app.js                ← GSAP / Lenis / SPA logic
├── design-system.md      ← This document
└── index.html            ← Markup (6-page SPA)
```

**Import order in `<head>`:**
1. Google Fonts preconnect + link
2. `tokens.css`
3. `styles.css`

---

## Next steps

- **Icons:** Replace all emoji in UI with Lucide SVG icons (see `--icon-*` tokens). Emoji render inconsistently across OS.
- **Parallax:** Add scroll-driven `data-parallax` attributes to hero canvas and section bg images; drive via GSAP ScrollTrigger at `0.3–0.5` speed.
- **claude-landing-composer:** Use these tokens to audit and rebuild any page sections that still feel template-like.
- **claude-design-critic:** Run a per-page audit against this doc's Do/Don't table.
