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
import Link from "next/link";

import { LOGIN_URL, START_FREE_URL } from "../links";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "./icons";
import { MenuContent } from "./menu-content";
import {
  ANNOUNCEMENT,
  LOGO_SRC,
  NAV_LINKS,
  PRODUCT_MENU,
  RESOURCES_MENU,
  type NavMenu,
} from "./site-header.data";
import styles from "./site-header.module.css";

type MenuId = NavMenu["id"];

const PHONE_QUERY = "(max-width: 809.98px)";
const TABLET_QUERY = "(min-width: 810px) and (max-width: 1279.98px)";

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

function Logo() {
  return (
    <Link className={styles.logo} href="/" aria-label="iClosed home">
      <img src={LOGO_SRC} alt="" width={181} height={37} />
    </Link>
  );
}

function AnnouncementBar({ closed, onClose }: { closed: boolean; onClose: () => void }) {
  return (
    <div className={styles.barWrap} data-closed={closed || undefined}>
      <a
        className={styles.bar}
        href={ANNOUNCEMENT.href}
        tabIndex={closed ? -1 : undefined}
        aria-hidden={closed || undefined}
      >
        <span className={styles.barContent}>
          <svg className={styles.barDot} viewBox="0 0 8 8" aria-hidden="true">
            <path
              d="M 4 0 C 6.209 0 8 1.791 8 4 C 8 6.209 6.209 8 4 8 C 1.791 8 0 6.209 0 4 C 0 1.791 1.791 0 4 0 Z"
              fill="rgb(49, 196, 141)"
              stroke="rgb(70, 250, 175)"
              strokeWidth="2"
            />
          </svg>
          <span className={styles.barLabel}>
            <span className={styles.barText}>{ANNOUNCEMENT.label}</span>
            <svg className={styles.barChevron} viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M6 4L10 8L6 12"
                fill="none"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
      </a>
      <button
        type="button"
        className={styles.barClose}
        onClick={onClose}
        aria-label="Dismiss announcement"
        tabIndex={closed ? -1 : undefined}
        aria-hidden={closed || undefined}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M 12.8 3.2 L 3.2 12.8 M 3.2 3.2 L 12.8 12.8"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

function StartButton({ className }: { className: string }) {
  return (
    <a className={`${styles.startBtn} ${className}`} href={START_FREE_URL}>
      <span>Start For Free</span>
    </a>
  );
}

interface DesktopNavProps {
  open: MenuId | null;
  stickyDesktop: boolean;
  onOpen: (id: MenuId) => void;
  onClose: () => void;
}

function DesktopNav({ open, stickyDesktop, onOpen, onClose }: DesktopNavProps) {
  const baseId = useId();
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<MenuId, HTMLButtonElement | null>>({
    product: null,
    resources: null,
  });
  const focusFirstLink = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && focusFirstLink.current) {
      focusFirstLink.current = false;
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }
  }, [open]);

  const openFromKeyboard = (id: MenuId) => {
    focusFirstLink.current = true;
    onOpen(id);
  };

  const onTriggerClick = (id: MenuId) => (event: MouseEvent<HTMLButtonElement>) => {
    // Pointer clicks keep the menu open (as on the source); keyboard
    // activation toggles it and moves focus into the panel.
    if (event.detail === 0) {
      if (open === id) onClose();
      else openFromKeyboard(id);
      return;
    }
    onOpen(id);
  };

  const onTriggerKeyDown = (id: MenuId) => (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openFromKeyboard(id);
    }
  };

  const onTriggerEnter = (id: MenuId) => (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse") onOpen(id);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      const trigger = triggerRefs.current[open];
      onClose();
      trigger?.focus();
    }
  };

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    if (open && !(next instanceof Node && navRef.current?.contains(next))) onClose();
  };

  const onPointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && open) onClose();
  };

  const trigger = (menu: NavMenu, extraClass: string) => (
    <button
      ref={(node) => {
        triggerRefs.current[menu.id] = node;
      }}
      type="button"
      className={`${styles.trigger} ${extraClass}`}
      aria-expanded={open === menu.id}
      aria-controls={`${baseId}-${menu.id}`}
      data-open={open === menu.id || undefined}
      onPointerEnter={onTriggerEnter(menu.id)}
      onClick={onTriggerClick(menu.id)}
      onKeyDown={onTriggerKeyDown(menu.id)}
    >
      <span className={styles.triggerLabel}>{menu.label}</span>
      <ChevronDownIcon className={styles.triggerChevron} />
    </button>
  );

  const activeMenu = open === "product" ? PRODUCT_MENU : open === "resources" ? RESOURCES_MENU : null;

  return (
    <nav
      ref={navRef}
      className={styles.deskNav}
      aria-label="Main"
      data-open={open ?? undefined}
      data-sticky-desktop={stickyDesktop || undefined}
      onPointerLeave={onPointerLeave}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    >
      <div className={styles.row}>
        <div className={styles.logoWrap}>
          <Logo />
        </div>
        <div className={styles.links}>
          {trigger(PRODUCT_MENU, styles.triggerProduct)}
          <div className={styles.linkCell}>
            <a className={styles.textLink} href={NAV_LINKS.results.href}>
              {NAV_LINKS.results.label}
            </a>
          </div>
          <div className={styles.linkCell}>
            <a className={styles.textLink} href={NAV_LINKS.pricing.href}>
              {NAV_LINKS.pricing.label}
            </a>
          </div>
          {trigger(RESOURCES_MENU, styles.triggerResources)}
          <div className={`${styles.linkCell} ${styles.mcpCell}`}>
            <a className={styles.textLink} href={NAV_LINKS.mcp.href}>
              {NAV_LINKS.mcp.label}
            </a>
          </div>
        </div>
        <div className={styles.dropdown}>
          <div className={styles.dropdownCatcher} aria-hidden="true" />
          {activeMenu && (
            <div
              ref={panelRef}
              id={`${baseId}-${activeMenu.id}`}
              className={styles.panel}
              data-menu={activeMenu.id}
            >
              <MenuContent menu={activeMenu} layout="desktop" />
            </div>
          )}
        </div>
        <div className={styles.actions}>
          <div className={styles.loginCell}>
            <a className={`${styles.textLink} ${styles.loginLink}`} href={LOGIN_URL}>
              Login
            </a>
          </div>
          <StartButton className={styles.startDesktop} />
        </div>
      </div>
      <div className={styles.strokeBot} aria-hidden="true" />
      <div className={styles.backdrop} aria-hidden="true" />
    </nav>
  );
}

