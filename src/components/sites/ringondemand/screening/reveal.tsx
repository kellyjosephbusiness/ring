"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

type RevealProps = ComponentPropsWithoutRef<"div">;

/**
 * Entrance trigger shared by the mid-page sections. A box that mounts below
 * the fold is marked `data-reveal="armed"`, then `"shown"` once its top edge
 * clears the lower 15% of the viewport; each section's CSS animates its own
 * children between those two states.
 *
 * Without the attribute the CSS renders the finished state, so server HTML,
 * boxes already on screen at mount and readers who prefer reduced motion all
 * get the static end frame, never a hidden one.
 */
export function Reveal(props: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    el.dataset.reveal = "armed";
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.dataset.reveal = "shown";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      delete el.dataset.reveal;
    };
  }, []);

  return <div ref={ref} {...props} />;
}
