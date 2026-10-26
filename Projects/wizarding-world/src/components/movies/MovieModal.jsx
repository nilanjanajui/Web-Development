import { useEffect } from "react";
import { MOVIE_SUPPLEMENT } from "../../data/movieData";
import hermione from "../../assets/hermoine.jpg";
import dumbledore from "../../assets/dumbledore.jpg";
import sirius from "../../assets/sirius.jpeg";

// Real character images from HP API ImageKit CDN
const CHAR_AVATARS = [
  {
    name: "Harry Potter",
    short: "Harry P.",
    img: "https://ik.imagekit.io/hpapi/harry.jpg",
  },
  {
    name: "Hermione Granger",
    short: "Hermione G.",
    img: hermione,
  },
  {
    name: "Ron Weasley",
    short: "Ron W.",
    img: "https://ik.imagekit.io/hpapi/ron.jpg",
  },
  {
    name: "Albus Dumbledore",
    short: "Dumbledore",
    img: dumbledore,
  },
  {
    name: "Severus Snape",
    short: "Snape",
    img: "https://ik.imagekit.io/hpapi/snape.jpg",
  },
  {
    name: "Sirius Black",
    short: "Sirius B.",
    img: sirius,
  },
];

// Which characters appear in which movie (by id)
const MOVIE_CHARS = {
  1: ["Harry Potter", "Hermione Granger", "Ron Weasley", "Albus Dumbledore"],
  2: ["Harry Potter", "Hermione Granger", "Ron Weasley", "Albus Dumbledore"],
  3: ["Harry Potter", "Hermione Granger", "Ron Weasley", "Sirius Black"],
  4: ["Harry Potter", "Hermione Granger", "Ron Weasley", "Albus Dumbledore"],
  5: ["Harry Potter", "Hermione Granger", "Ron Weasley", "Sirius Black"],
  6: ["Harry Potter", "Hermione Granger", "Ron Weasley", "Severus Snape"],
  7: ["Harry Potter", "Hermione Granger", "Ron Weasley", "Severus Snape"],
  8: ["Harry Potter", "Hermione Granger", "Ron Weasley", "Severus Snape"],
};

export default function MovieModal({ movie, onClose }) {
  const supp = MOVIE_SUPPLEMENT[movie?.id] || {};
  const movieCharsNames = MOVIE_CHARS[movie?.id] || MOVIE_CHARS[1];
  const movieChars = CHAR_AVATARS.filter((c) =>
    movieCharsNames.includes(c.name)
  );

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!movie) return null;

  const handleTrailer = () => {
    if (supp.trailer) {
      window.open(supp.trailer, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl bg-background-dark border border-primary/20 flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background-dark/80 text-white hover:bg-primary/20 transition-colors border border-primary/20"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Hero Image */}
        {/* Hero Image */}
        <div className="relative w-full shrink-0 overflow-hidden rounded-t-xl">
          <div className="absolute inset-0 bg-linear-to-t from-background-dark via-background-dark/20 to-transparent z-10" />

          {movie.image ? (
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full object-contain max-h-125 bg-background-dark"
            />
          ) : (
            <div className="w-full h-64 bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-8xl opacity-30">movie</span>
            </div>
          )}

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20 w-full bg-linear-to-t from-background-dark to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary text-background-dark px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                Wizarding World
              </span>
              <div className="flex items-center text-primary gap-1">
                <span className="material-symbols-outlined text-sm filled-icon">star</span>
                <span className="text-sm font-bold">4.8</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-slate-100 tracking-tight leading-tight">
              {movie.title}
            </h1>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-10 space-y-8">
          {/* Meta Info & CTA */}
          <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-primary/10">
            <div className="flex flex-wrap gap-6 text-sm text-primary/80">
              {[
                { label: "Release", value: movie.releaseYear },
                { label: "Director", value: supp.director },
                { label: "Runtime", value: supp.runtime },
                { label: "Rating", value: supp.rating },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col">
                  <span className="uppercase text-[10px] tracking-widest opacity-60">
                    {label}
                  </span>
                  <span className="text-slate-100 font-medium">
                    {value || "—"}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              {/* Trailer Button */}
              <button
                onClick={handleTrailer}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-background-dark px-6 py-3 rounded-lg font-bold transition-all hover:scale-[1.02] shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined filled-icon">
                  play_circle
                </span>
                Watch Trailer
              </button>

              {/* Bookmark */}
              <button className="p-3 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined">bookmark</span>
              </button>
            </div>
          </div>

          {/* Synopsis */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">auto_stories</span>
              The Story
            </h3>
            <p className="text-slate-300 leading-relaxed text-lg italic border-l-2 border-primary/30 pl-4">
              "{supp.synopsis}"
            </p>
          </div>

          {/* Key Characters */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">groups</span>
              Key Characters
            </h3>
            <div className="flex flex-wrap gap-6">
              {movieChars.map(({ name, short, img }) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-2 group cursor-default"
                >
                  <div className="size-16 rounded-full border-2 border-primary/40 group-hover:border-primary transition-all overflow-hidden p-0.5 shadow-lg group-hover:shadow-primary/20">
                    <img
                      src={img}
                      alt={name}
                      className="w-full h-full rounded-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="hidden w-full h-full rounded-full bg-primary/10 items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-xl">
                        person
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-primary transition-colors text-center">
                    {short}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Audience Score */}
          <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-slate-100">
                Wizard Audience Score
              </span>
              <div className="flex items-center gap-0.5 text-primary">
                {[...Array(4)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined filled-icon text-lg"
                  >
                    star
                  </span>
                ))}
                <span className="material-symbols-outlined text-lg">star</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-3 bg-primary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: "92%" }}
                />
              </div>
              <span className="text-sm font-bold text-primary whitespace-nowrap">
                92% Positive
              </span>
            </div>
          </div>

          {/* Trailer CTA Banner */}
          {supp.trailer && (
            <div
              onClick={handleTrailer}
              className="flex items-center justify-between gap-4 p-5 rounded-xl bg-linear-to-r from-secondary/40 to-primary/10 border border-primary/20 cursor-pointer hover:border-primary/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined filled-icon text-background-dark text-2xl">
                    play_arrow
                  </span>
                </div>
                <div>
                  <p className="text-slate-100 font-bold">
                    Watch Official Trailer
                  </p>
                  <p className="text-slate-400 text-sm">
                    Opens on YouTube in a new tab
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                open_in_new
              </span>
            </div>
          )}
        </div>

        {/* Bottom Accent */}
        <div className="h-1 bg-linear-to-r from-secondary via-primary to-secondary opacity-60 shrink-0" />
      </div>
    </div>
  );
}