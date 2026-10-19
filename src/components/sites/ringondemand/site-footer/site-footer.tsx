import { ANCHORS, PENDING_PAGES } from "../links";
import styles from "./site-footer.module.css";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
  {
    heading: "Offers",
    links: [
      { label: "Live Transfers", href: ANCHORS.liveTransfers },
      { label: "Pre-Signed Cases", href: ANCHORS.preSignedCases },
      { label: "Pricing", href: ANCHORS.pricing },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Results", href: ANCHORS.results },
      { label: "Contact", href: PENDING_PAGES.contact },
      { label: "Publishers", href: PENDING_PAGES.publishers },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: PENDING_PAGES.privacyPolicy },
      { label: "Terms of Service", href: PENDING_PAGES.termsOfService },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer} data-section="site-footer">
      <div className={styles.content}>
        <div className={styles.bot}>
          <div className={styles.info}>
            <div className={styles.intro}>
              <p className={styles.wordmark}>RingOnDemand</p>
              <p className={styles.blurb}>Signed MVA cases and live transfers for personal injury firms.</p>
            </div>
          </div>
          <nav className={styles.links} aria-label="Footer">
            {COLUMNS.map((column) => (
              <div key={column.heading} className={styles.column}>
                <p className={styles.heading}>{column.heading}</p>
                {column.links.map((link) => (
                  <a key={link.label} className={styles.link} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </div>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2026 Ring On Demand Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
