import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { to: "/", label: "Home", icon: "home", end: true },
  { to: "/movies", label: "Movies", icon: "movie" },
  { to: "/characters", label: "Characters", icon: "groups" },
  { to: "/favorites", label: "Favorites", icon: "favorite" },
  { to: "/stats", label: "Stats", icon: "analytics" },
  { to: "/sorting-hat", label: "Sorting Hat", icon: "auto_fix_high" },
];

const SPELLS = [
  "✨ Lumos!",
  "⚡ Expelliarmus!",
  "🔮 Accio Knowledge!",
  "🌙 Nox!",
  "💫 Wingardium Leviosa!",
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [spellMsg, setSpellMsg] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const spellTimer = useRef(null);

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Add after the existing two useEffects
  useEffect(() => () => clearTimeout(spellTimer.current), []);


  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/characters?search=${encodeURIComponent(q)}`);
    setSearchQuery("");
    setMenuOpen(false);
  };

  const handleSpell = () => {
    const spell = SPELLS[Math.floor(Math.random() * SPELLS.length)];
    setSpellMsg(spell);
    clearTimeout(spellTimer.current);
    spellTimer.current = setTimeout(() => setSpellMsg(""), 2000);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b border-primary/20 bg-background-dark/90 backdrop-blur-md transition-all duration-300 ${scrolled ? "py-2 shadow-lg shadow-black/30" : "py-4"
          }`}
      >
        <div className="flex items-center justify-between px-6 md:px-20">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity shrink-0"
          >
            <span className="material-symbols-outlined text-3xl">bolt</span>
            <h2 className="text-xl font-bold leading-tight tracking-tight font-display hidden sm:block">
              Wizarding World
            </h2>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors pb-0.5 ${isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-slate-300 hover:text-primary"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Search — Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="flex h-10 rounded-lg overflow-hidden border border-primary/20 focus-within:border-primary transition-colors">
                <div className="flex items-center justify-center bg-primary/10 px-3 text-primary/60">
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search characters..."
                  className="w-44 bg-primary/10 text-slate-100 placeholder:text-primary/40 px-3 text-sm focus:outline-none focus:w-56 transition-all duration-300"
                />
              </div>
            </form>


            {/* Spell Button + Toast */}
            <div className="relative">
              <button
                onClick={handleSpell}
                title="Cast a spell!"
                className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary border border-primary/20 text-primary hover:bg-primary hover:text-background-dark transition-all"
              >
                <span className="material-symbols-outlined">auto_fix_high</span>
              </button>
              {spellMsg && (
                <div className="absolute right-0 top-12 bg-background-dark border border-primary/40 text-primary text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap shadow-lg shadow-primary/10 animate-bounce">
                  {spellMsg}
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="lg:hidden flex items-center justify-center h-10 w-10 text-primary hover:bg-primary/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">
                {menuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="flex flex-col gap-1 px-6 py-4 border-t border-primary/10 bg-background-dark">

            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="flex items-center h-11 rounded-lg overflow-hidden border border-primary/20 mb-3 focus-within:border-primary transition-colors"
            >
              <div className="flex items-center justify-center bg-primary/10 px-3 h-full text-primary/60">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search characters..."
                className="flex-1 bg-primary/10 text-slate-100 placeholder:text-primary/40 px-3 text-sm focus:outline-none h-full"
              />
            </form>

            {/* Mobile Nav Links */}
            {navLinks.map(({ to, label, icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? "bg-primary text-background-dark"
                    : "text-slate-300 hover:bg-primary/10 hover:text-primary"
                  }`
                }
              >
                <span className="material-symbols-outlined text-lg">{icon}</span>
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}