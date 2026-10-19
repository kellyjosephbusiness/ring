"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

import { IMG } from "./assets";
import styles from "./qualify-panel.module.css";
import { cx, prefersReducedMotion } from "./utils";

/* "Qualify & Route": a lead types a phone number into the scheduler form, it
   validates, a cursor answers the two qualifying questions, and the checklist
   on the left ticks off Verified → Routed → Non-buyers in step. The sequence
   runs once each time the panel mounts, starting when the card is 20% in
   view. */

/** Typed into the phone field; "‑" is a non-breaking hyphen, as on the source. */
const PHONE_NUMBER = "+1 (415) 555‑0192";

type Phone = { text: string; placeholder: boolean; lit: boolean; valid: boolean };
type Selection = { rev: string | null; team: string | null };
type Cursor = { x: number; y: number; show: boolean; click: boolean };

const PHONE_IDLE: Phone = { text: "+1", placeholder: true, lit: false, valid: false };
const PHONE_DONE: Phone = { text: PHONE_NUMBER, placeholder: false, lit: true, valid: true };
const SELECTION_IDLE: Selection = { rev: null, team: null };
const SELECTION_DONE: Selection = { rev: "hi", team: "solo" };
const CURSOR_IDLE: Cursor = { x: 250, y: 275, show: false, click: false };

const QUESTIONS = [
  {
    key: "rev" as const,
    label: "Monthly revenue?",
    options: [
      { v: "lo", label: "$0 – $10K" },
      { v: "mid", label: "$10K – $50K" },
      { v: "hi", label: "$50K+" },
    ],
  },
  {
    key: "team" as const,
    label: "Team size?",
    options: [
      { v: "solo", label: "Just me" },
      { v: "mid", label: "2 – 9" },
      { v: "big", label: "10+" },
    ],
  },
];

const DAY_NAMES = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

type Day = { n: string; avail?: boolean; selected?: boolean };
const WEEKS: { fixed?: boolean; days: Day[] }[] = [
  { fixed: true, days: [{ n: "30" }, { n: "31" }, { n: "1" }, { n: "2" }, { n: "3" }, { n: "4" }] },
  { days: [{ n: "5" }, { n: "6" }, { n: "7" }, { n: "8" }, { n: "9" }, { n: "10" }, { n: "11" }] },
  {
    days: [
      { n: "12" },
      { n: "13" },
      { n: "14" },
      { n: "15", selected: true },
      { n: "16", avail: true },
      { n: "17", avail: true },
      { n: "18", avail: true },
    ],
  },
  {
    days: [
      { n: "19" },
      { n: "20" },
      { n: "21", avail: true },
      { n: "22", avail: true },
      { n: "23", avail: true },
      { n: "24" },
      { n: "25" },
    ],
  },
  {
    fixed: true,
    days: [{ n: "26" }, { n: "27", avail: true }, { n: "28", avail: true }, { n: "1" }, { n: "2" }],
  },
];

/** Thrown by `wait` when its timer fired far too late (a backgrounded tab):
 * the sequence restarts from the top instead of jumping ahead. */
const STALE = Symbol("stale");

