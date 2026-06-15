# 🔴 RescueNet — Disaster Response & Emergency Assistance Portal

> **Awwwards-level React SPA. Dark mode exclusive. Volcanic Crisis visual language.**
> Molten heat. Burnt amber. Ash white. No blue. No purple. No cyan. Ever.

---

## Overview

RescueNet is a production-ready, single-page application built for real-time disaster response coordination. It features a live 3D Earth globe, AI-powered emergency intelligence, real-time stat ticking, multi-step incident reporting, shelter locators, and disaster simulation — all rendered in an ember-and-ash visual system with buttery-smooth WebGL and scroll animations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 (arbitrary values) |
| 3D / WebGL | React Three Fiber 8.x + Three.js r165 + `@react-three/drei` 9.x + `@react-three/postprocessing` 2.x |
| Animation | GSAP 3.12 (ScrollTrigger + ticker bridge) — **all animation lives here** |
| Smooth Scroll | Lenis 1.x (`lenis` npm package) |
| State | Zustand 4.x |
| Charts | Recharts 2.x |
| Icons | Lucide React |
| Noise | simplex-noise (particle displacement) |

> ⚠️ **Stack is locked.** Do not add packages without discussion. No Framer Motion. No `.glb`/`.gltf` assets. No audio files.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
http://localhost:5173
```

> Place your Earth texture at `public/earth.jpg`. If absent, the globe falls back to `MeshPhongMaterial` with color `#1a2a1a`.

---

## Color System

All colors are CSS custom properties. **No exceptions. No overrides.**

```css
:root {
  --void:    #06080f;               /* Background — near-black, warm undertone */
  --surface: #0e1018;               /* Card / panel base */
  --ember:   #C8410A;               /* PRIMARY accent — rescue red-orange */
  --crimson: #7A0F0F;               /* Secondary — deep threat red */
  --gold:    #D4A853;               /* Highlight — resource / success */
  --ash:     #E8E0D5;               /* Primary text — warm off-white */
  --smoke:   #5C5650;               /* Muted text / disabled */
  --glass:   rgba(232,224,213,0.04);/* Glassmorphic surface */
  --border:  rgba(232,224,213,0.08);/* Card borders */
}
```

**FORBIDDEN:** any hex starting with `#0066`, `#00f`, `#0af`, `#4a`, `#7c3aed`, or any blue / purple / cyan family.

### Disaster Simulation Color Overrides

Applied via `document.body.dataset.sim` in Section 12:

| Simulation | `--sim-accent` | Notes |
|---|---|---|
| Flood | `#2E5C6E` | Dark teal-grey — NOT blue |
| Wildfire | `#E84B0A` | Bright ember |
| Cyclone | `#8A7560` | Warm sand-grey |
| Earthquake | `#A67C2E` | Deep gold |

---

## Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Headings | Space Grotesk | 700 | `clamp(2rem, 6vw, 7rem)` |
| UI Labels | Inter | 400 / 500 | 13px – 16px |
| Data / Numbers | JetBrains Mono | 400 | All counters, Case IDs, timestamps |

Load all three via `<link>` in `index.html` from Google Fonts.

---

## Folder Structure

