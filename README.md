# 🔴 RescueNet — Disaster Response & Emergency Assistance Portal

<div align="center">

**A cinematic, real-time disaster response coordination platform — built as an Awwwards-level React SPA.**

*Live 3D Earth · AI Emergency Assistant · Shelter Locator · Real-Time Alerts · Disaster Simulation*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Site-C8410A?style=for-the-badge)](https://disaster-response-emergency-assista.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-D4A853?style=for-the-badge)](./License)
[![React](https://img.shields.io/badge/React-18-0e1018?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-0e1018?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev)

</div>

---

## 🌋 Overview

**RescueNet** is a production-grade single-page application designed for real-time disaster response coordination. It combines an interactive 3D globe, AI-powered emergency guidance, live-updating statistics, multi-step incident reporting, and a shelter locator — all wrapped in a distinctive **"Volcanic Crisis"** visual language: molten ember, burnt amber, and ash white. No blue. No purple. No cyan. Ever.

Every one of its **20 sections** is built for speed, resilience, and mobile-first usability — because in a real emergency, the interface has to work first time, every time.

---

## ✨ Key Features

| | |
|---|---|
| 🌍 **Interactive 3D Earth** | WebGL globe with rotating hotspot markers and mouse parallax, built with React Three Fiber |
| 🤖 **AI Emergency Assistant** | Slide-up panel with keyword-driven guidance, always one tap away |
| 📊 **Live Command Center** | Real-time stat ticking (rescues, incidents, shelters, volunteers) via a 1.5s tick engine |
| 📝 **4-Step Incident Reporting** | Drag-and-drop uploads with auto-generated Case IDs (`RESCUE-YYYYMMDD-XXXX`) |
| 🏠 **Shelter Locator** | Live search, occupancy bars, and distance-based sorting |
| 🎛️ **Disaster Simulation** | Flood / Wildfire / Cyclone / Earthquake modes — each with unique color shifts, audio tones, and 3D overlays |
| 📈 **Analytics Dashboard** | Recharts-powered Pie, Line, Bar & Area visualizations |
| 📡 **Live News Feed** | Auto-updating ticker with a scan-line CRT aesthetic |
| ✅ **Persistent Safety Checklist** | LocalStorage-backed progress, with a confetti burst at 100% |
| 🛟 **Graceful WebGL Fallback** | Every 3D canvas degrades silently to CSS/SVG — nothing ever breaks |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + Vite 5 |
| **Styling** | Tailwind CSS v3 |
| **3D / WebGL** | React Three Fiber · Three.js · `@react-three/drei` · `@react-three/postprocessing` |
| **Animation** | GSAP 3 (ScrollTrigger + ticker) |
| **Smooth Scroll** | Lenis |
| **State Management** | Zustand |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Effects** | simplex-noise (particle displacement) |

---

## 🎨 Design Language

RescueNet runs on a strict, custom **Volcanic Crisis** palette — no exceptions:

```css
--void:    #06080f   /* Background */
--surface: #0e1018   /* Panels */
--ember:   #C8410A   /* Primary accent */
--crimson: #7A0F0F   /* Threat / alert */
--gold:    #D4A853   /* Success / highlight */
--ash:     #E8E0D5   /* Primary text */
--smoke:   #5C5650   /* Muted text */
```

**Typography:** Space Grotesk (headings) · Inter (UI) · JetBrains Mono (data & Case IDs)

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Omrawat11/Disaster-Response-Emergency-Assistant.git
cd Disaster-Response-Emergency-Assistant

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Then open **http://localhost:5173** in your browser.

> 💡 Place an Earth texture at `public/earth.jpg` for the 3D globe — without it, the app falls back to a stylized flat-shaded sphere automatically.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── canvas/       # 3D scene, Earth globe, particles, simulation overlays
│   └── ui/            # Navbar, cursor, buttons, badges, cards
├── hooks/              # Scroll, tick engine, parallax, count-up
├── store/              # Zustand global state
├── sections/           # 20 full-page sections (S00–S20)
├── data/               # Static JSON (alerts, shelters)
├── App.jsx
└── main.jsx
```

---

## 🗺️ Sections at a Glance

| Section | Highlights |
|---|---|
| Hero | 3D globe, live stat bar, alert ticker |
| Command Center | Real-time stats, mini charts, world map |
| Alert System | Filterable, severity-coded alert feed |
| Disaster Map | Interactive globe with raycasting detail panels |
| Incident Report | 4-step form with auto Case ID generation |
| Shelter Locator | Search, occupancy, distance sorting |
| AI Assistant | Conversational emergency guidance |
| Disaster Simulation | 4 interactive crisis scenarios |
| Missing Persons | Searchable status board |
| Analytics | Multi-chart data dashboard |

*(Full 20-section breakdown available in the source code.)*

---

## 🌐 Live Demo

👉 **[disaster-response-emergency-assista.vercel.app](https://disaster-response-emergency-assista.vercel.app)**

---

## 📄 License

This project is licensed under the **MIT License** — see the [License](./License) file for details.

---

<div align="center">

Built with 🔥 by [**Om Rawat**](https://github.com/Omrawat11)

</div>
