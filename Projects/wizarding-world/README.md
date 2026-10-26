<div align="center">

```
 ██╗    ██╗██╗███████╗ █████╗ ██████╗ ██████╗ ██╗███╗   ██╗ ██████╗
 ██║    ██║██║╚══███╔╝██╔══██╗██╔══██╗██╔══██╗██║████╗  ██║██╔════╝
 ██║ █╗ ██║██║  ███╔╝ ███████║██████╔╝██║  ██║██║██╔██╗ ██║██║  ███╗
 ██║███╗██║██║ ███╔╝  ██╔══██║██╔══██╗██║  ██║██║██║╚██╗██║██║   ██║
 ╚███╔███╔╝██║███████╗██║  ██║██║  ██║██████╔╝██║██║ ╚████║╚██████╔╝
  ╚══╝╚══╝ ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝
                                                                       
                    ✦  W O R L D  ✦
```

<br/>

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white" />
<img src="https://img.shields.io/badge/React_Router-v6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />

<br/><br/>

> *"It does not do to dwell on dreams and forget to live."*
> — Albus Dumbledore

<br/>

**A fully immersive Harry Potter companion app — built with love, magic, and modern React.**  
Explore characters, relive the films, discover your Hogwarts house, and dive deep into wizarding lore.

<br/>

