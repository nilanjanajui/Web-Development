import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background-dark font-display flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">

            {/* Background glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-150 h-150 rounded-full bg-primary/5 blur-3xl" />
            </div>

            {/* 404 Number */}
            <h1 className="text-[160px] md:text-[220px] font-black text-primary/10 leading-none select-none tracking-tighter">
                404
            </h1>

            {/* Icon */}
            <div className="relative -mt-16 mb-6 w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-5xl">
                    auto_fix_off
                </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-bold text-primary font-display italic mb-4">
                Spell Not Found
            </h2>

            {/* Subtitle */}
            <p className="text-slate-400 text-lg md:text-xl max-w-md mb-2">
                The page you're looking for has vanished — perhaps it was hit by a
                Vanishing Spell.
            </p>
            <p className="text-slate-600 text-sm italic mb-10">
                "It does not do to dwell on dreams and forget to live." — Albus Dumbledore
            </p>

            {/* Navigation Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
                <Link
                    to="/"
                    className="flex items-center gap-2 px-8 py-3 bg-primary text-background-dark rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                >
                    <span className="material-symbols-outlined text-sm">home</span>
                    Back to Home
                </Link>
                <Link
                    to="/characters"
                    className="flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary rounded-full font-bold text-sm uppercase tracking-widest hover:bg-primary/10 transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">groups</span>
                    Browse Characters
                </Link>
                <Link
                    to="/movies"
                    className="flex items-center gap-2 px-8 py-3 border border-primary/30 text-slate-400 rounded-full font-bold text-sm uppercase tracking-widest hover:text-primary hover:border-primary transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">movie</span>
                    View Movies
                </Link>
            </div>

            {/* Footer note */}
            <p className="mt-16 text-slate-700 text-xs uppercase tracking-widest">
                Wizarding World Explorer • Mischief Managed
            </p>
        </div>
    );
}