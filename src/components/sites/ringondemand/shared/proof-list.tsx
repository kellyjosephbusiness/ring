import styles from "./proof-list.module.css";

export interface ProofLine {
  before?: string;
  strong: string;
  after?: string;
}

/** Headline proof points; the figures were supplied by RingOnDemand. Reuse
 * these rather than retyping a number on a page. */
export const PROOF = {
  signedRetainers: { before: "Over ", strong: "2,000 signed retainers", after: " delivered" },
  legalTransfers: { before: "Over ", strong: "1,000 live transfers", after: " delivered" },
  liveTransfers: { before: "Over ", strong: "5,000 live transfers", after: " delivered" },
  trusted: {
    before: "Trusted by the ",
    strong: "largest insurance and legal organizations",
    after: " in the US",
  },
  trustedInsurance: {
    before: "Trusted by the ",
    strong: "largest insurance organizations",
    after: " in the US",
  },
  /** The trust line, told to publishers. */
  buyers: {
    before: "Your calls go to the ",
    strong: "largest insurance and legal organizations",
    after: " in the US",
  },
} as const satisfies Record<string, ProofLine>;

/** Verified badge (scalloped seal with a check), drawn at 18px beside each line. */
function CheckBadge() {
  return (
    <svg className={styles.badge} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      />
    </svg>
  );
}

/** Proof lines under a hero's button, each behind a blue verified badge. */
export function ProofList({
  lines,
  align = "start",
  className,
}: {
  lines: readonly ProofLine[];
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <ul className={className ? `${styles.list} ${className}` : styles.list} data-align={align}>
      {lines.map((line) => (
        <li key={line.strong} className={styles.line}>
          <CheckBadge />
          <span>
            {line.before}
            <b className={styles.strong}>{line.strong}</b>
            {line.after}
          </span>
        </li>
      ))}
    </ul>
  );
}
