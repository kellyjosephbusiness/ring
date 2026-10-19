"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

import { BOOKING_EVENTS, ICLOSED_WIDGET_SCRIPT, type BookingEvent } from "../links";
import styles from "./final-cta.module.css";

/**
 * iClosed's inline scheduler for one booking event (the discovery call by
 * default).
 *
 * iClosed's script turns every `.iclosed-widget` box into its booking iframe
 * and keeps watching the DOM (and history changes), so a box that mounts
 * later is picked up without loading the script again. The box mounts once
 * the section is within 1200px of the viewport, so pages don't load the
 * scheduler for readers who never scroll near it; a "Book a call" jump lands
 * inside that margin and mounts it straight away.
 */
export function BookingWidget({ event = BOOKING_EVENTS.discovery }: { event?: BookingEvent }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.booking}>
      <div ref={ref} className={styles.widgetFrame}>
        <p className={styles.widgetLoading}>Loading the calendar…</p>
        {near ? (
          <>
            {/* Keyed by event: iClosed marks a box processed, so a different
                event needs a fresh box. */}
            <div
              key={event.url}
              className={`iclosed-widget ${styles.widget}`}
              data-url={event.url}
              title={event.title}
            />
            <Script src={ICLOSED_WIDGET_SCRIPT} strategy="afterInteractive" />
          </>
        ) : (
          <div className={styles.widgetPlaceholder} />
        )}
      </div>
      <p className={styles.widgetFallback}>
        Calendar not loading?{" "}
        <a href={event.url} target="_blank" rel="noopener noreferrer">
          Open the booking page
        </a>
      </p>
    </div>
  );
}
