import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../../../context/FavoritesContext";

const BLOOD_STATUS = {
  "half-blood": "Half-blood",
  "muggleborn": "Muggle-born",
  "pure-blood": "Pure-blood",
  "half-blood (heir of slytherin)": "Half-blood",
};

const NAV_ITEMS = [
  { icon: "explore", label: "Discover", to: "/characters" },
  { icon: "favorite", label: "Favorites", to: "/favorites", active: true },
  { icon: "movie", label: "Movies", to: "/movies" },
  { icon: "analytics", label: "Stats", to: "/stats" },
];

export default function FavCharacters() {
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleViewProfile = (char) => {
    navigate(`/characters/${encodeURIComponent(char.name)}`, {
      state: { character: char },
    });
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
      <div className="layout-container flex flex-col h-full grow">

        <main className="flex-1 px-6 py-8 md:px-20 lg:px-40">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar */}
            <aside className="w-full md:w-64 flex flex-col gap-8">
              {/* Sidebar Nav */}
              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map(({ icon, label, to, active }) => (
                  <Link
                    key={label}
                    to={to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      active
                        ? "bg-primary text-background-dark shadow-lg shadow-primary/20"
                        : "text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined ${active ? "filled-icon" : ""}`}
                    >
                      {icon}
                    </span>
                    <span className={`text-sm ${active ? "font-bold" : "font-medium"}`}>
                      {label}
                    </span>
                  </Link>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-10">
                <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase mb-2">
                  Favorite Characters
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                  Your personal assembly of legendary witches, wizards, and
                  magical beings.
                </p>
              </div>

              {/* Favorites Grid */}
              {favorites.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {favorites.map((char) => {
                    const ancestry =
                      BLOOD_STATUS[char.ancestry?.toLowerCase()] ||
                      char.ancestry ||
                      "";

                    return (
                      <div
                        key={char.name}
                        className="group relative flex flex-col gap-3 p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-primary/5"
                      >
                        <div className="relative w-full aspect-3/4 overflow-hidden rounded-lg">
                          {/* Remove from favorites */}
                          <div className="absolute top-2 right-2 z-10">
                            <button
                              onClick={() => toggleFavorite(char)}
                              className="w-8 h-8 rounded-full bg-background-dark/80 flex items-center justify-center text-primary backdrop-blur-sm"
                            >
                              <span className="material-symbols-outlined filled-icon text-lg">
                                favorite
                              </span>
                            </button>
                          </div>

                          {char.image ? (
                            <img
                              src={char.image}
                              alt={char.name}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className={`w-full h-full bg-primary/10 items-center justify-center text-primary ${
                              char.image ? "hidden" : "flex"
                            }`}
                          >
                            <span className="material-symbols-outlined text-6xl">
                              person
                            </span>
                          </div>
                        </div>

                        <div className="px-1">
                          <h3 className="text-slate-900 dark:text-slate-100 font-bold text-lg leading-tight">
                            {char.name}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {char.house && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 uppercase font-bold">
                                {char.house}
                              </span>
                            )}
                            {ancestry && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400 uppercase font-bold">
                                {ancestry}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => handleViewProfile(char)}
                            className="mt-3 w-full border border-primary/40 text-primary hover:bg-primary hover:text-background-dark py-1.5 rounded-lg font-bold text-xs transition-colors uppercase tracking-widest"
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Empty State CTA — only shown when no favorites */}
              {favorites.length === 0 && (
                <div className="mt-20 flex flex-col items-center justify-center text-center py-12 px-6 rounded-3xl bg-primary/5 border-2 border-dashed border-primary/20">
                  <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-5xl">
                      magic_button
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    No favorites yet!
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
                    Tap the heart icon on any character's card to instantly add
                    them to your magical collection.
                  </p>
                  <Link
                    to="/characters"
                    className="px-8 py-3 bg-primary text-background-dark rounded-xl font-bold text-sm tracking-widest uppercase hover:brightness-110 transition-all"
                  >
                    Explore Characters
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-primary/20 px-6 py-10 md:px-20 lg:px-40 bg-background-light dark:bg-background-dark">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-primary/60">
              <span className="material-symbols-outlined">auto_stories</span>
              <span className="text-sm font-medium">
                PotterExplorer Archive © 2026
              </span>
            </div>
            <div className="flex gap-8">
              <a
                href="#"
                className="text-xs text-slate-500 hover:text-primary uppercase tracking-widest font-bold"
              >
                The Daily Prophet
              </a>
              <a
                href="#"
                className="text-xs text-slate-500 hover:text-primary uppercase tracking-widest font-bold"
              >
                Ministry News
              </a>
              <a
                href="#"
                className="text-xs text-slate-500 hover:text-primary uppercase tracking-widest font-bold"
              >
                Privacy Spell
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}