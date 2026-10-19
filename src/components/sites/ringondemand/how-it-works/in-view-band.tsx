"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type InViewBandProps = {
  className: string;
  /** Added while the band is on screen; the CSS hangs its animations off it. */
  activeClassName: string;
  children: ReactNode;
};

/**
 * The dark band's wrapper. It flags itself as in view once its top has
 * cleared the bottom 15% of the viewport, and drops the flag again when it
 * leaves, so the connector and pill animations only run while visible.
 */
export function InViewBand({ className, activeClassName, children }: InViewBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={inView ? `${className} ${activeClassName}` : className}>
      {children}
    </div>
  );
}
