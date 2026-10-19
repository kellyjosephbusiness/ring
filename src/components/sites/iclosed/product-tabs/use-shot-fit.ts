"use client";

import { useEffect, type RefObject } from "react";

/**
 * Scales the panel's fixed-size shot (`[data-shot]`, else its first child) down
 * to the panel's content width and writes the panel's height to match, so the
 * desktop composition shrinks as a whole instead of reflowing. When the panel
 * is taller than the scaled shot (the phone min-height), the shot is centred
 * vertically. A shot may force its own scale / x-offset through the
 * `--shot-scale` / `--shot-tx` custom properties. Re-runs whenever `panelKey`
 * changes (a new panel mounted) and on every resize.
 */
export function useShotFit(panelRef: RefObject<HTMLElement | null>, panelKey: unknown) {
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const fit = () => {
      const shot =
        panel.querySelector<HTMLElement>("[data-shot]") ??
        (panel.firstElementChild as HTMLElement | null);
      if (!shot) return;
      const panelStyle = getComputedStyle(panel);
      const available =
        panel.clientWidth - parseFloat(panelStyle.paddingLeft) - parseFloat(panelStyle.paddingRight);
      const width = shot.offsetWidth;
      const height = shot.offsetHeight;
      if (!available || !width || !height) return;

      const shotStyle = getComputedStyle(shot);
      const forced = parseFloat(shotStyle.getPropertyValue("--shot-scale"));
      const tx = shotStyle.getPropertyValue("--shot-tx").trim() || "0px";
      const scale = Number.isFinite(forced) && forced > 0 ? forced : Math.min(1, available / width);

      if (scale === 1) {
        shot.style.transform = "";
        panel.style.height = "";
      } else {
        shot.style.transformOrigin = "top center";
        shot.style.transform = `translateX(${tx}) scale(${scale})`;
        panel.style.height = `${Math.round(height * scale)}px`;
      }

      const slack = scale === 1 ? 0 : panel.clientHeight - height * scale;
      if (slack > 1) {
        shot.style.transformOrigin = "top center";
        shot.style.transform = `translate(${tx}, ${Math.round(slack / 2)}px) scale(${scale})`;
      }
    };

    fit();
    window.addEventListener("resize", fit);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(fit) : null;
    ro?.observe(panel);
    return () => {
      window.removeEventListener("resize", fit);
      ro?.disconnect();
    };
  }, [panelRef, panelKey]);
}
