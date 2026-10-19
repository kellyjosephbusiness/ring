import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./cta-link.module.css";

export interface CtaLinkProps {
  href: string;
  children: ReactNode;
  /** Blue fill (default), or the white outlined button. */
  variant?: "blue" | "outline";
}

/** The interior pages' button: iClosed's 48px "Start For Free" button with a
 * trailing arrow. Site routes go through next/link; in-page anchors such as
 * #book-a-call stay plain links. */
export function CtaLink({ href, children, variant = "blue" }: CtaLinkProps) {
  const className = variant === "outline" ? `${styles.cta} ${styles.outline}` : styles.cta;
  const content = (
    <>
      <span>{children}</span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link className={className} href={href}>
        {content}
      </Link>
    );
  }
  return (
    <a className={className} href={href}>
      {content}
    </a>
  );
}
