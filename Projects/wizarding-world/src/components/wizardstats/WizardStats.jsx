import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import useScrollFade from "../../hooks/useScrollFade";

const HOUSE_DEFS = [
  { name: "Gryffindor", key: "gryffindor", cls: "chart-gradient-gryffindor" },
  { name: "Slytherin",  key: "slytherin",  cls: "chart-gradient-slytherin"  },
  { name: "Hufflepuff", key: "hufflepuff", cls: "chart-gradient-hufflepuff" },
  { name: "Ravenclaw",  key: "ravenclaw",  cls: "chart-gradient-ravenclaw"  },
];

const ANCESTRY_DEFS = {
  "pure-blood":    { label: "Pure-Blood",  color: "#d4af35" },
  "half-blood":    { label: "Half-Blood",  color: "#8b9e5a" },
  "muggle-born":   { label: "Muggle-Born", color: "#5a8a9e" },
  "muggle":        { label: "Muggle",      color: "#7a6a9a" },
  "squib":         { label: "Squib",       color: "#9a6a4a" },
  "half-giant":    { label: "Half-Giant",  color: "#6a8a7a" },
  "quarter-veela": { label: "¼-Veela",     color: "#9a5a7a" },
};

function normalizeAncestry(raw) {
  if (!raw) return null;
  const lower = raw.toLowerCase().trim();
  return ANCESTRY_DEFS[lower] ? lower : null;
}