```
src/
├── components/
│   ├── canvas/
│   │   ├── Scene.jsx          # R3F Canvas wrapper + post-processing
│   │   ├── EarthGlobe.jsx     # 3D Earth sphere + atmosphere shader
│   │   ├── ParticleField.jsx  # 800-particle ember/gold drift field
│   │   └── SimOverlay.jsx     # Flood/Wildfire/Cyclone/Earthquake overlays
│   └── ui/
│       ├── Navbar.jsx
│       ├── CustomCursor.jsx
│       ├── ScrollProgressBar.jsx
│       ├── GlassCard.jsx
│       ├── MagneticButton.jsx
│       ├── AlertBadge.jsx
│       ├── ProgressBar.jsx
│       └── CounterStat.jsx
├── hooks/
│   ├── useSmoothScroll.js     # Lenis + GSAP ticker bridge
│   ├── useTickEngine.js       # 1500ms interval stat updates
│   ├── useTilt.js
│   ├── useMouseParallax.js
│   └── useCountUp.js
├── store/
│   └── disasterStore.js       # Zustand: simulation, alertLevel, liveStats, alerts
├── sections/
│   ├── S00_Loading.jsx
│   ├── S01_Hero.jsx
│   ├── S02_CommandCenter.jsx
│   ├── S03_AlertSystem.jsx
│   ├── S04_DisasterMap.jsx
│   ├── S05_IncidentReport.jsx
│   ├── S06_ShelterLocator.jsx
│   ├── S07_SafetyGuidelines.jsx
│   ├── S08_EmergencyContacts.jsx
│   ├── S09_ResourceDashboard.jsx
│   ├── S10_VolunteerCenter.jsx
│   ├── S11_AIAssistant.jsx
│   ├── S12_DisasterSimulation.jsx
│   ├── S13_ResponseTimeline.jsx
│   ├── S14_MissingPersons.jsx
│   ├── S15_Donations.jsx
│   ├── S16_Checklist.jsx
│   ├── S17_RescueNetwork.jsx
│   ├── S18_NewsFeed.jsx
│   ├── S19_Analytics.jsx
│   └── S20_Footer.jsx
├── data/
│   ├── alerts.json
│   └── shelters.json
├── App.jsx
└── main.jsx
public/
└── earth.jpg                  # User-provided Earth texture (WebP preferred)
```

---

## Architecture

### Core Engine

**`useSmoothScroll.js`** — Lenis (duration 1.3, custom exponential easing) bridged into GSAP's ticker. Returns `{ lenis, scrollY, scrollProgress }`. No `ScrollTrigger.scrollerProxy()` needed.

**`useTickEngine.js`** — `setInterval` at 1500ms. Each tick applies random deltas to `disasterStore`: rescued count, active incidents, shelter occupancy, volunteer count. All sections subscribe via Zustand — no prop drilling.

**`disasterStore.js`** — Zustand store holding `simulation`, `alertLevel`, `liveStats`, and `alerts[]`.

### 3D Canvas (`Scene.jsx`)

- `<Canvas>` with `ACESFilmicToneMapping`, exposure 1.1, antialiasing off
- Camera: `fov 50`, position `[0, 0, 6]`, `dpr={[1, 1.5]}`
- Post-processing chain: **Bloom** → **Noise** → **Vignette**
- `<PerformanceMonitor>`: degraded → 60k particles; incline → 120k particles
- Every `<Canvas>` wrapped in `<ErrorBoundary>` — on WebGL failure, falls back to CSS gradient + inline SVG Earth silently

### Scroll & Animation

- All animation authored in **GSAP** (ScrollTrigger for scroll-driven, ticker for frame-driven)
- `frameloop="always"` on S01 Hero only; `frameloop="demand"` on S04 Map; removed on all others
- Every section file is `React.lazy()` + `<Suspense>`

---

## Sections (20 Total)

| # | Section | Key Features |
|---|---|---|
| S00 | Loading | SVG logo stroke draw, scan line, boot messages, clip-path wipe into hero |
| S01 | Hero | R3F Earth globe, hotspot markers, mouse parallax, character-stagger headline, live stat bar, alert ticker |
| S02 | Command Center | 6 GlassCards with live Zustand stats, Recharts mini lines, emergency status feed, SVG world map |
| S03 | Alert System | Filter tabs, severity-colored cards, pulsing critical backgrounds |
| S04 | Disaster Map | Interactive EarthGlobe, raycasting → detail panel, disaster type filter |
| S05 | Incident Report | 4-step form, drag-and-drop upload, Case ID generation (`RESCUE-YYYYMMDD-XXXX`) |
| S06 | Shelter Locator | Real-time search, occupancy progress bars, distance sort |
| S07 | Safety Guidelines | Animated accordion (GSAP height tween), 5 disaster categories |
| S08 | Emergency Contacts | 4 large tap-target cards, `tel:` links |
| S09 | Resource Dashboard | Horizontal Recharts BarChart, ember gradient bars, scroll-triggered animation |
| S10 | Volunteer Center | Card grid, scroll-triggered vertical timeline |
| S11 | AI Assistant | Fixed bottom-right ember/crimson orb, slide-up panel, voice-wave SVG, keyword reply map |
| S12 | Disaster Simulation | 4 disaster types → `body.dataset.sim`, Earth color shift, Web Audio API tones, 3D overlays |
| S13 | Response Timeline | 6-node vertical timeline, scroll-triggered stagger |
| S14 | Missing Persons | Search + filter (Missing / Found / Searching) |
| S15 | Donations | Radial SVG progress bars, scroll-triggered stroke animation |
| S16 | Checklist | `localStorage` persistence, color-transitioning progress bar, 100% confetti burst |
| S17 | Rescue Network | SVG force-directed graph, animated edges, pulsing nodes |
| S18 | News Feed | Auto-prepend every 4s, CSS scan-line overlay |
| S19 | Analytics | 2×2 Recharts grid: Pie / Line / Bar / Area |
| S20 | Footer | 5-column grid, social hover ember |

