import Link from "next/link";

import { INSURANCE_LINES, insuranceLineHref } from "../insurance/insurance-lines";
import { PRACTICE_AREAS, practiceAreaHref } from "../legal/practice-areas";
import { Logo } from "../shared/logo";
import { PENDING_PAGES, ROUTES } from "../links";
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
    heading: "Legal",
    links: PRACTICE_AREAS.map((area) => ({ label: area.navLabel, href: practiceAreaHref(area) })),
  },
  {
    heading: "Insurance",
    links: INSURANCE_LINES.map((line) => ({ label: line.navLabel, href: insuranceLineHref(line) })),
  },
  {
    heading: "Company",
    links: [
      { label: "Results", href: ROUTES.results },
      { label: "About", href: ROUTES.about },
      { label: "Partners", href: ROUTES.partners },
      { label: "Blog", href: ROUTES.blog },
      { label: "Contact", href: PENDING_PAGES.contact },
    ],
  },
  {
    heading: "Policies",
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
              <Logo variant="light" className={styles.logo} />
              <p className={styles.blurb}>Screened inbound calls and live transfers.</p>
            </div>
          </div>
          <nav className={styles.links} aria-label="Footer">
            {COLUMNS.map((column) => (
              <div key={column.heading} className={styles.column}>
                <p className={styles.heading}>{column.heading}</p>
                {column.links.map((link) =>
                  link.href.startsWith("/") ? (
                    <Link key={link.label} className={styles.link} href={link.href}>
                      {link.label}
                    </Link>
                  ) : (
                    <a key={link.label} className={styles.link} href={link.href}>
                      {link.label}
                    </a>
                  ),
                )}
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
