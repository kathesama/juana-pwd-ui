# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/juanaia/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** JuanaIA
**Updated:** 2026-04-14
**Category:** AI-Native Personal Assistant PWA
**Style:** AI-Native UI + Glassmorphism (Dark Mode)

---

## Global Rules

### Color Palette

All colors are defined in Tailwind as the `juana` palette. Always use Tailwind tokens — never raw hex in components.

| Role | Tailwind Token | Hex | Usage |
|------|---------------|-----|-------|
| Primary | `juana.purple.500` | `#7C3AED` | Interactive elements, links, focus rings |
| Primary Dark | `juana.purple.700` | `#5B21B6` | Hover states, pressed buttons |
| Primary Light | `juana.purple.300` | `#C4B5FD` | Subtle highlights, badges |
| Accent / CTA | `juana.gold.400` | `#FBBF24` | Primary CTAs, key actions, highlights |
| Accent Hover | `juana.gold.500` | `#F59E0B` | CTA hover states |
| Background | `juana.bg.950` | `#09090B` | Page background (OLED dark) |
| Background Alt | `juana.bg.900` | `#111113` | Secondary backgrounds |
| Surface | `juana.surface.800` | `#1C1C1F` | Cards, panels, sidebars |
| Surface Alt | `juana.surface.700` | `#27272A` | Elevated surfaces, modals |
| Border | `juana.surface.600` | `#3F3F46` | Dividers, input borders |
| Text Primary | `white` | `#FFFFFF` | Headings, primary content |
| Text Secondary | `zinc.400` | `#A1A1AA` | Secondary text, labels, placeholders |
| Text Muted | `zinc.600` | `#52525B` | Disabled states, hints |
| Error | `red.500` | `#EF4444` | Errors, destructive actions |
| Success | `emerald.500` | `#10B981` | Success states, confirmations |
| Warning | `amber.500` | `#F59E0B` | Warnings, cautions |

**Color Notes:**
- Background is OLED dark — never use pure white anywhere
- Purple is the brand primary — used for interactive states
- Gold is the accent — used sparingly for CTAs and key highlights
- All surfaces use `backdrop-blur` for glassmorphism depth

### CSS Variables (globals.css)

```css
:root {
  --color-bg: #09090B;
  --color-bg-alt: #111113;
  --color-surface: #1C1C1F;
  --color-surface-alt: #27272A;
  --color-border: #3F3F46;
  --color-primary: #7C3AED;
  --color-primary-hover: #5B21B6;
  --color-accent: #FBBF24;
  --color-accent-hover: #F59E0B;
  --color-text: #FFFFFF;
  --color-text-secondary: #A1A1AA;
  --color-text-muted: #52525B;

  /* Glassmorphism */
  --glass-bg: rgba(28, 28, 31, 0.7);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-blur: blur(12px);

  /* Gradients */
  --gradient-primary: radial-gradient(ellipse at top, rgba(124, 58, 237, 0.15) 0%, transparent 60%);
  --gradient-accent: radial-gradient(ellipse at bottom right, rgba(251, 191, 36, 0.08) 0%, transparent 50%);
}
```

---

### Typography

- **Heading Font:** `Inter` — clean, modern, highly legible at all sizes
- **Body Font:** `Inter` — single font family, varied weights
- **Mono Font:** `JetBrains Mono` — for code blocks, terminal output, IDs
- **Mood:** Technical, precise, intelligent — appropriate for an AI assistant interface
- **NOT:** Caveat, Quicksand, or any handwritten/casual font (generated incorrectly)

**Google Fonts:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

**Type Scale:**

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-xs` | 12px | 400 | Timestamps, metadata, captions |
| `text-sm` | 14px | 400/500 | Labels, secondary content, inputs |
| `text-base` | 16px | 400 | Body text, chat messages |
| `text-lg` | 18px | 500/600 | Section headers, feature titles |
| `text-xl` | 20px | 600 | Page titles |
| `text-2xl` | 24px | 700 | Hero headings |
| `text-3xl` | 30px | 700 | Display headings |

---

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px / 0.25rem` | Tight gaps, icon spacing |
| `--space-sm` | `8px / 0.5rem` | Inline spacing, badge padding |
| `--space-md` | `16px / 1rem` | Standard padding, card gaps |
| `--space-lg` | `24px / 1.5rem` | Section padding, panel gaps |
| `--space-xl` | `32px / 2rem` | Large component gaps |
| `--space-2xl` | `48px / 3rem` | Section margins |
| `--space-3xl` | `64px / 4rem` | Page-level padding |

---

### Shadow Depths

```css
--shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md:  0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg:  0 10px 15px rgba(0, 0, 0, 0.5);
--shadow-xl:  0 20px 25px rgba(0, 0, 0, 0.6);
--shadow-glow-purple: 0 0 20px rgba(124, 58, 237, 0.3);
--shadow-glow-gold:   0 0 20px rgba(251, 191, 36, 0.2);
```

