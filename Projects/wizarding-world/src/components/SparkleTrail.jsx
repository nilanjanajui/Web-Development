import { useEffect, useRef, useCallback } from "react";

// ─── Sparkle shapes drawn on canvas ────────────────────────────────────────

const GOLD_PALETTE = [
    "#d4af35", // primary gold
    "#ffe87c", // bright gold
    "#fff8dc", // cream/white shimmer
    "#f5c842", // warm gold
    "#c8960c", // deep gold
];

/**
 * Draw a 4-pointed star centred at (0,0) with outer radius `r`.
 */
function drawStar(ctx, r) {
    const inner = r * 0.4;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const radius = i % 2 === 0 ? r : inner;
        const x = Math.cos(angle - Math.PI / 2) * radius;
        const y = Math.sin(angle - Math.PI / 2) * radius;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
}

/**
 * Draw a small diamond centred at (0,0) with half-size `r`.
 */
function drawDiamond(ctx, r) {
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.lineTo(r * 0.5, 0);
    ctx.lineTo(0, r);
    ctx.lineTo(-r * 0.5, 0);
    ctx.closePath();
}

/**
 * Draw a sparkle cross (two thin elongated diamonds at 45° to each other).
 */
function drawCross(ctx, r) {
    const w = r * 0.15;
    ctx.beginPath();
    ctx.ellipse(0, 0, w, r, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, 0, r, w, 0, 0, Math.PI * 2);
}

const SHAPES = ["star", "diamond", "cross", "circle"];

// ─── Particle class ─────────────────────────────────────────────────────────

class Sparkle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // Drift outward from cursor
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 1.6;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 1.2; // slight upward bias
        this.gravity = 0.04;
        this.size = 3 + Math.random() * 7;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.18;
        this.alpha = 1;
        this.decay = 0.018 + Math.random() * 0.024;
        this.color = GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)];
        this.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        // Glow toggle: ~40 % get a soft glow
        this.glow = Math.random() < 0.4;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.rotation += this.rotationSpeed;
        this.alpha -= this.decay;
    }

    draw(ctx) {
        if (this.alpha <= 0) return;

        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        if (this.glow) {
            ctx.shadowBlur = this.size * 2.5;
            ctx.shadowColor = "#ffe87c";
        }

        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 0.5;

        switch (this.shape) {
            case "star":
                drawStar(ctx, this.size);
                ctx.fill();
                break;
            case "diamond":
                drawDiamond(ctx, this.size);
                ctx.fill();
                break;
            case "cross":
                drawCross(ctx, this.size);
                ctx.fill();
                break;
            case "circle":
            default:
                ctx.beginPath();
                ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
                ctx.fill();
                break;
        }

        ctx.restore();
    }

    isDead() {
        return this.alpha <= 0;
    }
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * SparkleTrail
 *
 * Drop this anywhere in the tree (ideally near the root) and a full-screen
 * canvas will sit on top of everything, rendering a golden sparkle trail
 * that follows the user's cursor.
 *
 * Props
 * ─────
 * @param {number}  [spawnRate=3]     Sparkles created per mousemove event
 * @param {boolean} [enabled=true]    Toggle the effect on/off
 */
export default function SparkleTrail({ spawnRate = 3, enabled = true }) {
    const canvasRef = useRef(null);
    const sparklesRef = useRef([]);
    const rafRef = useRef(null);
    const lastSpawnRef = useRef(0); // throttle by time (ms)

    // ── Resize canvas to fill the viewport ──────────────────────────────────
    const resize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, []);

    // ── Animation loop ────────────────────────────────────────────────────────
    // Stored in a ref so the rAF callback can reference itself without
    // triggering the react-hooks/immutability temporal-dead-zone error.
    const animateRef = useRef(null);
    
    useEffect(() => {
        animateRef.current = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            sparklesRef.current = sparklesRef.current.filter((s) => {
                s.update();
                s.draw(ctx);
                return !s.isDead();
            });

            rafRef.current = requestAnimationFrame(animateRef.current);
        };
    }, []);

    // ── Mouse handler ────────────────────────────────────────────────────────
    const handleMouseMove = useCallback(
        (e) => {
            if (!enabled) return;

            const now = performance.now();
            // Throttle: spawn at most once every ~16 ms regardless of event rate
            if (now - lastSpawnRef.current < 16) return;
            lastSpawnRef.current = now;

            for (let i = 0; i < spawnRate; i++) {
                sparklesRef.current.push(new Sparkle(e.clientX, e.clientY));
            }
        },
        [enabled, spawnRate]
    );

    // ── Lifecycle ────────────────────────────────────────────────────────────
    useEffect(() => {
        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        rafRef.current = requestAnimationFrame(animateRef.current);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [resize, handleMouseMove]);

    if (!enabled) return null;

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: "fixed",
                inset: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none", // never blocks clicks / hovers
                zIndex: 9999,
            }}
        />
    );
}