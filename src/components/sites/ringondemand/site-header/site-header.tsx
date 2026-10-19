"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BOOK_CALL_TARGET, BOOK_CALL_URL } from "../links";
import { BOOK_CALL_LABEL, LEGAL_MENU, NAV_LINKS } from "./site-header.data";
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

/** A link on this page with a #fragment: the menus close first, then jump. */
function samePageHash(href: string): string | null {
  const url = new URL(href, window.location.href);
  if (url.pathname !== window.location.pathname || url.hash.length < 2) return null;
  return url.hash;
}

function jumpToHash(hash: string) {
  if (window.location.hash === hash) {
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  } else {
    window.location.hash = hash;
  }
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

function ChevronDownIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path
        d="M 6 8 L 10 12 L 14 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
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

function LegalTiles({ onNavigate }: { onNavigate: () => void }) {
  return (
    <ul className={styles.tiles}>
      {LEGAL_MENU.tiles.map(({ label, href, description, icon: Icon }) => (
        <li key={href} className={styles.tileItem}>
          <Link className={styles.tile} href={href} onClick={onNavigate}>
            <span className={styles.iconBox}>
              <Icon className={styles.tileGlyph} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className={styles.tileTitle}>{label}</span>
            <span className={styles.tileDesc}>{description}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

interface DesktopNavProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function DesktopNav({ open, onOpen, onClose }: DesktopNavProps) {
  const panelId = useId();
  const navRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const focusFirstLink = useRef(false);

  useEffect(() => {
    if (open && focusFirstLink.current) {
      focusFirstLink.current = false;
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }
  }, [open]);

  const openFromKeyboard = () => {
    focusFirstLink.current = true;
    onOpen();
  };

  // Pointer clicks keep the menu open (hover already opened it); keyboard
  // activation toggles it and moves focus into the panel.
  const onTriggerClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) {
      if (open) onClose();
      else openFromKeyboard();
      return;
    }
    onOpen();
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openFromKeyboard();
    }
  };

  const onTriggerEnter = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse") onOpen();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      onClose();
      triggerRef.current?.focus();
    }
  };

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    if (open && !(next instanceof Node && navRef.current?.contains(next))) onClose();
  };

  const onPointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && open) onClose();
  };

  const onLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClose();
    const hash = samePageHash(event.currentTarget.href);
    if (hash) {
      event.preventDefault();
      jumpToHash(hash);
    }
  };

  return (
    <nav
      ref={navRef}
      className={styles.deskNav}
      aria-label="Main"
      data-open={open || undefined}
      onPointerLeave={onPointerLeave}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    >
      <div className={styles.row}>
        <div className={styles.logoWrap}>
          <Wordmark />
        </div>
        <div className={styles.links}>
          <button
            ref={triggerRef}
            type="button"
            className={styles.trigger}
            aria-expanded={open}
            aria-controls={panelId}
            data-open={open || undefined}
            onPointerEnter={onTriggerEnter}
            onClick={onTriggerClick}
            onKeyDown={onTriggerKeyDown}
          >
            <span className={styles.triggerLabel}>{LEGAL_MENU.label}</span>
            <ChevronDownIcon className={styles.triggerChevron} />
          </button>
          {NAV_LINKS.map((link) => (
            <div key={link.href} className={styles.linkCell}>
              <Link className={styles.textLink} href={link.href} onClick={onLinkClick}>
                {link.label}
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.dropdown}>
          <div className={styles.dropdownCatcher} aria-hidden="true" />
          {open ? (
            <div ref={panelRef} id={panelId} className={styles.panel}>
              <LegalTiles onNavigate={onClose} />
            </div>
          ) : null}
        </div>
        <div className={styles.actions}>
          <BookCallButton className={styles.bookDesktop} />
        </div>
      </div>
      <div className={styles.strokeBot} aria-hidden="true" />
      <div className={styles.backdrop} aria-hidden="true" />
    </nav>
  );
}

function MobileNav({ open, onOpen, onClose }: { open: boolean; onOpen: () => void; onClose: () => void }) {
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(open);
  /** Closing from a link hands focus to the page the link opens, not back to
   * the hamburger. */
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
    restoreFocus.current = false;
    const hash = samePageHash(event.currentTarget.href);
    if (!hash) {
      onClose();
      return;
    }
    event.preventDefault();
    flushSync(onClose);
    jumpToHash(hash);
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
            <div className={styles.mGroup}>
              <p className={styles.mGroupLabel}>{LEGAL_MENU.label}</p>
              {LEGAL_MENU.tiles.map((tile) => (
                <Link key={tile.href} className={styles.mSubLink} href={tile.href} onClick={onLinkClick}>
                  {tile.label}
                </Link>
              ))}
            </div>
            {NAV_LINKS.map((link) => (
              <div key={link.href} className={styles.mLinkCell}>
                <Link className={styles.mTextLink} href={link.href} onClick={onLinkClick}>
                  {link.label}
                </Link>
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
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // A route change closes whichever menu led to it.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setMenuOpen(false);
  }

  useMediaQuery(PHONE_QUERY, (isPhone) => {
    if (isPhone) setMenuOpen(false);
    else setMobileOpen(false);
  });

  const hidden = scrollHidden && !mobileOpen && !menuOpen;

  return (
    <header className={styles.top} data-section="site-header" data-hidden={hidden || undefined}>
      <div className={styles.navWrap}>
        <DesktopNav open={menuOpen} onOpen={openMenu} onClose={closeMenu} />
        <MobileNav open={mobileOpen} onOpen={openMobile} onClose={closeMobile} />
      </div>
    </header>
  );
}