---

## Component Specs

### Buttons

```css
/* Primary CTA — Gold accent */
.btn-primary {
  background: #FBBF24;
  color: #09090B;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
}
.btn-primary:hover {
  background: #F59E0B;
  box-shadow: var(--shadow-glow-gold);
}

/* Secondary — Ghost with purple border */
.btn-secondary {
  background: transparent;
  color: #C4B5FD;
  border: 1px solid #7C3AED;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
}
.btn-secondary:hover {
  background: rgba(124, 58, 237, 0.1);
  border-color: #C4B5FD;
}

/* Ghost — minimal */
.btn-ghost {
  background: transparent;
  color: #A1A1AA;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 400;
  transition: all 150ms ease;
  cursor: pointer;
}
.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #FFFFFF;
}
```

---

### Cards (Glassmorphism)

```css
.card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-radius: 12px;
  padding: 20px;
  transition: border-color 200ms ease, box-shadow 200ms ease;
}
.card:hover {
  border-color: rgba(124, 58, 237, 0.3);
  box-shadow: var(--shadow-glow-purple);
}
```

---

### Chat Message Bubbles

```css
/* Juana (AI) message */
.message-ai {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: var(--glass-blur);
  border-radius: 4px 16px 16px 16px;
  padding: 12px 16px;
  color: #FFFFFF;
  max-width: 80%;
  align-self: flex-start;
}

/* User message */
.message-user {
  background: rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(124, 58, 237, 0.25);
  border-radius: 16px 4px 16px 16px;
  padding: 12px 16px;
  color: #FFFFFF;
  max-width: 80%;
  align-self: flex-end;
}
```

---

### Inputs

```css
.input {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  color: #FFFFFF;
  transition: border-color 200ms ease, box-shadow 200ms ease;
}
.input::placeholder {
  color: var(--color-text-muted);
}
.input:focus {
  border-color: #7C3AED;
  outline: none;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
}
```

---

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
}
.modal {
  background: var(--color-surface);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 28px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

### Navigation (Shell Sidebar)

```css
.sidebar {
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  width: 240px;
}
.nav-item {
  padding: 8px 12px;
  border-radius: 6px;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 500;
  transition: all 150ms ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}
.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #FFFFFF;
}
.nav-item.active {
  background: rgba(124, 58, 237, 0.15);
  color: #C4B5FD;
  border-left: 2px solid #7C3AED;
}
```

---

## Style Guidelines

**Style:** AI-Native UI + Glassmorphism

**App Type:** Conversational AI assistant PWA — NOT a landing page, NOT an e-commerce site.

**Layout Pattern:** Dashboard / Chat Application
- Persistent sidebar navigation (desktop)
- Bottom tab bar (mobile PWA)
- Main content area: full height, scrollable
- Chat interface: message list + sticky input bar at bottom
- No horizontal scrolling anywhere

**Key Effects:**
- `backdrop-blur(12px)` on all cards and overlays
- Subtle radial gradient on page background (purple top-left, gold bottom-right)
- Smooth transitions 150–200ms on all interactive states
- `prefers-reduced-motion` must be respected — disable all transitions when set

**Responsive breakpoints:**
- Mobile: 375px (PWA home screen install)
- Tablet: 768px
- Desktop: 1024px
- Wide: 1440px

---

## Anti-Patterns (Do NOT Use)

- ❌ **Light mode** — Juana is dark mode only
- ❌ **White or light backgrounds** — everything is dark
- ❌ **Caveat, Quicksand, or handwritten fonts** — use Inter only
- ❌ **Horizontal scroll layouts** — this is an app, not a landing page
- ❌ **Emojis as icons** — use Lucide React icons only
- ❌ **Hardcoded hex colors** — always use Tailwind `juana.*` tokens or CSS vars
- ❌ **`any` in TypeScript** — strict typing always
- ❌ **Neon glow / glitch effects** — Juana is professional, not cyberpunk
- ❌ **Missing `cursor-pointer`** — all clickable elements must have it
- ❌ **Layout-shifting hovers** — avoid scale transforms that shift layout
- ❌ **Low contrast text** — maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — always use transitions (150–200ms)
- ❌ **Invisible focus states** — focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] Dark mode only — no light backgrounds
- [ ] All colors use Tailwind `juana.*` tokens or CSS variables
- [ ] Font: Inter for all text, JetBrains Mono for code/mono
- [ ] No emojis as icons — Lucide React only
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with transitions (150–200ms)
- [ ] Text contrast 4.5:1 minimum (white/zinc-400 on dark surfaces ✅)
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on any breakpoint
- [ ] Glassmorphism: `backdrop-blur` only on surfaces with content behind
- [ ] TypeScript strict — no `any`
- [ ] WCAG AA accessibility