[✦ Live Demo](https://wizarding-world-sooty.vercel.app/) &nbsp;·&nbsp; [✦ Report Bug](https://github.com/nilanjanajui/wizarding-world/issues) &nbsp;·&nbsp; [✦ Request Feature](https://github.com/nilanjanajui/wizarding-world/issues)

</div>

---

<br/>

## ✨ Features at a Glance

| ✦ | Feature | Description |
|---|---------|-------------|
| 🏰 | **Home** | Cinematic hero with a gold shimmer title, scroll-fade sections, and featured character cards |
| 🎬 | **Movies** | All 8 films with PotterDB posters, ratings, release info, and lazy-loaded imagery |
| 🧙 | **Characters** | 4000+ characters from the PotterDB API with live status filters, smart sorting, and per-house glow cards |
| 👤 | **Character Profile** | Deep-dive on any character — biography, house, actor, wand, patronus, and more |
| ⭐ | **Favourites** | Persist your favourite characters across sessions with `localStorage` |
| 📊 | **Wizard Stats** | Actor career charts and wizarding-world stats powered by a fully real data-driven `ActorLineChart` |
| 🎩 | **Sorting Hat** | An interactive ceremony that sorts you into your Hogwarts house |
| ❓ | **404 Page** | A magical not-found experience worthy of the wizarding world |

---

<br/>

## 🎨 Design Highlights

### ✦ Golden Sparkle Cursor Trail
A full-screen canvas overlay (`z-index: 9999`, `pointer-events: none`) paints a trail of enchanted gold particles wherever the cursor moves. Four distinct particle shapes — 4-pointed stars, diamonds, cross ellipses, and circles — drift upward with physics-based gravity and fade out. 40% of particles receive a `shadowBlur` glow effect. Throttled to one spawn batch per 16ms for buttery-smooth performance.

### ✦ 3D Tilt Character Cards
Every character card on the Characters page responds to mouse movement with ±8° `rotateX` / `rotateY` perspective tilt. Built with Framer Motion's `useMotionValue`, `useTransform`, and `useSpring` for elastic snap-back. House-specific glow rings bloom on hover with `glowIdle` (faint ring at rest) → `glowHover` (full radial bloom) transitions — all driven by an inline-style `HOUSE_CONFIG` object to avoid Tailwind class tree-shaking.

### ✦ Per-House Theming
Each Hogwarts house gets its own complete visual identity:

| House | Primary | Glow | Badge |
|-------|---------|------|-------|
| 🦁 Gryffindor | `#c84b11` | Red-orange bloom | Crimson |
| 🦡 Hufflepuff | `#f0a500` | Amber bloom | Gold |
| 🦅 Ravenclaw | `#0e4d8a` | Cobalt bloom | Royal Blue |
| 🐍 Slytherin | `#1a6b3a` | Emerald bloom | Dark Green |

### ✦ Gold Shimmer Hero Title
A CSS `@keyframes shimmer` animation sweeps a gold-to-white-to-gold gradient across the `<h1>` on the home page using `background-clip: text` and `-webkit-text-fill-color: transparent`.

### ✦ Scroll-Fade Animations
A custom `useScrollFade` hook wires `IntersectionObserver` to every `.scroll-fade` element inside a container ref, triggering entrance animations as sections scroll into view. Applied across Home, Characters, Movies, and WizardStats pages.

### ✦ Page Transitions
`AnimatePresence` from Framer Motion wraps all routes keyed on `location.pathname`, delivering seamless page-to-page transitions across the entire app.

---

<br/>

## 🏗️ Architecture

```
src/
├── components/
│   ├── Layout.jsx              # Shared layout with <Outlet /> — Navbar persists across all routes
│   ├── SparkleTrail.jsx        # Full-screen canvas cursor sparkle effect
│   ├── Navbar.jsx              # Global navigation bar
│   └── characters/
│       ├── TiltCard.jsx        # 3D perspective tilt card (extracted for hook rules)
│       └── CharacterProfile.jsx
├── context/
│   ├── FavoritesContext.jsx    # localStorage-backed favourites
│   └── CharactersContext.jsx   # Single shared HP API fetch with enrichment
├── data/
│   └── charactersData.js       # Enrichment data for 19 major characters
├── hooks/
│   └── useScrollFade.js        # IntersectionObserver scroll-fade hook
├── pages/
│   ├── Home.jsx
│   ├── Movies.jsx
│   ├── Characters.jsx
│   ├── FavCharacters.jsx
│   ├── WizardStats.jsx
│   ├── SortingHat.jsx
│   └── NotFound.jsx
├── App.jsx                     # Lazy-loaded routes with withSuspense helper
└── index.css                   # Shimmer keyframes, scroll-fade base styles
```

### Route Structure

```jsx
<BrowserRouter>
  <SparkleTrail />
  <AnimatePresence mode="wait">
    <Route element={<Layout />}>          {/* Navbar lives here */}
      <Route path="/"                 element={<Home />} />
      <Route path="/movies"           element={<Movies />} />
      <Route path="/characters"       element={<Characters />} />
      <Route path="/characters/:name" element={<CharacterProfile />} />
      <Route path="/favourites"       element={<FavCharacters />} />
      <Route path="/stats"            element={<WizardStats />} />
      <Route path="/sorting-hat"      element={<SortingHat />} />
      <Route path="*"                 element={<NotFound />} />
    </Route>
  </AnimatePresence>
</BrowserRouter>
```

All routes are **lazy-loaded** via `React.lazy()` with per-route `<Suspense>` boundaries using a `withSuspense` helper — the initial bundle is minimal and each page loads on demand.

---

<br/>

## 🔌 APIs Used

| API | Used For | Endpoint |
|-----|----------|----------|
| [HP API](https://hp-api.onrender.com) | Character roster (4000+), portraits | `https://hp-api.onrender.com/api/characters` |
| [PotterDB](https://potterdb.com) | Movie posters, detailed character data | `https://api.potterdb.com/v1/...` |
| [Potterhead API](https://potterheadapi.com) | Supplemental lore data | Various |

Character portraits follow a consistent URL pattern:
```
https://hp-api.onrender.com/images/characters/[name].jpeg
```

All character data is further enriched locally via `characterImages` mapping in `CharactersContext` — so every character gets a consistent, fallback-safe image whether or not the API provides one.

---

<br/>

## ⚡ Performance

- **Code splitting** — Every page is `React.lazy()` loaded; the initial JS bundle is tiny
- **`loading="lazy"`** — On every `<img>` tag across Characters, FavCharacters, Movies, and Home
- **Single API fetch** — `CharactersContext` fetches the HP API once and shares it across all consumers (`Characters.jsx`, `Home.jsx`) via context — no duplicate network requests
- **Throttled canvas** — `SparkleTrail` spawns at most one particle batch per 16ms (`requestAnimationFrame`-aligned)
- **Animation cleanup** — All `IntersectionObserver` instances and `rAF` loops are fully torn down on unmount

---

<br/>

## 🧪 Error Handling

Both `Characters.jsx` and `WizardStats.jsx` surface a full error UI when their API calls fail:

- A descriptive panel with the raw error message
- A **retry button** with a `group-hover:rotate-180` spinning refresh icon
- The retry mechanism uses a `retryKey` state pattern — incrementing it re-triggers the `useEffect` without any external library

`CharactersContext` exposes a `retry` callback so consumers can trigger re-fetches from anywhere in the tree.

---

<br/>

## 🛠️ Getting Started

### Prerequisites

- Node.js `v18+`
- npm `v9+`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/nilanjanajui/wizarding-world.git
cd wizarding-world

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and let the magic begin. ✨

### Build for Production

```bash
npm run build
npm run preview
```

---

<br/>

## 📦 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI library |
| Vite | 5 | Build tool & dev server |
| Tailwind CSS | v4 | Utility-first styling |
| Framer Motion | 12 | Animations & page transitions |
| React Router | v6 | Client-side routing |

> **No class-based components. No Redux. No unnecessary dependencies.**  
> Just Context API, hooks, and modern React — clean and intentional.

---

<br/>

## 🗺️ Roadmap

- [x] Core SPA with 8 pages and React Router v6
- [x] Favourites with `localStorage` persistence
- [x] Lazy loading + page transitions
- [x] Characters filtering, sorting, and house-glow cards
- [x] Shared `CharactersContext` — single fetch, zero duplication
- [x] Error states with retry across all data-fetching pages
- [x] Gold sparkle cursor trail
- [x] `useScrollFade` scroll-triggered entrance animations
- [ ] HP Trivia Quiz page
- [ ] Spells encyclopedia page
- [ ] Side-by-side character comparison view
- [ ] Sorting Hat SVG upgrade (movie-accurate illustration)
- [ ] Extract `HOUSE_CONFIG` to shared `src/data/houseData.js`

---

<br/>

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

<br/>

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<br/>

<div align="center">

*This project is a fan-made tribute to the Harry Potter universe.*  
*All characters, house names, and wizarding world elements are the intellectual property of J.K. Rowling and Warner Bros.*

<br/>

**Made with ✨ and a lot of butterbeer by [nilanjanajui](https://github.com/nilanjanajui)**

<br/>

```
  ∗  .  ·  ˚  ✦   ·    .   ✦  ˚  ·  .  ∗
      "Mischief Managed."
  ∗  .  ·  ˚  ✦   ·    .   ✦  ˚  ·  .  ∗
```

</div>
