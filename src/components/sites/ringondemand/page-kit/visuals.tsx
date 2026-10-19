import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ListChecks,
  Megaphone,
  PanelsTopLeft,
  type LucideIcon,
} from "lucide-react";

import { CheckDisc } from "../shared/check-disc";
import styles from "./visuals.module.css";

/** Illustrations for the page-kit panels. Like the homepage's, they only
 * restate facts from the copy: no names, numbers or dates. */

/** The intake script for one practice area: every check a caller must pass. */
export function CriteriaCard({ label, checks }: { label: string; checks: readonly string[] }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.cardTitle}>
          <span className={styles.dot} aria-hidden="true" />
          Intake script
        </span>
        <span className={styles.tag}>{label}</span>
      </div>
      <ul className={styles.checks}>
        {checks.map((check) => (
          <li key={check} className={styles.check}>
            <CheckDisc className={styles.disc} />
            <span>{check}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const AGENDA = [
  { icon: Megaphone, label: "Our ads" },
  { icon: PanelsTopLeft, label: "Our landing pages" },
  { icon: ListChecks, label: "Our intake questions" },
  { icon: Building2, label: "The firms we work with" },
] as const;

/** What the discovery call covers, on a dark panel. */
export function CallAgenda() {
  return (
    <div className={styles.darkPanel}>
      <div className={`${styles.card} ${styles.agendaCard}`}>
        <div className={styles.cardHead}>
          <span className={styles.cardTitle}>
            <span className={styles.dot} aria-hidden="true" />
            On the call
          </span>
          <span className={styles.tag}>Licensed attorney</span>
        </div>
        <ul className={styles.agenda}>
          {AGENDA.map(({ icon: Icon, label }) => (
            <li key={label} className={styles.agendaItem}>
              <span className={styles.iconBox}>
                <Icon className={styles.iconGlyph} strokeWidth={1.75} aria-hidden="true" />
              </span>
              {label}
            </li>
          ))}
        </ul>
        <p className={styles.agendaFoot}>
          <CheckDisc className={styles.disc} />
          You decide.
        </p>
      </div>
    </div>
  );
}

export interface AreaListItem {
  href: string;
  name: string;
  icon: LucideIcon;
}

/** Pages (practice areas, insurance lines) as a linked list. */
export function AreaList({ label, items }: { label: string; items: readonly AreaListItem[] }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.cardTitle}>
          <span className={styles.dot} aria-hidden="true" />
          {label}
        </span>
      </div>
      <ul className={styles.areas}>
        {items.map((area) => {
          const Icon = area.icon;
          return (
            <li key={area.href}>
              <Link className={styles.area} href={area.href}>
                <span className={styles.iconBox}>
                  <Icon className={styles.iconGlyph} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className={styles.areaName}>{area.name}</span>
                <ArrowRight className={styles.areaArrow} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
