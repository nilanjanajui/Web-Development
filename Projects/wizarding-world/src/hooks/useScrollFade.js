import { useEffect, useRef } from "react";

/**
 * useScrollFade
 *
 * Wires IntersectionObserver to every .scroll-fade element inside
 * the given container ref (defaults to document if no ref is passed).
 *
 * Usage — basic (watches the whole page):
 *   useScrollFade();
 *
 * Usage — scoped to a container:
 *   const ref = useRef(null);
 *   useScrollFade(ref);
 *   return <section ref={ref}>...</section>;
 *
 * Mark elements in JSX with:
 *   <div className="scroll-fade">...</div>
 *   <div className="scroll-fade scroll-fade--delay-1">...</div>  ← staggered
 *   <div className="scroll-fade scroll-fade--delay-2">...</div>
 *   <div className="scroll-fade scroll-fade--delay-3">...</div>
 *
 * The CSS for those classes already lives in index.css — this hook
 * just toggles .scroll-fade--visible on/off as elements enter/leave
 * the viewport.
 *
 * @param {React.RefObject} [containerRef] - optional scoping ref
 * @param {object} [options]
 * @param {number} [options.threshold=0.15]  - 0–1, how much of the element must be visible
 * @param {string} [options.rootMargin="0px"] - IntersectionObserver rootMargin
 * @param {boolean} [options.once=true]       - if true, fade in once and never reverse
 */
export default function useScrollFade(containerRef, options = {}) {
    const { threshold = 0.15, rootMargin = "0px", once = true } = options;

    // Keep a stable ref to the observer so we can disconnect on cleanup.
    const observerRef = useRef(null);

    useEffect(() => {
        const root = containerRef?.current ?? document;

        // Grab every .scroll-fade inside this root.
        const elements = root.querySelectorAll(".scroll-fade");
        if (!elements.length) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("scroll-fade--visible");
                        // Once the element has faded in, stop watching it.
                        if (once) observerRef.current.unobserve(entry.target);
                    } else if (!once) {
                        // Reverse the animation when scrolling back up.
                        entry.target.classList.remove("scroll-fade--visible");
                    }
                });
            },
            { threshold, rootMargin }
        );

        elements.forEach((el) => observerRef.current.observe(el));

        return () => observerRef.current?.disconnect();
        // Re-run if the container ref's current value changes (e.g. after lazy load).
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef?.current, threshold, rootMargin, once]);
}