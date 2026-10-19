import { START_FREE_URL, sourceUrl } from "../links";
import styles from "./site-footer.module.css";

interface FooterLink {
  label: string;
  href: string;
  newTab?: boolean;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
  /** The source keeps two empty placeholder rows at the end of this column. */
  spacers?: boolean;
}

const COLUMNS: FooterColumn[] = [
  {
    heading: "Products",
    links: [
      { label: "AI Scheduler", href: sourceUrl("./product/ai-scheduler") },
      { label: "Analytics", href: sourceUrl("./product/analytics") },
    ],
    spacers: true,
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "https://docs.iclosed.io/en/", newTab: true },
      { label: "Results", href: sourceUrl("./results") },
      { label: "Affiliates", href: sourceUrl("./affiliates") },
      { label: "Developers", href: sourceUrl("./product/api") },
      { label: "Careers", href: sourceUrl("./careers") },
      { label: "Contact", href: sourceUrl("./contact") },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Privacy Policy", href: sourceUrl("./privacy-policy") },
      { label: "Terms & Conditions", href: sourceUrl("./terms") },
      { label: "Developer Terms", href: sourceUrl("./developer-terms") },
      { label: "Cookie Policy", href: sourceUrl("./cookie-policy") },
      { label: "Invitee Terms", href: sourceUrl("./invitee-terms") },
      { label: "Trust Center", href: "https://trust.iclosed.io", newTab: true },
    ],
  },
];

function ArrowRightIcon() {
  return (
    <svg className={styles.btnIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M 11.36 4.976 L 6.384 9.952 L 4.4 9.952 L 8.56 5.776 L 0 5.776 L 0 4.16 L 8.576 4.16 L 4.416 0 L 6.4 0 Z"
        transform="translate(6.3 7)"
        fill="currentColor"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer} data-section="site-footer">
      <div className={styles.content}>
        <div className={styles.bot}>
          <div className={styles.info}>
            <div className={styles.intro}>
              <img
                className={styles.logo}
                src="/sites/iclosed/images/8c3d2e1d6813.avif"
                alt=""
                width={481}
                height={97}
                loading="lazy"
              />
              <p className={styles.blurb}>
                Boost sales and save time. iClosed captures up to 200% more leads by collecting info
                before showing slots — while filtering out non-buyers.
              </p>
            </div>
            <div className={styles.actions}>
              <a className={`${styles.btn} ${styles.btnWhite}`} href={START_FREE_URL}>
                <span>Start For Free</span>
                <ArrowRightIcon />
              </a>
              <a className={`${styles.btn} ${styles.btnOutline}`} href={sourceUrl("./book-a-call")}>
                <span>Book a demo</span>
              </a>
            </div>
          </div>
          <nav className={styles.links} aria-label="Footer">
            {COLUMNS.map((column) => (
              <div key={column.heading} className={styles.column}>
                <p className={styles.heading}>{column.heading}</p>
                {column.links.map((link) => (
                  <a
                    key={link.label}
                    className={styles.link}
                    href={link.href}
                    {...(link.newTab ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    {link.label}
                  </a>
                ))}
                {column.spacers && (
                  <>
                    <span className={`${styles.spacer} ${styles.spacerNarrow}`} aria-hidden="true" />
                    <span className={`${styles.spacer} ${styles.spacerWide}`} aria-hidden="true" />
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © Copyright 2026 iClosed. All Rights Reserved. You Scale LLC
          </p>
        </div>
      </div>
    </footer>
  );
}
