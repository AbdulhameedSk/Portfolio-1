# Shaik Abdulhameed — 3D Portfolio

An immersive developer portfolio built with **React 18**, **Three.js**, **Tone.js**, and **Vite**.

## Quick Start

```bash
# Clone or unzip the project
cd portfolio

# Install dependencies
npm install

# Start dev server (opens http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to Vercel

```bash
# Option 1: Vercel CLI
npm run build
npx vercel

# Option 2: Connect GitHub repo
# Push to GitHub → Import in vercel.com → Auto-deploys on push
```

> **Important:** Place your resume PDF at `public/resume.pdf` before deploying.

---

## Project Structure

```
portfolio/
├── public/                          # Static assets served as-is
│   └── resume.pdf                   # ← Add your resume here
│
├── src/
│   ├── main.jsx                     # React entry point
│   ├── App.jsx                      # Root component — wires everything
│   │
│   ├── data/
│   │   └── resume.js                # ✏️ ALL content lives here — edit this!
│   │
│   ├── hooks/
│   │   └── index.js                 # useScramble, useTypingRole, useParticleBurst, useAmbientMusic
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   └── index.jsx            # Reveal, Counter, GlassCard, TiltCard, MagLink,
│   │   │                            # SectionHead, SkillPill, Badge, ContactChip
│   │   ├── three/
│   │   │   ├── SpaceBackground.jsx  # Stars, icosahedron, torus rings, orbiting shapes
│   │   │   └── Globe.jsx            # Rotating earth with Hyderabad pin
│   │   │
│   │   └── sections/
│   │       ├── Nav.jsx              # Navbar + burger menu + hidden scroll text
│   │       └── Sections.jsx         # Hero, Marquee, About, GitHub, Experience,
│   │                                # Projects, Skills, Education, Contact, Footer
│   │
│   └── styles/
│       └── global.css               # Fonts, resets, keyframes, responsive breakpoints
│
├── index.html                       # HTML shell
├── vite.config.js                   # Vite configuration
├── package.json                     # Dependencies & scripts
└── README.md                        # You are here
```

---

## How to Edit Content

**All content is in one file: `src/data/resume.js`**

| Export | What it controls |
|---|---|
| `PERSONAL` | Name, email, phone, LinkedIn, GitHub, resume URL |
| `ROLES` | Hero typing animation roles |
| `STATS` | Animated counter numbers in hero |
| `EXPERIENCE` | Work experience cards |
| `PROJECTS` | Project showcase cards (name, desc, tech, color) |
| `SKILLS` | Skill groups + items |
| `SERVICES` | "What I Do" service grid |
| `EDUCATION` | Education timeline |
| `CERTS` | Certification badges |

---

## Features

### 3D & Visual
- **Three.js space scene** — 2500 stars, wireframe icosahedron, 3 torus rings, 18 orbiting mini shapes, particle ring
- **3D Globe** — Rotating wireframe earth with pulsing Hyderabad pin
- **Mouse parallax** — Camera follows cursor for depth
- **Scroll-reactive** — 3D objects shift + fade as you scroll

### Interactions
- **Text scramble** — Hero name decodes like a terminal
- **Typing roles** — Cycles through job titles with typing + delete
- **Magnetic nav links** — Text pulls toward cursor on hover
- **3D tilt project cards** — Perspective rotation follows mouse
- **Particle burst** — Colorful explosion on CTA button clicks
- **Custom cursor** — Glowing dot + ambient glow trail (RAF-driven, 60fps)
- **Scroll progress bar** — Gradient bar at top of page

### Audio
- **Ambient space music** — Tone.js generates live reverb-drenched synth pads (toggle in nav)

### GitHub
- **Live contribution heatmap** — Fetches real data from GitHub API
- **Fallback** — Shows ghchart.org image if API blocked
- **Stats** — Total contributions, repos, followers, streak

### Responsive
- Breakpoints at 768px (tablet) and 480px (mobile)
- Hamburger menu with fullscreen overlay
- All fonts, padding, gaps use `clamp()` for fluid scaling
- Custom cursor auto-hides on touch devices

---

## Tech Stack

| Tech | Purpose |
|---|---|
| React 18 | UI framework |
| Three.js | 3D space background + globe |
| Tone.js | Ambient music synthesis |
| Vite | Build tool & HMR dev server |
| CSS Variables | Design tokens & theming |

---

## Architecture Decisions

- **No CSS framework** — Pure inline styles + CSS variables for maximum control
- **No state management** — React useState + useRef is sufficient
- **RAF cursor** — requestAnimationFrame for cursor tracking (zero re-renders)
- **Barrel exports** — `hooks/index.js` and `ui/index.jsx` for clean imports
- **Single data source** — `resume.js` keeps content separate from presentation
- **Code splitting ready** — Each section is a named export, easy to lazy-load

---

## Performance Notes

- Three.js renderer capped at `devicePixelRatio: 2`
- Intersection Observer for lazy reveal animations
- `willChange: transform` on cursor elements for GPU compositing
- Particle system uses canvas 2D (lighter than Three.js particles)
- Fonts loaded via Google Fonts with `display=swap`

---

## License

MIT — use however you want.