// ── SVG Bar Chart ─────────────────────────────────────────────────────────────
function AncestryBarChart({ data }) {
  const [hovered, setHovered] = useState(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  const W = 760, H = 280;
  const PAD = { top: 32, right: 16, bottom: 60, left: 48 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const yMax = Math.ceil(maxCount / 5) * 5 || 10;
  const yTicks = 5;
  const gap = chartW / data.length;
  const barW = Math.min(70, gap * 0.58);

  const bx = (i) => PAD.left + gap * i + gap / 2 - barW / 2;
  const bh = (c) => (c / yMax) * chartH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ overflow: "visible" }}>
      <defs>
        {data.map(({ key, color }) => (
          <linearGradient key={key} id={`ag-${key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={color} stopOpacity="0.9"  />
            <stop offset="100%" stopColor={color} stopOpacity="0.35" />
          </linearGradient>
        ))}
      </defs>

      {Array.from({ length: yTicks + 1 }, (_, i) => {
        const val = Math.round((yMax / yTicks) * i);
        const y = PAD.top + chartH - (val / yMax) * chartH;
        return (
          <g key={i}>
            <line
              x1={PAD.left} y1={y} x2={PAD.left + chartW} y2={y}
              stroke="#334155" strokeWidth={i === 0 ? 1 : 0.5}
              strokeDasharray={i === 0 ? "none" : "4 3"}
            />
            <text
              x={PAD.left - 8} y={y}
              textAnchor="end" dominantBaseline="central"
              fill="#475569" fontSize="11" fontFamily="serif"
            >
              {val}
            </text>
          </g>
        );
      })}

      {data.map(({ key, label, color, count }, i) => {
        const x = bx(i);
        const h = animated ? bh(count) : 0;
        const y = PAD.top + chartH - h;
        const cx = x + barW / 2;
        const isHov = hovered === key;

        return (
          <g
            key={key}
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "default" }}
          >
            {isHov && (
              <rect
                x={x - 4} y={y - 4}
                width={barW + 8} height={h + 4}
                rx="6" fill={color} opacity="0.12"
              />
            )}
            <rect
              x={x} y={y} width={barW} height={h} rx="4"
              fill={`url(#ag-${key})`}
              stroke={color} strokeWidth={isHov ? 1.5 : 0.5} strokeOpacity="0.6"
              style={{ transition: "height 0.75s cubic-bezier(0.34,1.3,0.64,1), y 0.75s cubic-bezier(0.34,1.3,0.64,1)" }}
            />
            {animated && (
              <text
                x={cx} y={y - 7}
                textAnchor="middle"
                fill={isHov ? color : "#64748b"}
                fontSize="12" fontWeight="700" fontFamily="serif"
                style={{ transition: "fill 0.2s" }}
              >
                {count}
              </text>
            )}
            <text
              x={cx} y={PAD.top + chartH + 18}
              textAnchor="middle"
              fill={isHov ? color : "#64748b"}
              fontSize="11" fontWeight="600" fontFamily="serif"
              style={{ transition: "fill 0.2s" }}
            >
              {label}
            </text>
            {isHov && (
              <g>
                <rect
                  x={cx - 46} y={y - 38}
                  width="92" height="26" rx="5"
                  fill="#0f172a" stroke={color} strokeWidth="1" strokeOpacity="0.6"
                />
                <text
                  x={cx} y={y - 21}
                  textAnchor="middle" dominantBaseline="central"
                  fill={color} fontSize="12" fontWeight="700" fontFamily="serif"
                >
                  {label}: {count}
                </text>
              </g>
            )}
          </g>
        );
      })}

      <text
        x={14} y={PAD.top + chartH / 2}
        textAnchor="middle"
        fill="#475569" fontSize="11" fontFamily="serif"
        transform={`rotate(-90, 14, ${PAD.top + chartH / 2})`}
      >
        Characters
      </text>
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function WizardStats() {
  const [characters, setCharacters] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [retryKey,   setRetryKey]   = useState(0);

  const pageRef = useRef(null);
  useScrollFade(pageRef);

  const retry = useCallback(() => {
    setError(null);
    setLoading(true);
    setRetryKey((k) => k + 1);
  }, []);

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((r) => {
        if (!r.ok) throw new Error(`HP API error: ${r.status}`);
        return r.json();
      })
      .then(setCharacters)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [retryKey]);

  const stats = useMemo(() => {
    if (!characters.length)
      return { total: 0, alive: 0, deceased: 0, alivePercent: 0, withPatronus: 0 };
    const alive = characters.filter((c) => c.alive).length;
    const deceased = characters.length - alive;
    return {
      total: characters.length,
      alive,
      deceased,
      alivePercent: Math.round((alive / characters.length) * 100),
      withPatronus: characters.filter((c) => c.patronus).length,
    };
  }, [characters]);

  const houseChart = useMemo(() => {
    const counts = HOUSE_DEFS.map(({ name, key, cls }) => ({
      name, cls,
      count: characters.filter((c) => c.house?.toLowerCase() === key).length,
    }));
    const max = Math.max(...counts.map((h) => h.count), 1);
    return counts.map((h) => ({ ...h, pct: `${Math.round((h.count / max) * 100)}%` }));
  }, [characters]);

  const ancestryChart = useMemo(() => {
    const tally = {};
    characters.forEach((c) => {
      const key = normalizeAncestry(c.ancestry);
      if (key) tally[key] = (tally[key] || 0) + 1;
    });
    return Object.entries(tally)
      .sort((a, b) => b[1] - a[1])
      .map(([key, count]) => ({ key, count, ...ANCESTRY_DEFS[key] }));
  }, [characters]);

  const CIRCUMFERENCE = 502;
  const aliveArc = (stats.alivePercent / 100) * CIRCUMFERENCE;

  return (
    <div ref={pageRef} className="bg-background-dark text-slate-100 min-h-screen font-display">
      <div className="flex h-full grow flex-col">
        <main className="flex-1 flex flex-col p-6 lg:px-20 lg:py-10">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">analytics</span>
                <span className="uppercase tracking-widest text-xs font-bold">Arcane Analytics</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] uppercase">
                WIZARD STATS
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl">
                A comprehensive demographic study of the magical community — from Hogwarts
                house distributions to ancestry within Ministry records.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-primary text-background-dark px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity self-start"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              Export PDF
            </button>
          </div>

          {/* ── Error State ─────────────────────────────────────────────────── */}
          {error && (
            <div className="flex flex-col items-center justify-center gap-6 py-28 text-center rounded-xl border border-red-500/20 bg-red-500/5">
              <span className="material-symbols-outlined text-7xl text-red-500/50">
                crisis_alert
              </span>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-slate-200">
                  Ministry archives are unreachable
                </h2>
                <p className="text-slate-500 text-sm max-w-sm">
                  {error}
                </p>
              </div>
              <button
                onClick={retry}
                className="group flex items-center gap-2 bg-primary/10 border border-primary text-primary px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary hover:text-background-dark transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform duration-500">
                  refresh
                </span>
                Retry
              </button>
            </div>
          )}

          {/* ── Content (hidden when error) ──────────────────────────────────── */}
          {!error && (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  { label: "Total Characters", value: stats.total,        icon: "groups",       sub: "From HP API records",    subColor: "text-emerald-400", subIcon: "trending_up" },
                  { label: "Known Patronuses", value: stats.withPatronus, icon: "auto_fix_high", sub: "From Ministry records",  subColor: "text-slate-400",   subIcon: "remove"      },
                  { label: "Recorded Deaths",  value: stats.deceased,     icon: "crisis_alert",  sub: "Post-War verification",  subColor: "text-rose-400",    subIcon: "warning"     },
                ].map(({ label, value, icon, sub, subColor, subIcon }) => (
                  <div key={label} className="flex flex-col gap-2 rounded-xl p-6 border border-primary/20 bg-primary/5">
                    <div className="flex items-center justify-between">
                      <p className="text-slate-400 text-base font-medium">{label}</p>
                      <span className="material-symbols-outlined text-primary">{icon}</span>
                    </div>
                    <p className="text-slate-100 text-4xl font-bold">{loading ? "..." : value}</p>
                    <div className={`flex items-center gap-1 ${subColor} text-xs font-bold`}>
                      <span className="material-symbols-outlined text-xs">{subIcon}</span>
                      <span>{sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                {/* House Bar Chart */}
                <div className="flex flex-col gap-6 p-8 rounded-xl border border-primary/10 bg-slate-900/40">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-slate-100 text-xl font-bold">Characters Per House</h3>
                      <p className="text-slate-400 text-sm">Hogwarts enrollment distribution</p>
                    </div>
                    <span className="material-symbols-outlined text-primary/50">bar_chart</span>
                  </div>
                  <div className="flex flex-col gap-6 min-h-75 justify-end pt-10">
                    <div className="grid grid-cols-4 gap-4 items-end h-60">
                      {houseChart.map(({ name, cls, count, pct }) => (
                        <div key={name} className="group relative flex flex-col items-center gap-3 h-full justify-end">
                          <div className="absolute -top-6 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            {loading ? "..." : count}
                          </div>
                          <div
                            className={`${cls} w-full rounded-t-lg transition-all duration-500 hover:brightness-110`}
                            style={{ height: loading ? "0%" : pct }}
                          />
                          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">{name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Donut Chart */}
                <div className="flex flex-col gap-6 p-8 rounded-xl border border-primary/10 bg-slate-900/40">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-slate-100 text-xl font-bold">Vital Status Ratio</h3>
                      <p className="text-slate-400 text-sm">Alive vs Deceased population</p>
                    </div>
                    <span className="material-symbols-outlined text-primary/50">pie_chart</span>
                  </div>
                  <div className="flex flex-1 items-center justify-center relative min-h-75">
                    <div className="relative flex items-center justify-center">
                      <svg width="200" height="200" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="80" fill="none" stroke="#1e293b" strokeWidth="20" />
                        <circle
                          cx="100" cy="100" r="80" fill="none"
                          stroke="#d4af35" strokeWidth="20" strokeLinecap="round"
                          strokeDasharray={`${loading ? 0 : aliveArc} ${CIRCUMFERENCE}`}
                          transform="rotate(-90 100 100)"
                          style={{ transition: "stroke-dasharray 1s ease" }}
                        />
                      </svg>
                      <div className="absolute text-center">
                        <p className="text-4xl font-bold text-slate-100">
                          {loading ? "..." : `${stats.alivePercent}%`}
                        </p>
                        <p className="text-xs font-bold uppercase text-primary">Alive</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-primary" />
                        <span className="text-sm text-slate-300">Alive ({loading ? "..." : stats.alive})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-slate-700" />
                        <span className="text-sm text-slate-300">Deceased ({loading ? "..." : stats.deceased})</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ancestry Bar Chart — full width */}
                <div className="xl:col-span-2 flex flex-col gap-6 p-8 rounded-xl border border-primary/10 bg-slate-900/40">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-slate-100 text-xl font-bold">Ancestry Breakdown</h3>
                      <p className="text-slate-400 text-sm">
                        Bloodline distribution across the wizarding community
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-primary/50">account_tree</span>
                  </div>

                  {loading ? (
                    <div className="flex items-end gap-4 h-60 pt-8">
                      {[65, 90, 40, 30, 20, 15, 10].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-lg bg-primary/10 animate-pulse"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  ) : ancestryChart.length === 0 ? (
                    <p className="text-slate-500 italic text-sm">No ancestry data available.</p>
                  ) : (
                    <>
                      <AncestryBarChart data={ancestryChart} />
                      <p className="text-slate-600 text-[11px] italic -mt-2">
                        * Only characters with recorded ancestry are shown. Many have no ancestry data in the HP API.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 p-8 rounded-xl bg-primary text-background-dark flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold">Deep Dive into Magical History</h2>
                  <p className="font-medium opacity-80">Access the Restricted Section for detailed character genealogies.</p>
                </div>
                <Link
                  to="/characters"
                  className="relative z-10 bg-background-dark text-primary px-8 py-3 rounded-lg font-bold hover:bg-slate-900 transition-colors"
                >
                  Unlock Archives
                </Link>
                <span className="material-symbols-outlined absolute -right-5 -bottom-5 text-[180px] opacity-10 rotate-12 pointer-events-none">
                  local_library
                </span>
              </div>
            </>
          )}
        </main>

        <footer className="border-t border-primary/10 py-10 lg:px-20 text-center">
          <p className="text-slate-500 text-sm">
            © 2026 PotterExplorer Project. Data sourced from the Ministry of Magic archives.
          </p>
        </footer>
      </div>
    </div>
  );
}