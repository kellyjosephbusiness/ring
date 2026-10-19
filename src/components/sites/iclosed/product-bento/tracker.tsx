"use client";

import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

import { useCountUp, useSteps } from "./bento-hooks";
import styles from "./tracker.module.css";

/** The recovered column's counter ticks 188 → 189 when the new lead lands. */
const NEW_LEAD_TIMES = [2000] as const;

const AVATARS = [
  "linear-gradient(135deg,#fca5a5,#ef4444)",
  "linear-gradient(135deg,#a5b4fc,#6366f1)",
  "linear-gradient(135deg,#6ee7b7,#10b981)",
  "linear-gradient(135deg,#fcd34d,#f59e0b)",
  "linear-gradient(135deg,#93c5fd,#3b82f6)",
  "linear-gradient(135deg,#f9a8d4,#ec4899)",
  "linear-gradient(135deg,#5eead4,#14b8a6)",
  "linear-gradient(135deg,#c4b5fd,#8b5cf6)",
  "linear-gradient(135deg,#fdba74,#f97316)",
] as const;

type Lead = {
  email: string;
  mail: string;
  session: string;
  person: string;
  chip: string;
  unread: boolean;
  fields: boolean;
};

type Column = {
  variant: "green" | "amber" | "orange";
  label: string;
  icon: "rotate" | "lightning";
  count: string;
  leads: Lead[];
};

const COLUMNS: Column[] = [
  {
    variant: "green",
    label: "Recovered",
    icon: "rotate",
    count: "189",
    leads: [
      { email: "alex.thompson@gmail.com", mail: "sarah.k@mail.com", session: "Q4 Sales Discovery [Google]", person: "Alex Thompson", chip: "New message", unread: true, fields: false },
      { email: "priya.patel@gmail.com", mail: "marco@mail.com", session: "Product Demo [LinkedIn ADS]", person: "Priya Patel", chip: "Create chat", unread: false, fields: true },
    ],
  },
  {
    variant: "amber",
    label: "Engaged",
    icon: "lightning",
    count: "94",
    leads: [
      { email: "james.wilson@gmail.com", mail: "nina.r@mail.com", session: "Onboarding Call [Meta ADS]", person: "James Wilson", chip: "New message", unread: true, fields: false },
      { email: "olivia.chen@gmail.com", mail: "lucas@mail.com", session: "Strategy Session [TikTok]", person: "Olivia Chen", chip: "New message", unread: true, fields: true },
    ],
  },
  {
    variant: "orange",
    label: "Call booked",
    icon: "rotate",
    count: "47",
    leads: [
      { email: "ryan.murphy@gmail.com", mail: "emma.s@mail.com", session: "Follow-up Demo [FB ADS]", person: "Ryan Murphy", chip: "Create chat", unread: false, fields: false },
      { email: "sofia.garcia@gmail.com", mail: "daniel.m@mail.com", session: "Enterprise Call [Google]", person: "Sofia Garcia", chip: "Go to chat", unread: false, fields: true },
      { email: "noah.kim@gmail.com", mail: "ava.j@mail.com", session: "Renewal Talk [LinkedIn]", person: "Noah Kim", chip: "Go to chat", unread: false, fields: true },
      { email: "isabella.lee@gmail.com", mail: "ethan.p@mail.com", session: "Upsell Call [Meta ADS]", person: "Isabella Lee", chip: "Go to chat", unread: false, fields: true },
    ],
  },
  {
    variant: "green",
    label: "Recovered",
    icon: "rotate",
    count: "189",
    leads: [
      { email: "liam.brooks@gmail.com", mail: "zoe.h@mail.com", session: "Intro Call [Google]", person: "Liam Brooks", chip: "New message", unread: true, fields: false },
    ],
  },
];

const RINGS = [
  { size: 535, left: 24.5, top: 21.5 },
  { size: 401, left: 91.5, top: 88.5 },
  { size: 267, left: 158.5, top: 155.5 },
  { size: 155, left: 214.5, top: 211.5 },
] as const;

const SECTIONS = ["Smartviews", "Scheduling status", "Contact stages"] as const;

const indexVar = (name: "--i" | "--c", value: number) => ({ [name]: value }) as CSSProperties;

