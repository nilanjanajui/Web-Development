import { useState, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion as Motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useFavorites } from "../../context/FavoritesContext";
import { useCharacters } from "../../context/CharactersContext";
import characterImages from "../../data/characterImages";
import useScrollFade from "../../hooks/useScrollFade";

const HOUSES = ["All", "Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];

const SORT_OPTIONS = [
  { label: "Name (A-Z)", value: "name-asc" },
  { label: "Name (Z-A)", value: "name-desc" },
  { label: "By House", value: "house" },
  { label: "Alive First", value: "alive-first" },
  { label: "Deceased First", value: "deceased-first" },
];

const HOUSE_CONFIG = {
  Gryffindor: {
    borderClass: "border-red-700/40",
    glowIdle: "0 0 0 1px rgba(185,28,28,0.40)",
    glowHover: "0 0 28px 6px rgba(185,28,28,0.38), 0 8px 32px rgba(0,0,0,0.50)",
    gradient: "linear-gradient(to top, rgba(120,10,10,0.80) 0%, transparent 65%)",
    cardBg: "rgba(120,10,10,0.07)",
    badgeClass: "bg-red-800 text-yellow-300",
    badgeShadow: "0 0 8px rgba(185,28,28,0.60)",
    nameClass: "group-hover:text-red-400",
    btnBg: "#7f1d1d",
    btnBorder: "#b91c1c",
    btnText: "#fde68a",
    fallbackBg: "rgba(120,10,10,0.20)",
    fallbackIcon: "#f87171",
  },
  Slytherin: {
    borderClass: "border-green-800/40",
    glowIdle: "0 0 0 1px rgba(22,101,52,0.40)",
    glowHover: "0 0 28px 6px rgba(22,101,52,0.38), 0 8px 32px rgba(0,0,0,0.50)",
    gradient: "linear-gradient(to top, rgba(5,46,22,0.85) 0%, transparent 65%)",
    cardBg: "rgba(5,46,22,0.08)",
    badgeClass: "bg-green-900 text-green-200",
    badgeShadow: "0 0 8px rgba(22,101,52,0.60)",
    nameClass: "group-hover:text-green-400",
    btnBg: "#14532d",
    btnBorder: "#15803d",
    btnText: "#bbf7d0",
    fallbackBg: "rgba(5,46,22,0.25)",
    fallbackIcon: "#4ade80",
  },
  Ravenclaw: {
    borderClass: "border-blue-800/40",
    glowIdle: "0 0 0 1px rgba(30,64,175,0.40)",
    glowHover: "0 0 28px 6px rgba(30,64,175,0.38), 0 8px 32px rgba(0,0,0,0.50)",
    gradient: "linear-gradient(to top, rgba(23,37,84,0.85) 0%, transparent 65%)",
    cardBg: "rgba(23,37,84,0.08)",
    badgeClass: "bg-blue-900 text-blue-200",
    badgeShadow: "0 0 8px rgba(30,64,175,0.60)",
    nameClass: "group-hover:text-blue-400",
    btnBg: "#1e3a8a",
    btnBorder: "#1d4ed8",
    btnText: "#bfdbfe",
    fallbackBg: "rgba(23,37,84,0.25)",
    fallbackIcon: "#60a5fa",
  },
  Hufflepuff: {
    borderClass: "border-yellow-600/40",
    glowIdle: "0 0 0 1px rgba(161,98,7,0.40)",
    glowHover: "0 0 28px 6px rgba(161,98,7,0.38), 0 8px 32px rgba(0,0,0,0.50)",
    gradient: "linear-gradient(to top, rgba(78,52,0,0.85) 0%, transparent 65%)",
    cardBg: "rgba(78,52,0,0.08)",
    badgeClass: "bg-yellow-700 text-yellow-100",
    badgeShadow: "0 0 8px rgba(161,98,7,0.60)",
    nameClass: "group-hover:text-yellow-400",
    btnBg: "#713f12",
    btnBorder: "#a16207",
    btnText: "#fef9c3",
    fallbackBg: "rgba(78,52,0,0.25)",
    fallbackIcon: "#facc15",
  },
  Unknown: {
    borderClass: "border-primary/10",
    glowIdle: "0 0 0 1px rgba(212,175,53,0.15)",
    glowHover: "0 0 20px 4px rgba(212,175,53,0.20), 0 8px 32px rgba(0,0,0,0.50)",
    gradient: "linear-gradient(to top, rgba(15,23,42,0.80) 0%, transparent 65%)",
    cardBg: "rgba(212,175,53,0.03)",
    badgeClass: "bg-slate-700 text-slate-200",
    badgeShadow: "none",
    nameClass: "group-hover:text-primary",
    btnBg: "#d4af35",
    btnBorder: "#d4af35",
    btnText: "#0f172a",
    fallbackBg: "rgba(212,175,53,0.10)",
    fallbackIcon: "#d4af35",
  },
};

function TiltCard({ char, idx, houseKey, imgSrc, fav, toggleFavorite, handleViewProfile }) {
  const cfg = HOUSE_CONFIG[houseKey] ?? HOUSE_CONFIG.Unknown;
  const [isHovered, setIsHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 28 });

  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left - r.width / 2) / r.width);
    mouseY.set((e.clientY - r.top - r.height / 2) / r.height);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div style={{ perspective: "800px" }}>
      <Motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.04, duration: 0.35 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: isHovered ? cfg.glowHover : cfg.glowIdle,
          background: `linear-gradient(to bottom, ${cfg.cardBg}, transparent 60%)`,
          transition: "box-shadow 0.35s ease",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`group bg-card-dark rounded-xl overflow-hidden border transition-colors duration-300 flex flex-col ${cfg.borderClass}`}
      >
        {/* Image area */}
        <div className="relative aspect-3/4 overflow-hidden">
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: cfg.fallbackBg }}
          >
            <span className="material-symbols-outlined text-5xl sm:text-6xl" style={{ color: cfg.fallbackIcon }}>
              person
            </span>
            <span className="text-xs font-medium" style={{ color: cfg.fallbackIcon, opacity: 0.7 }}>
              No image
            </span>
          </div>

          {imgSrc && (
            <img
              src={imgSrc}
              alt={char.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          )}

          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{ background: cfg.gradient, opacity: isHovered ? 1 : 0.45 }}
          />

          {/* Favourite button */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
            <button
              onClick={() => toggleFavorite(char)}
              className={`p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all ${
                fav ? "bg-red-500/20 border border-red-500/40" : "bg-black/40 hover:bg-red-500/20"
              }`}
            >
              <span className={`material-symbols-outlined text-lg sm:text-xl transition-colors ${
                fav ? "filled-icon text-red-500" : "text-white hover:text-red-400"
              }`}>
                favorite
              </span>
            </button>
          </div>

          {houseKey !== "Unknown" && (
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-10">
              <span
                className={`${cfg.badgeClass} text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider transition-shadow duration-300`}
                style={{ boxShadow: isHovered ? cfg.badgeShadow : "none" }}
              >
                {houseKey}
              </span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-3 sm:p-4 md:p-5 flex flex-col gap-2 flex-1">
          <h3 className={`text-base sm:text-lg md:text-xl font-bold text-white transition-colors duration-200 leading-tight ${cfg.nameClass}`}>
            {char.name}
          </h3>
          <div className="space-y-1 text-xs sm:text-sm text-slate-400 flex-1">
            <div className="flex justify-between gap-2">
              <span className="shrink-0">Actor</span>
              <span className="text-slate-200 text-right truncate max-w-[60%]">{char.actor || "Unknown"}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="shrink-0">Species</span>
              <span className="text-slate-200 capitalize">{char.species || "Human"}</span>
            </div>
            <div className="flex justify-between gap-2 items-center">
              <span className="shrink-0">Status</span>
              <span className={`font-bold text-xs px-2 py-0.5 rounded-full ${
                char.alive ? "bg-green-500/10 text-green-400" : "bg-slate-500/10 text-slate-400"
              }`}>
                {char.alive ? "● Alive" : "● Deceased"}
              </span>
            </div>
          </div>
          <button
            onClick={() => handleViewProfile(char)}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={
              isHovered || btnHovered
                ? {
                    backgroundColor: cfg.btnBg,
                    borderColor: cfg.btnBorder,
                    color: cfg.btnText,
                    boxShadow: `0 4px 16px ${cfg.btnBorder}55`,
                  }
                : {}
            }
            className="mt-3 w-full border border-primary text-primary py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 uppercase tracking-widest"
          >
            View Profile
          </button>
        </div>
      </Motion.div>
    </div>
  );
}

export default function Characters() {
  const pageRef = useRef(null);
  useScrollFade(pageRef);

  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [activeHouse, setActiveHouse] = useState("All");
  const [activeStatus, setActiveStatus] = useState("all");
  const [sortBy, setSortBy] = useState("alive-first");
  const [visibleCount, setVisibleCount] = useState(16);

  const { characters, loading, error, retry } = useCharacters();
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let result = characters.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      const matchesHouse = activeHouse === "All" || c.house?.toLowerCase() === activeHouse.toLowerCase();
      const matchesStatus =
        activeStatus === "all" ||
        (activeStatus === "alive" && c.alive === true) ||
        (activeStatus === "deceased" && c.alive === false);
      return matchesSearch && matchesHouse && matchesStatus;
    });
    return [...result].sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "house") return (a.house || "").localeCompare(b.house || "");
      if (sortBy === "alive-first") return (b.alive ? 1 : 0) - (a.alive ? 1 : 0);
      if (sortBy === "deceased-first") return (a.alive ? 1 : 0) - (b.alive ? 1 : 0);
      return 0;
    });
  }, [characters, search, activeHouse, activeStatus, sortBy]);

  const visible = filtered.slice(0, visibleCount);

  const handleViewProfile = (char) =>
    navigate(`/characters/${encodeURIComponent(char.name)}`, { state: { character: char } });
  const handleSearchChange = (e) => { setSearch(e.target.value); setVisibleCount(16); };
  const handleHouseChange = (house) => { setActiveHouse(house); setVisibleCount(16); };
  const handleStatusChange = (s) => { setActiveStatus(s); setVisibleCount(16); };
  const handleSortChange = (e) => { setSortBy(e.target.value); setVisibleCount(16); };
  const clearAllFilters = () => {
    setSearch(""); setActiveHouse("All"); setActiveStatus("all");
    setSortBy("name-asc"); setVisibleCount(16);
  };

  return (
    <div ref={pageRef} className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
      <div className="flex flex-col h-full grow">
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-20 py-8 sm:py-10 lg:py-12">

          {/* ── Header ───────────────────────────────────────────────────────── */}
          <Motion.div
            className="flex flex-col gap-2 sm:gap-4 mb-8 sm:mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-slate-900 dark:text-slate-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight uppercase italic">
              Characters
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg md:text-xl font-normal max-w-2xl">
              Discover the legends, the heroes, and the villains of the Wizarding World.
            </p>
          </Motion.div>

          {/* ── Search + Filters ─────────────────────────────────────────────── */}
          <Motion.div
            className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Search bar */}
            <div className="relative w-full group">
              <span className="material-symbols-outlined absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-primary/60 group-focus-within:text-primary transition-colors text-lg sm:text-xl">
                search
              </span>
              <input
                className="w-full bg-slate-100 dark:bg-card-dark border border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl py-3.5 sm:py-5 pl-10 sm:pl-14 pr-10 sm:pr-6 text-base sm:text-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 shadow-lg transition-all outline-none"
                placeholder="Search for a wizard or witch..."
                type="text"
                value={search}
                onChange={handleSearchChange}
              />
              {search && (
                <button
                  onClick={() => { setSearch(""); setVisibleCount(16); }}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              )}
            </div>

            {/* House filter — horizontally scrollable on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible scrollbar-none">
              {HOUSES.map((house) => (
                <button
                  key={house}
                  onClick={() => handleHouseChange(house)}
                  className={`shrink-0 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm border transition-all hover:scale-105 ${
                    activeHouse === house
                      ? "bg-primary text-background-dark border-primary shadow-lg shadow-primary/20"
                      : "bg-slate-100 dark:bg-card-dark hover:bg-primary/10 text-slate-900 dark:text-slate-100 border-primary/10"
                  }`}
                >
                  {house}
                </button>
              ))}
            </div>

            {/* Status + Sort row — stacks on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              {/* Status pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Status</span>
                {[
                  { label: "All", value: "all" },
                  { label: "● Alive", value: "alive" },
                  { label: "● Deceased", value: "deceased" },
                ].map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => handleStatusChange(value)}
                    className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold text-xs border transition-all hover:scale-105 ${
                      activeStatus === value
                        ? value === "alive"
                          ? "bg-green-500/20 text-green-400 border-green-500/40"
                          : value === "deceased"
                            ? "bg-slate-500/20 text-slate-400 border-slate-500/40"
                            : "bg-primary text-background-dark border-primary"
                        : "bg-slate-100 dark:bg-card-dark text-slate-500 border-primary/10 hover:border-primary/30"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Count + Sort */}
              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                {!loading && !error && (
                  <span className="text-xs sm:text-sm text-slate-400 font-medium whitespace-nowrap">
                    {filtered.length} wizard{filtered.length !== 1 ? "s" : ""} found
                  </span>
                )}
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-primary/50 text-sm pointer-events-none">
                    sort
                  </span>
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="appearance-none bg-slate-100 dark:bg-card-dark border border-primary/10 focus:border-primary text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-bold rounded-lg pl-8 sm:pl-9 pr-7 sm:pr-8 py-1.5 sm:py-2 outline-none cursor-pointer transition-colors"
                  >
                    {SORT_OPTIONS.map(({ label, value }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 text-primary/50 text-sm pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
          </Motion.div>

          {/* ── Error State ──────────────────────────────────────────────────── */}
          {error && (
            <Motion.div
              className="flex flex-col items-center justify-center gap-5 sm:gap-6 py-16 sm:py-24 text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="material-symbols-outlined text-6xl sm:text-7xl text-red-500/60">
                wifi_off
              </span>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-200">
                  The Ministry owls couldn&apos;t deliver
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm max-w-xs sm:max-w-sm px-4 sm:px-0">
                  {error}
                </p>
              </div>
              <button
                onClick={retry}
                className="group flex items-center gap-2 bg-primary/10 border border-primary text-primary px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary hover:text-background-dark transition-all hover:shadow-lg hover:shadow-primary/20 text-sm"
              >
                <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform duration-500">
                  refresh
                </span>
                Try Again
              </button>
            </Motion.div>
          )}

          {/* ── Loading Skeletons ─────────────────────────────────────────────── */}
          {loading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-primary/10 flex flex-col animate-pulse">
                  <div className="aspect-3/4 bg-primary/10" />
                  <div className="p-3 sm:p-4 md:p-5 flex flex-col gap-3">
                    <div className="h-4 sm:h-5 bg-primary/10 rounded w-3/4" />
                    <div className="h-3 bg-primary/5 rounded w-1/2" />
                    <div className="h-3 bg-primary/5 rounded w-1/3" />
                    <div className="h-8 sm:h-9 bg-primary/10 rounded-lg mt-2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Grid ─────────────────────────────────────────────────────────── */}
          {!loading && !error && (
            <>
              {visible.length === 0 ? (
                <Motion.div
                  className="text-center py-16 sm:py-20 text-slate-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="material-symbols-outlined text-5xl sm:text-6xl text-primary/20">search_off</span>
                  <p className="mt-4 text-base sm:text-lg px-4">
                    No characters found for{" "}
                    <span className="text-primary font-bold">"{search}"</span>
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-6 px-5 sm:px-6 py-2 border border-primary/30 text-primary rounded-lg text-sm font-bold hover:bg-primary/10 transition-colors"
                  >
                    Clear Filters
                  </button>
                </Motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {visible.map((char, idx) => (
                    <TiltCard
                      key={`${char.name}-${idx}`}
                      char={char}
                      idx={idx}
                      houseKey={char.house || "Unknown"}
                      imgSrc={char.image || characterImages[char.name]}
                      fav={isFavorite(char.name)}
                      toggleFavorite={toggleFavorite}
                      handleViewProfile={handleViewProfile}
                    />
                  ))}
                </div>
              )}

              {visibleCount < filtered.length && (
                <div className="flex flex-col items-center gap-3 mt-12 sm:mt-16 lg:mt-20">
                  <p className="text-slate-500 text-xs sm:text-sm">
                    Showing {visibleCount} of {filtered.length} characters
                  </p>
                  <button
                    onClick={() => setVisibleCount((v) => v + 16)}
                    className="group flex items-center gap-2 sm:gap-3 bg-primary/10 border border-primary text-primary px-7 sm:px-10 py-3 sm:py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-primary hover:text-background-dark transition-all hover:shadow-lg hover:shadow-primary/20 text-sm"
                  >
                    Load More Wizards
                    <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">
                      keyboard_double_arrow_down
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </main>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <footer className="mt-16 sm:mt-20 border-t border-primary/10 bg-slate-50 dark:bg-background-dark py-8 sm:py-12 px-4 sm:px-6 lg:px-20 scroll-fade">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-8 text-center md:text-left">
            <div className="flex flex-col gap-1 sm:gap-2">
              <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold text-base sm:text-lg">
                <span className="material-symbols-outlined">auto_fix_high</span>
                Potter Explorer
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                Magic is only a click away. Mischief Managed.
              </p>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-tighter">
              © 2026 Potter Explorer Universe
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}