export function QualifyPanel() {
  const [phone, setPhone] = useState<Phone>(PHONE_IDLE);
  const [sel, setSel] = useState<Selection>(SELECTION_IDLE);
  const [checked, setChecked] = useState(0);
  const [cursor, setCursor] = useState<Cursor>(CURSOR_IDLE);

  const cardRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const revHiRef = useRef<HTMLDivElement>(null);
  const teamSoloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    let cancelled = false;
    let started = false;
    const timers = new Set<number>();

    const wait = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        const begin = performance.now();
        const id = window.setTimeout(() => {
          timers.delete(id);
          if (performance.now() - begin > ms + 4000) reject(STALE);
          else resolve();
        }, ms);
        timers.add(id);
      });

    // Park the cursor on an option, 14px in from its left edge.
    const pointAt = (target: RefObject<HTMLDivElement | null>) => {
      const stage = stageRef.current;
      const option = target.current;
      if (!stage || !option) return;
      const s = stage.getBoundingClientRect();
      const o = option.getBoundingClientRect();
      if (!o.width) return;
      setCursor({ x: o.left - s.left + 14, y: o.top - s.top + o.height / 2, show: true, click: false });
    };

    const settle = () => {
      setPhone(PHONE_DONE);
      setSel(SELECTION_DONE);
      setChecked(3);
    };

    const sequence = async () => {
      setPhone(PHONE_IDLE);
      setSel(SELECTION_IDLE);
      setChecked(0);
      setCursor(CURSOR_IDLE);
      await wait(900);
      if (cancelled) return;

      // Type the number, two characters a beat.
      setPhone({ text: "", placeholder: false, lit: true, valid: false });
      for (let i = 1; i <= PHONE_NUMBER.length; i++) {
        if (cancelled) return;
        setPhone({ text: PHONE_NUMBER.slice(0, i), placeholder: false, lit: true, valid: false });
        await wait(58);
      }
      await wait(240);
      if (cancelled) return;
      setPhone(PHONE_DONE);
      await wait(420);
      if (cancelled) return;

      // 1 — Verified.
      setChecked(1);
      await wait(950);
      if (cancelled) return;

      // 2 — answer "$50K+": routed to the best closer.
      pointAt(revHiRef);
      await wait(640);
      if (cancelled) return;
      setCursor((c) => ({ ...c, click: true }));
      await wait(190);
      if (cancelled) return;
      setSel((s) => ({ ...s, rev: "hi" }));
      setChecked(2);
      await wait(520);
      if (cancelled) return;
      await wait(520);
      if (cancelled) return;
      setCursor((c) => ({ ...c, click: false }));
      await wait(520);
      if (cancelled) return;

      // 3 — answer "Just me": a non-buyer, redirected.
      pointAt(teamSoloRef);
      await wait(640);
      if (cancelled) return;
      setCursor((c) => ({ ...c, click: true }));
      await wait(190);
      if (cancelled) return;
      setSel((s) => ({ ...s, team: "solo" }));
      setChecked(3);
      await wait(700);
      if (cancelled) return;
      setCursor((c) => ({ ...c, show: false }));
      await wait(3200);
    };

    const run = async () => {
      for (;;) {
        try {
          await sequence();
          return;
        } catch (err) {
          if (err !== STALE) throw err;
          if (cancelled) return;
        }
      }
    };

    const start = () => {
      if (started || cancelled) return;
      started = true;
      if (prefersReducedMotion()) settle();
      else void run();
    };

    let io: IntersectionObserver | null = null;
    if (card && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) start();
        },
        { threshold: 0.2 },
      );
      io.observe(card);
    } else {
      start();
    }

    return () => {
      cancelled = true;
      io?.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const optionRefs: Record<string, RefObject<HTMLDivElement | null>> = {
    "rev:hi": revHiRef,
    "team:solo": teamSoloRef,
  };

  return (
    <div className={styles.bigcard} ref={cardRef} data-shot="">
      <Copy checked={checked} />
      <div className={styles.stagefit}>
        <div className={cx(styles.panel, styles.panelBlue, styles.rightstage)} ref={stageRef}>
          <Scheduler phone={phone} sel={sel} optionRefs={optionRefs} />
          <svg
            className={cx(styles.qsCursor, cursor.show && styles.isShow, cursor.click && styles.isClick)}
            style={{ left: cursor.x, top: cursor.y }}
            viewBox="0 0 24 24"
            fill="#1f2937"
            stroke="#fff"
            strokeWidth="1.3"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 3l15 8-6 1.5L11 19z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Copy({ checked }: { checked: number }) {
  return (
    <div className={styles.copy}>
      <div className={styles.copytop}>
        <div className={styles.copyhead}>
          <h3 className={styles.title}>
            Save 100+ hours <span className={styles.titleDesktopWord}>and</span>
            <span className={styles.titleMobileWord}>&amp;</span> close 34% more
          </h3>
          <p className={styles.para}>
            Stop wasting time by disqualifying non-buyers — route the best leads to the best closers,
            keep your pixel clean and optimized.
          </p>
        </div>
        <div className={styles.checklist}>
          <CheckItem
            done={checked >= 1}
            current={checked === 1}
            dimIcon={IMG.mailDelivered}
            title="Verified"
            badge="No fake leads"
            desc="Phone & email validated — real people only."
          />
          <Connector dim={checked < 1} />
          <CheckItem
            done={checked >= 2}
            current={checked === 2}
            dimIcon={IMG.users}
            title="Routed to best closers"
            badge="+34% close rate"
            desc="High-revenue leads go straight to your best closer."
            outcome={<RouteOutcome />}
          />
          <Connector dim={checked < 2} />
          <CheckItem
            done={checked >= 3}
            current={checked === 3}
            dimIcon={IMG.globe}
            title="Non-buyers"
            badge="Saves time"
            badgeRed
            desc="Out-of-fit answers never book — or touch your pixel."
            outcome={<RedirectOutcome />}
            last
          />
        </div>
      </div>
    </div>
  );
}

function Connector({ dim }: { dim: boolean }) {
  return (
    <div className={cx(styles.checkConnector, dim && styles.checkConnectorDim)}>
      <span className={styles.checkLine} />
    </div>
  );
}

type CheckItemProps = {
  done: boolean;
  current: boolean;
  dimIcon: string;
  title: string;
  badge: string;
  badgeRed?: boolean;
  desc: string;
  outcome?: ReactNode;
  last?: boolean;
};

function CheckItem({ done, current, dimIcon, title, badge, badgeRed, desc, outcome, last }: CheckItemProps) {
  return (
    <div
      className={cx(
        styles.checkItem,
        styles.checkAnim,
        done ? styles.isChecked : styles.isDim,
        current && styles.isCurrent,
      )}
    >
      <div className={styles.checkIconcol}>
        <span className={cx(styles.checkSwap, badgeRed && styles.isRed)}>
          <span className={styles.checkSwapDim}>
            <img src={dimIcon} alt="" width="16" height="16" />
          </span>
          <span className={styles.checkSwapChk}>
            <img src={IMG.checkCircle} alt="" width="13" height="13" />
          </span>
        </span>
        <span className={cx(styles.checkLinewrap, last && styles.checkLinewrapLast)}>
          <span className={styles.checkLine} />
        </span>
      </div>
      <div className={cx(styles.checkTextcol, styles.checkTextcolTight)}>
        <div className={styles.checkTitlerow}>
          <span className={cx(styles.checkTitle, current && styles.checkTitleBold)}>{title}</span>
          <span
            className={cx(styles.badge, styles.badgeReveal, badgeRed ? styles.badgeRed : styles.badgeGreen)}
          >
            {badge}
          </span>
        </div>
        <div className={styles.checkDesc}>{desc}</div>
        {outcome ? (
          <div className={cx(styles.checkOutcome, styles.checkOutcomeReveal)}>{outcome}</div>
        ) : null}
      </div>
    </div>
  );
}

function RouteOutcome() {
  return (
    <div className={cx(styles.qsOutcome, styles.qsOutcomeRoute)}>
      <img className={styles.qsOutcomeAv} src={IMG.alex} alt="" />
      <span className={styles.qsOutcomeTxt}>
        Routed to <b>Alex · Top closer</b> — 41% close rate
      </span>
    </div>
  );
}

function RedirectOutcome() {
  return (
    <div className={cx(styles.qsOutcome, styles.qsOutcomeDq)}>
      <span className={styles.qsOutcomeIc}>
        <img src={IMG.globe} alt="" width="12" height="12" />
      </span>
      <span className={styles.qsOutcomeTxt}>
        Redirected to <b>your URL</b>
      </span>
      <span className={styles.qsOutcomePix}>
        <img src={IMG.metaPixel} alt="" />
        pixel safe
      </span>
    </div>
  );
}

type SchedulerProps = {
  phone: Phone;
  sel: Selection;
  optionRefs: Record<string, RefObject<HTMLDivElement | null>>;
};

function Scheduler({ phone, sel, optionRefs }: SchedulerProps) {
  return (
    <div className={styles.window}>
      <div className={styles.sched}>
        <div className={styles.schedHead}>
          <span className={styles.schedStep}>
            <span className={cx(styles.schedDot, styles.schedDotOn)} />
            <span className={cx(styles.schedSteplabel, styles.schedSteplabelOn)}>Fill out the form </span>
          </span>
          <span className={styles.schedStep}>
            <span className={styles.schedDot} />
            <span className={styles.schedSteplabel}>Book your event</span>
          </span>
        </div>
        <div className={styles.schedBody}>
          <div className={styles.schedForm}>
            <div className={styles.schedTitleblock}>
              <div className={styles.schedTitle}>30 minutes Strategy Call</div>
              <div className={styles.schedSub}>Book your 1:1 strategy call</div>
            </div>
            <div className={cx(styles.schedFields, styles.qsFields)}>
              <PhoneRow phone={phone} />
              {QUESTIONS.map((q) => (
                <div className={styles.qsQuestion} key={q.key}>
                  <div className={styles.qsQlabel}>{q.label}</div>
                  {q.options.map((o) => (
                    <div
                      key={o.v}
                      ref={optionRefs[`${q.key}:${o.v}`]}
                      className={cx(styles.qsOpt, sel[q.key] === o.v && styles.isSel)}
                    >
                      <span className={styles.qsRadio} />
                      <span className={styles.qsOptlabel}>{o.label}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.schedDivider} />
          <Calendar />
        </div>
      </div>
    </div>
  );
}

function PhoneRow({ phone }: { phone: Phone }) {
  return (
    <div
      className={cx(
        styles.phoneRow,
        phone.lit && !phone.valid && styles.phoneRowLit,
        phone.valid && styles.phoneRowOk,
      )}
    >
      <span className={styles.flagBtn}>
        <img src={IMG.flagUs} alt="" width="15" height="10" />
        <img src={IMG.chevronDown} alt="" width="13" height="13" />
        <span className={styles.flagDiv} />
      </span>
      <span className={styles.phoneInput}>
        <span className={cx(styles.phoneText, phone.placeholder && styles.phoneTextIdle)}>{phone.text}</span>
        {phone.lit && !phone.valid ? <span className={styles.caret} /> : null}
        {phone.valid ? (
          <img className={styles.validCheck} src={IMG.checkCircle} alt="" width="12" height="12" />
        ) : null}
      </span>
    </div>
  );
}

function Calendar() {
  return (
    <div className={styles.schedCal}>
      <div className={styles.schedCalinner}>
        <div className={styles.schedCalhead}>
          <div className={styles.schedMonth}>
            February <span>2025</span>
          </div>
          <div className={styles.schedNavs}>
            <span className={cx(styles.schedNavbtn, styles.schedNavbtnPrev)}>
              <img src={IMG.chevronLeft} alt="" width="12" height="12" />
            </span>
            <span className={styles.schedNavbtn}>
              <img className={styles.schedNavflip} src={IMG.chevronLeft} alt="" width="12" height="12" />
            </span>
          </div>
        </div>
        <div className={styles.schedWeeks}>
          <div className={styles.schedWeek}>
            {DAY_NAMES.map((d) => (
              <span className={styles.schedDayname} key={d}>
                {d}
              </span>
            ))}
          </div>
          {WEEKS.map((week, wi) => (
            <div className={styles.schedWeek} key={wi}>
              {week.days.map((day, di) => (
                <span
                  key={di}
                  className={cx(
                    styles.schedDay,
                    week.fixed && styles.schedDayFixed,
                    day.avail && styles.schedDayAvail,
                    day.selected && styles.schedDaySelected,
                  )}
                >
                  {day.n}
                  {day.selected ? <span className={styles.schedDaydot} /> : null}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.schedCaltip}>Please fill out the form before choosing your time slot.</div>
    </div>
  );
}