/** 16×16 stroked line icon in the tracker's UI-kit style. */
function Glyph({ strokeWidth, children }: { strokeWidth: number; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="100%"
      height="100%"
      display="block"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/** Filled brand glyph (channel logos, lightning). */
function Mark({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 16 16" style={{ width: "100%", height: "100%", display: "block" }}>
      {children}
    </svg>
  );
}

function UsersIcon() {
  return (
    <Glyph strokeWidth={1.2}>
      <circle cx="6" cy="6" r="2.3" />
      <path d="M2.3 13c0-2.1 1.7-3.4 3.7-3.4S9.7 10.9 9.7 13" />
      <path d="M10.4 4.2a2.1 2.1 0 0 1 0 3.9" />
      <path d="M11 9.7c1.6.2 2.7 1.4 2.7 3.3" />
    </Glyph>
  );
}

function Chevron({ dir }: { dir: "up" | "down" | "right" }) {
  const d = dir === "up" ? "M4 10l4-4 4 4" : dir === "down" ? "M4 6l4 4 4-4" : "M6 4l4 4-4 4";
  return (
    <Glyph strokeWidth={1.5}>
      <path d={d} />
    </Glyph>
  );
}

function RotateIcon() {
  return (
    <Glyph strokeWidth={1.3}>
      <path d="M12.2 8a4.2 4.2 0 1 1-1.3-3" />
      <path d="M11.1 2.6v2.6H8.5" />
    </Glyph>
  );
}

function LightningIcon() {
  return (
    <Mark>
      <path d="M9.2 2 4.4 9.1H7l-1 4.9L11.7 6.3H8.7z" fill="currentColor" />
    </Mark>
  );
}

function MessageIcon({ unread }: { unread: boolean }) {
  return (
    <Glyph strokeWidth={1.15}>
      <path d="M3 4.4A1.7 1.7 0 0 1 4.7 2.7h6.6A1.7 1.7 0 0 1 13 4.4v3.5a1.7 1.7 0 0 1-1.7 1.7H6.6l-2.7 2.1V9.6H4.7A1.7 1.7 0 0 1 3 7.9z" />
      {unread ? <circle cx="12.4" cy="3.8" r="1.7" fill="#1c64f2" stroke="#ffffff" strokeWidth="0.7" /> : null}
    </Glyph>
  );
}

const CHANNELS: ReactNode[] = [
  <Mark key="gmail">
    <rect x="1.5" y="3.6" width="13" height="8.8" rx="1.6" fill="#ffffff" stroke="#e3e6ea" strokeWidth="0.6" />
    <polyline points="2.7,11.6 2.7,5.2 8,9 13.3,5.2 13.3,11.6" fill="none" stroke="#ea4335" strokeWidth="1.4" strokeLinejoin="round" />
  </Mark>,
  <Mark key="whatsapp">
    <circle cx="8" cy="8" r="6.3" fill="#25d366" />
    <path
      d="M5.7 5.5c.15-.38.3-.38.48-.38h.28c.14 0 .3 0 .44.33l.48 1.08c.05.14 0 .28-.06.38l-.24.3c-.1.1-.14.24-.05.38.3.48.86 1 1.4 1.3.15.08.3.05.4-.06l.34-.4c.1-.1.24-.14.38-.08l1.02.48c.15.08.24.18.24.34 0 .5-.34.98-.78 1.12-.4.14-.86.14-2-.4-1.4-.66-2.46-2.2-2.66-3.28-.13-.68 0-1.320.2-1.86z"
      fill="#ffffff"
    />
  </Mark>,
  <Mark key="sms">
    <rect x="1.4" y="1.4" width="13.2" height="13.2" rx="3.4" fill="#3b82f6" />
    <path d="M8 4.1c2.35 0 4.2 1.42 4.2 3.2S10.350 10.5 8 10.5c-.5 0-1-.06-1.450-.18L4.5 11.2l.52-1.42C4.28 9.24 3.8 8.35 3.8 7.3 3.8 5.5 5.65 4.1 8 4.1z" fill="#ffffff" />
  </Mark>,
  <Mark key="messenger">
    <circle cx="8" cy="8" r="6.3" fill="#0084ff" />
    <path d="M8 3.8c-2.45 0-4.3 1.72-4.3 4.02 0 1.2.52 2.22 1.4 2.940v1.66l1.55-.86c.42.12.87.18 1.35.18 2.45 0 4.3-1.72 4.3-4.020S10.45 3.8 8 3.8z" fill="#ffffff" />
    <path d="M5.2 9.75 7.35 7.5l1.05 1.1 1.9-1.1-2.05 2.15-1.05-1.1z" fill="#0084ff" />
  </Mark>,
];

function LeadCard({ lead, avatar, isNew, index }: { lead: Lead; avatar: string; isNew: boolean; index: number }) {
  return (
    <div className={clsx(styles.card, isNew && styles.cardNew)} style={indexVar("--i", index)}>
      <div className={styles.cardInner}>
        <div className={styles.cardEmail}>
          <p>{lead.email}</p>
        </div>
        <div className={styles.rows}>
          <div className={styles.row}>
            <span className={styles.rowIco}>
              <Glyph strokeWidth={1.15}>
                <rect x="2" y="3.6" width="12" height="8.8" rx="1.6" />
                <path d="M2.6 4.6 8 8.5l5.4-3.9" />
              </Glyph>
            </span>
            <span className={styles.rowText}>{lead.mail}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowIco}>
              <Glyph strokeWidth={1.15}>
                <rect x="2.4" y="3.4" width="11.2" height="10.2" rx="1.6" />
                <line x1="2.4" y1="6.2" x2="13.6" y2="6.2" />
                <line x1="5.4" y1="2.1" x2="5.4" y2="4.4" />
                <line x1="10.6" y1="2.1" x2="10.6" y2="4.4" />
              </Glyph>
            </span>
            <span className={styles.bar} />
            <span className={styles.rowText}>{lead.session}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowIco}>
              <Glyph strokeWidth={1.15}>
                <circle cx="8" cy="5.4" r="2.3" />
                <path d="M3.6 13c0-2.4 2-3.9 4.4-3.9s4.4 1.5 4.4 3.9" />
              </Glyph>
            </span>
            <span className={styles.avatar} style={{ backgroundImage: avatar }} />
            <span className={clsx(styles.rowText, styles.rowName)}>{lead.person}</span>
          </div>
        </div>
        <div className={styles.chip}>
          <span className={styles.chipIco}>
            <MessageIcon unread={lead.unread} />
          </span>
          <span className={styles.chipLabel}>{lead.chip}</span>
        </div>
        {lead.fields ? (
          <div className={styles.fields}>
            <span className={styles.fieldsIco}>
              <Chevron dir="right" />
            </span>
            <span className={styles.fieldsText}>5 fields</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Card 5 — "The most accurate scheduling tracker": the Global Data board
 * builds in, then a freshly recovered lead drops into the first column. */
export function TrackerGraphic({ play = false }: { play?: boolean }) {
  const landed = useSteps(play, NEW_LEAD_TIMES) > 0 || !play;
  const recovered = useCountUp(play, 60000, { delay: 600, duration: 900, prefix: "$" });
  const deals = useCountUp(play, 20, { delay: 800, duration: 600 });
  const timeSaved = useCountUp(play, 10, { delay: 900, duration: 600, suffix: " hrs" });

  let avatarIndex = 0;

  return (
    <div className={clsx(styles.root, play && styles.isPlay)}>
      {RINGS.map((ring, i) => (
        <div
          key={ring.size}
          className={styles.ring}
          style={{ width: ring.size, height: ring.size, left: ring.left, top: ring.top, ...indexVar("--i", i) }}
        />
      ))}
      <div className={styles.window}>
        <div className={styles.sidebar}>
          <div className={styles.sbHead}>
            <span className={styles.sbTitle}>Global Data</span>
            <div className={styles.sbActions}>
              <span className={styles.iconbtn}>
                <span>
                  <Glyph strokeWidth={1.3}>
                    <circle cx="7" cy="7" r="4.4" />
                    <line x1="10.4" y1="10.4" x2="14" y2="14" />
                  </Glyph>
                </span>
              </span>
              <span className={styles.iconbtn}>
                <span>
                  <Glyph strokeWidth={1.3}>
                    <rect x="2.2" y="3.2" width="11.6" height="9.6" rx="2" />
                    <line x1="6.1" y1="3.4" x2="6.1" y2="12.6" />
                  </Glyph>
                </span>
              </span>
            </div>
          </div>
          <div className={styles.sbBody}>
            <div className={styles.navgroup}>
              <div className={styles.navitem}>
                <div className={styles.navitemLeft}>
                  <span className={styles.navitemIco}>
                    <UsersIcon />
                  </span>
                  <span className={styles.navitemLabel}>All contacts</span>
                </div>
                <span className={styles.navitemCount}>1050</span>
              </div>
              <div className={styles.navitem}>
                <div className={styles.navitemLeft}>
                  <span className={styles.navitemIco}>
                    <Glyph strokeWidth={1.3}>
                      <circle cx="8" cy="8" r="5.8" />
                      <path d="M5.4 8.2 7.2 10l3.4-3.7" />
                    </Glyph>
                  </span>
                  <span className={styles.navitemLabel}>Appointment setting</span>
                </div>
                <span className={styles.navitemCount}>98</span>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.secHead}>
                <span className={styles.secLabel}>Pipelines</span>
                <span className={styles.secChevron}>
                  <Chevron dir="up" />
                </span>
              </div>
              {[
                { label: "Recovered Pipeline", count: "401", active: true },
                { label: "Auto Agent Reachout", count: "120", active: false },
              ].map((pipe) => (
                <div key={pipe.label} className={styles.pipeItem}>
                  <span className={styles.pipeDivider} />
                  <div className={clsx(styles.pipeBtn, pipe.active && styles.active)}>
                    <span className={styles.pipeLabel}>{pipe.label}</span>
                    <span className={styles.pipeCount}>{pipe.count}</span>
                  </div>
                </div>
              ))}
            </div>
            {SECTIONS.map((label) => (
              <div key={label} className={styles.section}>
                <div className={styles.secHead}>
                  <span className={styles.secLabel}>{label}</span>
                  <span className={styles.secChevron}>
                    <Chevron dir="down" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.navbar}>
            <div className={styles.tabs}>
              <div className={clsx(styles.tab, styles.active)}>
                <span className={styles.tabIco}>
                  <UsersIcon />
                </span>
                <span className={styles.tabLabel}>Contacts</span>
                <span className={styles.tabBadge}>123</span>
              </div>
              <div className={styles.tab}>
                <span className={styles.tabIco}>
                  <Glyph strokeWidth={1.2}>
                    <path d="M5.1 3.3c.3-.3.8-.3 1 0l1.2 1.5c.2.3.2.6 0 .9l-.5.7c.7 1.3 1.6 2.2 2.9 2.9l.7-.5c.3-.2.6-.2.9 0l1.5 1.2c.3.2.3.7 0 1l-.8.8c-.4.4-1 .5-1.5.3C7.7 11.8 4.3 8.4 3.1 5.1c-.2-.5-.1-1.1.3-1.5z" />
                  </Glyph>
                </span>
                <span className={styles.tabLabel}>Calls</span>
              </div>
              <div className={styles.tab}>
                <span className={styles.tabIco}>
                  <Glyph strokeWidth={1.2}>
                    <path d="M8 2.6v10.8" />
                    <path d="M10.4 5.2C10.4 4 9.3 3.3 8 3.3S5.6 4 5.6 5.3C5.6 8 10.4 7 10.4 9.7c0 1.3-1.1 2-2.4 2s-2.4-.8-2.4-2" />
                  </Glyph>
                </span>
                <span className={styles.tabLabel}>Deals</span>
              </div>
            </div>
          </div>

          <div className={styles.body}>
            <div className={styles.stats}>
              <div className={styles.stat} style={indexVar("--i", 0)}>
                <div className={styles.statHead}>
                  <span className={styles.statLabel}>Recovered pipeline</span>
                </div>
                <p className={styles.statValue}>{recovered}</p>
              </div>
              <div className={styles.stat} style={indexVar("--i", 1)}>
                <div className={clsx(styles.statHead, styles.spread)}>
                  <span className={styles.statLabel}>Speed to lead</span>
                  <span className={styles.statChannels}>
                    {CHANNELS.map((channel, i) => (
                      <span key={i} className={styles.chan} style={indexVar("--i", i)}>
                        {channel}
                      </span>
                    ))}
                  </span>
                </div>
                <p className={styles.statValue}>2m 30 sec</p>
              </div>
              <div className={styles.stat} style={indexVar("--i", 2)}>
                <div className={styles.statHead}>
                  <span className={styles.statLabel}>Deals closed</span>
                </div>
                <p className={styles.statValue}>{deals}</p>
              </div>
              <div className={clsx(styles.stat, styles.grow)} style={indexVar("--i", 3)}>
                <div className={styles.statHead}>
                  <span className={styles.statLabel}>Time saved by disqualification</span>
                  <span className={styles.statInfo}>
                    <Glyph strokeWidth={1.2}>
                      <circle cx="8" cy="8" r="5.8" />
                      <line x1="8" y1="7.5" x2="8" y2="11" />
                      <circle cx="8" cy="5.2" r="0.55" fill="currentColor" stroke="none" />
                    </Glyph>
                  </span>
                </div>
                <p className={styles.statValue}>{timeSaved}</p>
              </div>
            </div>

            <div className={styles.kanban}>
              {COLUMNS.map((column, c) => {
                const isFirst = c === 0;
                return (
                  <div key={c} className={styles.col} style={indexVar("--c", c)}>
                    <div className={styles.colHead}>
                      <div className={styles.badges}>
                        <div className={clsx(styles.badge, styles[column.variant])}>
                          <span className={styles.badgeIco}>
                            {column.icon === "rotate" ? <RotateIcon /> : <LightningIcon />}
                          </span>
                          <span className={styles.badgeLabel}>{column.label}</span>
                        </div>
                        <span className={clsx(styles.badgeCount, isFirst && play && landed && styles.pop)}>
                          {isFirst && !landed ? "188" : column.count}
                        </span>
                      </div>
                    </div>
                    <div className={styles.cards}>
                      {column.leads.map((lead, i) => (
                        <LeadCard
                          key={lead.email}
                          lead={lead}
                          avatar={AVATARS[avatarIndex++ % AVATARS.length]}
                          isNew={isFirst && i === 0}
                          index={i}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
