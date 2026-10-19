"use client";

import { useLayoutEffect, useRef, useState, type RefObject } from "react";

import { ASSETS } from "./inbox-data";
import { InboxDemo } from "./inbox-demo";
import styles from "./unified-inbox.module.css";

/* The stage is a rigid box (window + glass ring) scaled to the band by a
   measured fitter. Desktop/tablet: width / 1328.934, capped at the 1152px
   design width (0.867) and floored at 0.58 — below that the right of the
   window is cropped by the wrapper. Phone (section ≤ 809px): the stage is the
   701.496px chat-column crop, scaled to fill the band exactly. */
const STAGE_W = 1328.934;
const STAGE_H = 730.467;
const PHONE_W = 701.496;
const PHONE_H = 732.748;
const MAX_SCALE = 1152 / STAGE_W;
const MIN_SCALE = 0.58;
const PHONE_MAX = 809;

type Fit = { scale: number; height: number };

function useStageFit(ref: RefObject<HTMLDivElement | null>): Fit {
  const [fit, setFit] = useState<Fit>({ scale: MAX_SCALE, height: STAGE_H * MAX_SCALE });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const width = el.clientWidth;
      if (!width) return;
      const outer = el.closest<HTMLElement>("[data-section]");
      if ((outer ? outer.clientWidth : width) <= PHONE_MAX) {
        const scale = width / PHONE_W;
        setFit({ scale, height: PHONE_H * scale });
        return;
      }
      const scale = Math.min(MAX_SCALE, Math.max(width / STAGE_W, MIN_SCALE));
      setFit({ scale, height: STAGE_H * scale });
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [ref]);

  return fit;
}

export function InboxStage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fit = useStageFit(wrapRef);

  return (
    <div className={styles.sky} data-ui-sky="">
      <img className={styles.skyImg} src={ASSETS.sky} alt="" aria-hidden="true" />
      <div ref={wrapRef} className={styles.stageWrap} style={{ height: `${fit.height}px` }}>
        <div className={styles.stage} style={{ transform: `scale(${fit.scale})` }}>
          <div className={styles.glass}>
            <div className={styles.crop}>
              <div className={styles.offset}>
                <InboxDemo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