---

## Disaster Simulation (S12)

Selecting a disaster type triggers simultaneously:

1. `document.body.dataset.sim = type` → CSS var override via `[data-sim]` selectors
2. Earth particle color shifts to `--sim-accent`
3. Alert section auto-filters to selected type
4. Stats update to simulation-specific numbers
5. Web Audio API tone (no audio files):
   - **Flood** — sine 80Hz, gain 0.05
   - **Wildfire** — sawtooth 120Hz, gain 0.04
   - **Cyclone** — triangle 60Hz, gain 0.06 + LFO modulation
   - **Earthquake** — noise burst via `AudioBufferSourceNode`, gain 0.08, 2s fade
6. 3D overlay: rising mesh / particle shift / torus knot / GSAP ShakeX

---

## Performance Rules

- Three.js: `dispose()` geometry and material in every `useEffect` cleanup
- Recharts: render only when section enters viewport (`IntersectionObserver`, threshold 0.1)
- Images: lazy load, WebP format, always in `public/` — never imported as JS modules
- Sections: `React.lazy()` + `<Suspense>` for every section file
- `frameloop` scoped per canvas — never "always" globally

---

## WebGL Fallback

Every `<Canvas>` is wrapped in an `<ErrorBoundary>`. On WebGL failure:

- **Hero** → CSS animated gradient (`--ember` → `--crimson` → `--void`) + inline SVG Earth
- **Map** → 2D SVG world map with CSS-pulsing markers
- No error message shown to the user

---

## Acceptance Criteria

- [ ] Loading screen fully animates and clip-path wipes into hero — no flash
- [ ] 3D Earth renders, rotates, and responds to mouse
- [ ] Zero blue, purple, or cyan in any rendered output (run color picker spot check)
- [ ] Disaster Simulation changes `body` data attribute, Earth color, and alert filter simultaneously
- [ ] AI Assistant orb is ember/crimson — **not** blue/cyan
- [ ] Incident form completes all 4 steps and generates Case ID in JetBrains Mono
- [ ] Ticker auto-updates; stat counters count up on mount
- [ ] Checklist state survives page refresh
- [ ] Site navigable on iPhone 14 (375px) without horizontal scroll
- [ ] All 20 sections render without console errors on Chrome 125+

---

## Build Phases

| Phase | Deliverables |
|---|---|
| 0 | `globals.css` · `tailwind.config.js` · `disasterStore.js` · all `/data/*.json` |
| 1 | `useSmoothScroll` · `useTickEngine` · `useTilt` · `useMouseParallax` · `useCountUp` |
| 2 | `Scene.jsx` · `EarthGlobe.jsx` · `ParticleField.jsx` · `SimOverlay.jsx` |
| 3 | Navbar · CustomCursor · ScrollProgressBar · GlassCard · MagneticButton · AlertBadge · ProgressBar · CounterStat |
| 4 | S00 Loading · S01 Hero · S02 Command Center · S03 Alert System |
| 5 | S04 Map · S05 Incident Report · S06 Shelter Locator · S11 AI Assistant · S12 Simulation |
| 6 | S07–S10 · S13–S19 · S20 Footer |
| 7 | `App.jsx` · `main.jsx` · README |

> Confirm ✅ after each phase. Wait for "continue" before proceeding. Do not batch phases.

---

## Stop Conditions

Ask before:

- Adding any package not in the locked stack
- Using any shade of blue, cyan, or purple — propose an alternative instead
- WebGL drops below 30fps — ask which sections to simplify
- A section's layout breaks adjacent sections

---

## License

Internal project. All rights reserved.
