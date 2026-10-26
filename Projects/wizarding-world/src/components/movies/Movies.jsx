import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MovieModal from "./MovieModal";
import useScrollFade from "../../hooks/useScrollFade";

const MOVIE_EXTRA = {
  1: { director: "Chris Columbus", runtime: "2h 32m", rating: "PG", synopsis: "Harry Potter discovers he is a wizard and joins Hogwarts School of Witchcraft and Wizardry, where he uncovers the mystery of the Philosopher's Stone." },
  2: { director: "Chris Columbus", runtime: "2h 41m", rating: "PG", synopsis: "Harry returns to Hogwarts where students are being petrified by a monster hiding inside the Chamber of Secrets." },
  3: { director: "Alfonso Cuarón", runtime: "2h 22m", rating: "PG", synopsis: "Harry, Ron, and Hermione investigate the mystery of a dangerous escaped prisoner while confronting chilling Dementors." },
  4: { director: "Mike Newell", runtime: "2h 37m", rating: "PG", synopsis: "Harry is mysteriously entered into the dangerous Triwizard Tournament while Voldemort's followers plot his downfall." },
  5: { director: "David Yates", runtime: "2h 18m", rating: "PG-13", synopsis: "Harry forms Dumbledore's Army as the Ministry of Magic refuses to believe Voldemort has returned." },
  6: { director: "David Yates", runtime: "2h 33m", rating: "PG", synopsis: "Harry and Dumbledore investigate Voldemort's past while the Half-Blood Prince's potions book reveals dark secrets." },
  7: { director: "David Yates", runtime: "2h 26m", rating: "PG-13", synopsis: "Harry, Ron, and Hermione go on the run to destroy Voldemort's Horcruxes as Death Eaters tighten their grip." },
  8: { director: "David Yates", runtime: "2h 10m", rating: "PG-13", synopsis: "The epic finale. Harry faces Voldemort in the ultimate battle for Hogwarts and the wizarding world." },
};

export default function Movies() {
  const pageRef = useRef(null);
  useScrollFade(pageRef);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://api.potterdb.com/v1/movies")
      .then((r) => r.json())
      .then((data) => {
        const sorted = data.data
          .sort((a, b) => a.attributes.release_date?.localeCompare(b.attributes.release_date))
          .map((m, idx) => {
            const num = idx + 1;
            return {
              id: num,
              title: m.attributes.title,
              releaseYear: m.attributes.release_date?.split("-")[0],
              image: m.attributes.poster,
              ...MOVIE_EXTRA[num],
            };
          });
        setMovies(sorted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div ref={pageRef} className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">

      <main className="flex-1 flex flex-col px-6 md:px-20 py-10 max-w-360 mx-auto w-full">

        {/* Header */}
        <section className="mb-12 scroll-fade">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary/80 mb-2">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span className="text-xs font-bold uppercase tracking-widest">The Cinematic Journey</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter italic uppercase text-slate-900 dark:text-slate-100">
              MOVIES
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
              Explore the legendary films of the Wizarding World, from the boy who lived to the final battle for Hogwarts.
            </p>
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4 text-primary">
              <span className="material-symbols-outlined text-5xl animate-spin">autorenew</span>
              <p className="text-lg font-medium">Summoning the films...</p>
            </div>
          </div>
        )}

        {/* Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 scroll-fade scroll-fade--delay-1">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="group flex flex-col gap-4 bg-primary/5 p-4 rounded-xl border border-primary/10 hover:border-primary/40 transition-all"
              >
                <div className="relative overflow-hidden rounded-lg aspect-3/4">
                  {movie.image ? (
                    <img
                      src={movie.image}
                      alt={movie.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-6xl">movie</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-background-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-primary text-xs font-bold tracking-widest uppercase italic">
                      Released {movie.releaseYear}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {movie.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    Directed by {movie.director}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedMovie(movie)}
                  className="mt-2 w-full py-3 bg-primary/20 hover:bg-primary text-primary hover:text-background-dark font-bold text-sm rounded transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">movie</span>
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/10 px-6 md:px-20 py-12 bg-background-light dark:bg-background-dark/80 mt-20 scroll-fade scroll-fade--delay-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 text-primary/60">
            <span className="material-symbols-outlined">bolt</span>
            <h2 className="text-lg font-bold uppercase tracking-tight">Wizarding World</h2>
          </div>
          <div className="flex gap-8 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="text-slate-500 text-xs">© 2024 Wizarding World Explorer.</div>
        </div>
      </footer>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}