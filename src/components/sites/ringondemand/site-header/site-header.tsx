"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { flushSync } from "react-dom";
import Link from "next/link";

import { BOOK_CALL_TARGET, BOOK_CALL_URL } from "../links";
import { BOOK_CALL_LABEL, NAV_LINKS } from "./site-header.data";
import styles from "./site-header.module.css";

const PHONE_QUERY = "(max-width: 809.98px)";

const BOOK_CALL_LINK = {
  href: BOOK_CALL_URL,
  target: BOOK_CALL_TARGET,
  rel: BOOK_CALL_TARGET ? "noopener" : undefined,
};

/** Framer's scroll-direction effect: a run of scroll events in one direction
 * that moves at least 4px from where the direction last changed hides the
 * header (down) or brings it back (up). The page starts out "scrolling down"
 * from the top, so the very first downward scroll already hides it. */
function useHideOnScrollDown() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previous: number | undefined;
    let anchor = 0;
    let direction: "up" | "down" = "down";

    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (y > max || y < 0) return;
      const next = y < (previous ?? 0) ? "up" : "down";
      previous = y;
      if (next !== direction) {
        direction = next;
        anchor = y;
        return;
      }
      if (Math.abs(y - anchor) < 4) return;
      setHidden(next === "down");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}

function useMediaQuery(query: string, onChange: (matches: boolean) => void) {
  const callback = useRef(onChange);
  useLayoutEffect(() => {
    callback.current = onChange;
  });
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => callback.current(event.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
}

function MenuIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M 4 8 L 20 8 M 4 16 L 20 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M 18 6 L 6 18 M 6 6 L 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Wordmark() {
  return (
    <Link className={styles.wordmark} href="/" aria-label="RingOnDemand home">
      RingOnDemand
    </Link>
  );
}

function BookCallButton({ className }: { className: string }) {
  return (
    <a className={`${styles.bookBtn} ${className}`} {...BOOK_CALL_LINK}>
      <span>{BOOK_CALL_LABEL}</span>
    </a>
  );
}

function DesktopNav() {
  return (
    <nav className={styles.deskNav} aria-label="Main">
      <div className={styles.row}>
        <div className={styles.logoWrap}>
          <Wordmark />
        </div>
        <div className={styles.links}>
          {NAV_LINKS.map((link) => (
            <div key={link.href} className={styles.linkCell}>
              <a className={styles.textLink} href={link.href}>
                {link.label}
              </a>
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <BookCallButton className={styles.bookDesktop} />
        </div>
      </div>
      <div className={styles.strokeBot} aria-hidden="true" />
    </nav>
  );
}

function MobileNav({ open, onOpen, onClose }: { open: boolean; onOpen: () => void; onClose: () => void }) {
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(open);
  /** Closing from a link hands focus to the page the link jumps to, not
   * back to the hamburger. */
  const restoreFocus = useRef(true);

  useEffect(() => {
    if (open === wasOpen.current) return;
    wasOpen.current = open;
    if (open) closeButton.current?.focus();
    else if (restoreFocus.current) openButton.current?.focus({ preventScroll: true });
    restoreFocus.current = true;
  }, [open]);

  // Lock page scroll while the menu is open. A layout effect, so a link that
  // closes the menu with flushSync has scrolling back before it jumps.
  useLayoutEffect(() => {
    if (!open) return;
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /** Close the menu (and unlock scrolling) first, then follow the link. */
  const onLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href") ?? "";
    if (!href.startsWith("#") || href.length < 2) {
      onClose();
      return;
    }
    event.preventDefault();
    restoreFocus.current = false;
    flushSync(onClose);
    if (window.location.hash === href) {
      document.getElementById(decodeURIComponent(href.slice(1)))?.scrollIntoView();
    } else {
      window.location.hash = href;
    }
  };

  return (
    <nav className={styles.mNav} aria-label="Main" data-open={open || undefined}>
      {open ? (
        <div className={styles.mScroll}>
          <div className={`${styles.mRow} ${styles.mRowOpen}`}>
            <Wordmark />
            <button
              ref={closeButton}
              type="button"
              className={styles.hamburger}
              aria-label="Close menu"
              aria-expanded="true"
              onClick={onClose}
            >
              <CloseIcon className={styles.hamburgerIcon} />
            </button>
          </div>
          <div className={styles.mLinks}>
            {NAV_LINKS.map((link) => (
              <div key={link.href} className={styles.mLinkCell}>
                <a className={styles.mTextLink} href={link.href} onClick={onLinkClick}>
                  {link.label}
                </a>
              </div>
            ))}
          </div>
          <div className={styles.mActions}>
            <a className={styles.mBookBlack} {...BOOK_CALL_LINK} onClick={onLinkClick}>
              <span>{BOOK_CALL_LABEL}</span>
            </a>
          </div>
        </div>
      ) : (
        <div className={styles.mRow}>
          <Wordmark />
          <div className={styles.mRowEnd}>
            <BookCallButton className={styles.bookMobile} />
            <button
              ref={openButton}
              type="button"
              className={styles.hamburger}
              aria-label="Open menu"
              aria-expanded="false"
              onClick={onOpen}
            >
              <MenuIcon className={styles.hamburgerIcon} />
            </button>
          </div>
        </div>
      )}
      <div className={styles.strokeBot} aria-hidden="true" />
    </nav>
  );
}

export function SiteHeader() {
  const scrollHidden = useHideOnScrollDown();
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useMediaQuery(PHONE_QUERY, (isPhone) => {
    if (!isPhone) setMobileOpen(false);
  });

  const hidden = scrollHidden && !mobileOpen;

  return (
    <header className={styles.top} data-section="site-header" data-hidden={hidden || undefined}>
      <div className={styles.navWrap}>
        <DesktopNav />
        <MobileNav open={mobileOpen} onOpen={openMobile} onClose={closeMobile} />
      </div>
    </header>
  );
}