function Accordion({
  menu,
  open,
  onToggle,
}: {
  menu: NavMenu;
  open: boolean;
  onToggle: () => void;
}) {
  const bodyId = useId();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [bodyHeight, setBodyHeight] = useState(0);

  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const measure = () => setBodyHeight(body.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(body);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`${styles.acc} ${menu.id === "product" ? styles.accProduct : styles.accResources}`}
      data-open={open || undefined}
      style={{ height: open ? 40 + bodyHeight : 44 }}
    >
      <button
        type="button"
        className={styles.accTrigger}
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={onToggle}
      >
        <span className={styles.accLabel}>{menu.label}</span>
        <ChevronDownIcon className={styles.accChevron} />
      </button>
      <div ref={bodyRef} id={bodyId} className={styles.accBody} inert={!open}>
        <MenuContent menu={menu} layout="mobile" />
      </div>
    </div>
  );
}

function MobileNav({ open, onOpen, onClose }: { open: boolean; onOpen: () => void; onClose: () => void }) {
  const [expanded, setExpanded] = useState<Record<MenuId, boolean>>({
    product: false,
    resources: false,
  });
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(open);

  useEffect(() => {
    if (open === wasOpen.current) return;
    wasOpen.current = open;
    if (open) closeButton.current?.focus();
    else openButton.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const toggle = (id: MenuId) => () => setExpanded((state) => ({ ...state, [id]: !state[id] }));

  return (
    <nav className={styles.mNav} aria-label="Main" data-open={open || undefined}>
      {open ? (
        <div className={styles.mScroll}>
          <div className={`${styles.mRow} ${styles.mRowOpen}`}>
            <Logo />
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
            <Accordion menu={PRODUCT_MENU} open={expanded.product} onToggle={toggle("product")} />
            <div className={styles.mLinkCell}>
              <a className={styles.mTextLink} href={NAV_LINKS.results.href} onClick={onClose}>
                {NAV_LINKS.results.label}
              </a>
            </div>
            <div className={styles.mLinkCell}>
              <a className={styles.mTextLink} href={NAV_LINKS.pricing.href} onClick={onClose}>
                {NAV_LINKS.pricing.label}
              </a>
            </div>
            <Accordion
              menu={RESOURCES_MENU}
              open={expanded.resources}
              onToggle={toggle("resources")}
            />
            <div className={styles.mLinkCell}>
              <a className={styles.mTextLink} href={NAV_LINKS.mcp.href} onClick={onClose}>
                {NAV_LINKS.mcp.label}
              </a>
            </div>
          </div>
          <div className={styles.mActions}>
            <div className={styles.mLinkCellLogin}>
              <a className={styles.mTextLink} href={LOGIN_URL} target="_blank" rel="noopener">
                Login
              </a>
            </div>
            <a className={styles.mStartBlack} href={START_FREE_URL} onClick={onClose}>
              <span>Start For Free</span>
            </a>
          </div>
        </div>
      ) : (
        <div className={styles.mRow}>
          <Logo />
          <div className={styles.mRowEnd}>
            <StartButton className={styles.startMobile} />
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
  const [barClosed, setBarClosed] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [stickyDesktop, setStickyDesktop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const openDesktopMenu = useCallback((id: MenuId) => {
    setOpenMenu(id);
    // Once a dropdown has opened, the source keeps its desktop layout at
    // tablet widths too (MCP link back, centred links).
    setStickyDesktop(true);
  }, []);
  const closeDesktopMenu = useCallback(() => setOpenMenu(null), []);
  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useMediaQuery(TABLET_QUERY, () => setStickyDesktop(false));
  useMediaQuery(PHONE_QUERY, (isPhone) => {
    if (isPhone) setOpenMenu(null);
    else setMobileOpen(false);
  });

  const hidden = scrollHidden && !mobileOpen;
  const [prevHidden, setPrevHidden] = useState(hidden);
  if (hidden !== prevHidden) {
    setPrevHidden(hidden);
    if (hidden) setOpenMenu(null);
  }

  return (
    <header className={styles.top} data-section="site-header" data-hidden={hidden || undefined}>
      <AnnouncementBar closed={barClosed} onClose={() => setBarClosed(true)} />
      <div className={styles.navWrap}>
        <DesktopNav
          open={openMenu}
          stickyDesktop={stickyDesktop}
          onOpen={openDesktopMenu}
          onClose={closeDesktopMenu}
        />
        <MobileNav open={mobileOpen} onOpen={openMobile} onClose={closeMobile} />
      </div>
    </header>
  );
}
