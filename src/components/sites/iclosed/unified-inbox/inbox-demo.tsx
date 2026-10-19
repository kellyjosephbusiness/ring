"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import {
  ASSETS,
  CHANNELS,
  COMMENTS,
  CURSOR_PATH,
  FRAMES,
  ICONS,
  LANE_WIDTH,
  LAST_FRAME,
  PAUSE_RATIO,
  PREVIEWS,
  RECORDING_SECONDS,
  ROWS,
  START_DELAY,
  START_RATIO,
  STATUSES,
  THREAD,
  stateAt,
  type DemoState,
  type ThreadItem,
} from "./inbox-data";
import styles from "./inbox-demo.module.css";

function cx(...names: (string | false | null | undefined)[]) {
  return names.filter(Boolean).join(" ");
}

function Ico({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={cx(styles.ico, className)} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Fic({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={cx(styles.fic, className)} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const pad2 = (n: number) => (n < 10 ? "0" : "") + n;
const clock = (s: number) => `${pad2(Math.floor(s / 60))}:${pad2(s % 60)}`;

/** Visible fraction is sampled every 5%. */
const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

function stageLabel(stage: DemoState["stage"]) {
  return stage === "won" ? "Won" : stage === "booked" ? "Booked" : "New Lead";
}

/**
 * The scripted conversation. It waits, on its opening frame with every
 * entrance animation held, until 60% of the window is on screen, starts 400ms
 * later, steps through FRAMES and loops. It pauses (on the current frame)
 * whenever less than 15% of the window is visible. Reduced motion shows the
 * final frame, still.
 */
export function InboxDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const closerRef = useRef<HTMLVideoElement>(null);
  const leadRef = useRef<HTMLVideoElement>(null);
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const reduced = useReducedMotion();

  const w = stateAt(reduced ? LAST_FRAME : step);
  const playing = w.modal && w.playing && !reduced;
  const held = !started && !reduced;

  // Step through the script while the window is on screen.
  useEffect(() => {
    if (!started || !inView || reduced) return;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % FRAMES.length), FRAMES[step].d);
    return () => window.clearTimeout(id);
  }, [step, started, inView, reduced]);

  // How much of the window is visible, relative to the smaller of its own
  // height and the viewport's.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const h = Math.min(entry.boundingClientRect.height, entry.rootBounds?.height ?? window.innerHeight);
        const ratio = h > 0 ? entry.intersectionRect.height / h : 0;
        setInView(ratio >= PAUSE_RATIO);
        setReady(ratio >= START_RATIO);
      },
      { threshold: THRESHOLDS },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Start once, a beat after the window is properly on screen.
  useEffect(() => {
    if (started || !ready) return;
    const id = window.setTimeout(() => setStarted(true), START_DELAY);
    return () => window.clearTimeout(id);
  }, [ready, started]);

  // The recording modal's two video tiles play while the player is "playing",
  // and the player clock counts real seconds.
  useEffect(() => {
    for (const video of [closerRef.current, leadRef.current]) {
      if (!video) continue;
      video.muted = true;
      if (playing) {
        if (video.paused) video.play().catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    }
    if (!playing) return;
    const t0 = Date.now();
    const id = window.setInterval(() => setElapsed(Math.floor((Date.now() - t0) / 1000)), 250);
    return () => {
      window.clearInterval(id);
      setElapsed(0);
    };
  }, [playing, w.modal]);

  const seconds = playing ? elapsed : 0;
  const time = clock(seconds);
  const progress = `${Math.min(100, (seconds / RECORDING_SECONDS) * 100).toFixed(2)}%`;
  const [saraTime, saraPreview, saraOut] = PREVIEWS[w.prev];
  const statusDot = w.status === "hot" ? "#EF4444" : "#F59E0B";
  const hovered = COMMENTS.find((c) => c.id === w.hover);
  const typingLabel = w.aiTyping ? "iClosed AI is typing" : w.typing ? `${w.typing} is typing` : "";
  const items = THREAD.slice(0, w.n);

  return (
    <div
      ref={rootRef}
      className={cx(styles.root, held && styles.held)}
      aria-hidden="true"
      data-ui-window=""
      data-held={held ? "true" : "false"}
    >
      {/* ---- Conversation list ---- */}
      <section className={styles.list}>
        <div className={styles.lh}>
          <span className={styles.brand}>
            <img src={ASSETS.logo} alt="" />
            Unified Inbox
          </span>
        </div>
        <div className={styles.rows}>
          <div className={cx(styles.rw, w.rowNew && styles.rwNew)}>
            <div className={cx(styles.row, styles.rowSel, w.rowNew && styles.rowNew)}>
              <img className={styles.av24} src={ASSETS.sara} alt="" />
              <div className={styles.rmain}>
                <div className={styles.rtop}>
                  <span className={styles.rname}>Sara Mitchell</span>
                  <span className={styles.recov}>
                    <Fic d={ICONS.bolt} />
                    Recovered
                  </span>
                  <span className={styles.rtime}>{saraTime}</span>
                </div>
                <div className={styles.rprev}>
                  {saraOut ? <Ico d={ICONS.back} /> : null}
                  <span className={styles.rtxt}>{saraPreview}</span>
                </div>
              </div>
            </div>
          </div>
          {ROWS.map((row) => (
            <div key={row.name + row.time} className={styles.rw}>
              <div className={cx(styles.row, row.unread && styles.rowUnr)}>
                {row.photo ? (
                  <img className={styles.av24} src={row.photo} alt="" />
                ) : (
                  <span className={cx(styles.av24, styles.ini)}>{row.ini}</span>
                )}
                <div className={styles.rmain}>
                  <div className={styles.rtop}>
                    <span className={styles.rname}>{row.name}</span>
                    <span className={styles.rtime}>{row.time}</span>
                  </div>
                  <div className={styles.rprev}>
                    {row.out ? <Ico d={ICONS.back} /> : null}
                    <span className={styles.rtxt}>{row.prev}</span>
                    {row.unread ? <span className={styles.unread}>{row.unread}</span> : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Chat column ---- */}
      <section className={styles.chat}>
        <header className={styles.head}>
          <div className={styles.hl}>
            <span className={styles.lead}>Sara Mitchell</span>
            <span className={styles.life}>
              <span className={styles.lifeA}>
                {w.stage === "won" ? (
                  <Ico d={ICONS.trophy} className={styles.stWon} />
                ) : w.stage === "booked" ? (
                  <Ico d={ICONS.calCheck} className={styles.stBooked} />
                ) : (
                  <Ico d={ICONS.userPlus} className={styles.stLead} />
                )}
                <span>{stageLabel(w.stage)}</span>
              </span>
              <span className={styles.lifeB}>
                <Ico d={ICONS.chevR} />
              </span>
            </span>
          </div>
          <span className={cx(styles.asg, w.dd && styles.asgOpen)}>
            <img src={ASSETS.john} alt="" />
            <span>{w.asg === 2 ? "John & Joanna" : "John Doe"}</span>
            <Ico d={ICONS.chevD} />
          </span>
          {w.dd ? <AssigneeMenu both={w.asg === 2} /> : null}
        </header>

        <div className={styles.thread}>
          {items.map((item) => (
            <div key={item} className={styles.it}>
              <ThreadEntry item={item} tip={w.tip} recHover={w.recHover} />
            </div>
          ))}
        </div>

        {typingLabel ? (
          <div className={styles.typing}>
            <svg className={styles.tdots} viewBox="0 0 22 22" aria-hidden="true">
              <circle cx="4" cy="11" r="2" />
              <circle cx="9" cy="11" r="2" />
              <circle cx="14" cy="11" r="2" />
              <circle cx="19" cy="11" r="2" />
            </svg>
            <span>{typingLabel}</span>
          </div>
        ) : null}

        <div className={styles.comp}>
          <div className={styles.cr1}>
            <span className={cx(styles.chan, w.chanDD && styles.chanOpen)}>
              {w.chan === "email" ? (
                <>
                  <img src={ASSETS.gmail} alt="" />
                  Email
                  <i>· sara.mitchell@gmail.com</i>
                </>
              ) : (
                <>
                  <img src={ASSETS.wa} alt="" />
                  WhatsApp
                  <i>· +1 415 902 9123</i>
                </>
              )}
              <Ico d={ICONS.chevU} />
            </span>
          </div>
          {w.chanDD ? (
            <div className={styles.chm}>
              <div className={styles.chl}>Reply via</div>
              {CHANNELS.map((ch) => (
                <div key={ch.id} className={cx(styles.chr, w.chHov === ch.id && styles.chrHov)}>
                  <img src={ch.icon} alt="" />
                  <span>{ch.label}</span>
                  <i>{ch.sub}</i>
                  {w.chan === ch.id ? <Ico d={ICONS.check} /> : null}
                </div>
              ))}
            </div>
          ) : null}
          <div className={styles.ed}>
            {w.compText ? (
              <span className={styles.typed}>
                Here’s your secure link to lock in your spot: <span className={styles.lnk}>buy.stripe.com/eVa288</span>
              </span>
            ) : (
              <span className={styles.ph}>Use &apos;#&apos; for templates, &apos;$&apos; for variables</span>
            )}
          </div>
          <div className={styles.cr3}>
            {[ICONS.smile, ICONS.mic, ICONS.upload, ICONS.variable, ICONS.template, ICONS.note, ICONS.chevR].map((d) => (
              <span key={d} className={styles.tb}>
                <Ico d={d} />
              </span>
            ))}
            <span className={styles.cnt}>{w.compText ? "67/2000 characters" : "0/2000 characters"}</span>
            <span className={cx(styles.send, w.compText && styles.sendOn)}>
              <Ico d={ICONS.send} />
              Send
            </span>
          </div>
        </div>
      </section>

      {/* ---- Contact details ---- */}
      <aside className={styles.np}>
        <div className={styles.nph}>
          <span>Contact details</span>
          <span className={styles.npx}>
            <Ico d={ICONS.x} />
          </span>
        </div>
        <div className={styles.ctabs}>
          <span className={cx(styles.ctab, styles.ctabOn)}>
            <Ico d={ICONS.listd} />
            Details
          </span>
          <span className={styles.ctab}>
            <Ico d={ICONS.help} />
            Invitee questions
          </span>
          <span className={styles.cexp}>
            <Ico d={ICONS.expand} />
          </span>
        </div>
        <div className={styles.cbody}>
          <div className={styles.csec}>
            <Ico d={ICONS.chevD} />
            Basic details
          </div>
          <div className={styles.fields}>
            <Field icon={ICONS.cal} label="Last Call Book From">
              <span className={styles.evbar} />
              <span className={styles.t}>Strategy Call</span>
            </Field>
            <Field icon={ICONS.mail} label="Email">
              <span className={styles.t}>sara.mitchell@gmail.com</span>
            </Field>
            <Field icon={ICONS.phone} label="Phone number">
              <span className={styles.t}>+1 415 902 9123</span>
            </Field>
            <div className={cx(styles.fr, w.statusDD && styles.frHov)}>
              <span className={styles.fl}>
                <Ico d={ICONS.status} />
                <span>Status</span>
              </span>
              <span className={styles.fv}>
                <span className={styles.sdot8} style={{ background: statusDot }} />
                <span className={styles.t}>{w.status === "hot" ? "Hot lead" : "Warm"}</span>
                <Ico d={ICONS.chevD} />
              </span>
              {w.statusDD ? (
                <div className={styles.sdd}>
                  {STATUSES.map((st) => (
                    <div key={st.id} className={cx(styles.sdr, w.stHov && st.id === "hot" && styles.sdrHov)}>
                      <span className={styles.sdot8} style={{ background: st.dot }} />
                      <span>{st.label}</span>
                      {st.id === w.status ? <Ico d={ICONS.check} /> : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <Field icon={ICONS.user} label="Closer owner">
              <img className={styles.av18} src={ASSETS.john} alt="" />
              <span className={styles.t}>John Doe</span>
            </Field>
            <Field icon={ICONS.stairs} label="Contact stage">
              <span className={styles.t}>{stageLabel(w.stage)}</span>
            </Field>
            <Field icon={ICONS.user} label="Setter owner">
              <span className={cx(styles.t, styles.dash)}>--</span>
            </Field>
          </div>
          <div className={styles.showall}>
            Show all values
            <Ico d={ICONS.chevD} />
          </div>
        </div>
      </aside>

      {/* ---- Right rail ---- */}
      <aside className={styles.rail}>
        <span className={cx(styles.rb, styles.rbOn)}>
          <Ico d={ICONS.user} />
        </span>
        <span className={styles.rb}>
          <Ico d={ICONS.phone} />
        </span>
        <span className={styles.rb}>
          <Ico d={ICONS.note} />
        </span>
        <span className={styles.rb}>
          <Ico d={ICONS.video} />
        </span>
      </aside>

      {/* ---- Recording modal ---- */}
      {w.modal ? (
        <div className={styles.mbk}>
          <div className={styles.mod}>
            <div className={styles.mh}>
              <img src={ASSETS.zoom} alt="" />
              <b>Zoom recording</b>
              <span className={styles.bdg}>
                <Ico d={ICONS.video} />
                Video
              </span>
              <span className={styles.mhr}>
                <span className={styles.obtn}>
                  <Ico d={ICONS.link} />
                  Copy recording link
                </span>
                <span className={styles.xbtn}>
                  <Ico d={ICONS.x} />
                </span>
              </span>
            </div>
            <div className={styles.ml}>
              <div className={styles.mt}>
                <h3>Strategy Call — Sara Mitchell</h3>
                <span className={styles.mavs}>
                  <img className={styles.av36} src={ASSETS.john} alt="" />
                  <img className={cx(styles.av36, styles.av36R)} src={ASSETS.sara} alt="" />
                </span>
                <div className={styles.mmeta}>
                  <div>
                    <span className={styles.m5}>John Doe</span> <span className={styles.mut}>with</span>{" "}
                    <span className={styles.m5}>Sara Mitchell</span>
                  </div>
                  <div className={styles.mut}>Oct 6, 2026 2:30 PM</div>
                </div>
              </div>
              <div className={styles.player}>
                <div className={styles.vst}>
                  <div className={styles.tile}>
                    <video
                      ref={closerRef}
                      className={styles.v}
                      src={ASSETS.closerLoop}
                      poster={ASSETS.closerPoster}
                      muted
                      loop
                      playsInline
                      preload="auto"
                    />
                    <span className={styles.tag}>John Doe</span>
                  </div>
                  <div className={styles.tile}>
                    <video
                      ref={leadRef}
                      className={styles.v}
                      src={ASSETS.leadLoop}
                      poster={ASSETS.leadPoster}
                      muted
                      loop
                      playsInline
                      preload="auto"
                    />
                    <span className={styles.tag}>Sara Mitchell</span>
                  </div>
                  {playing ? null : (
                    <span className={styles.play}>
                      <Fic d={ICONS.play} />
                    </span>
                  )}
                </div>
                <div className={styles.tl}>
                  <div className={styles.lane}>
                    {COMMENTS.map((c) => (
                      <span
                        key={c.id}
                        className={cx(styles.mk, w.hover === c.id && styles.mkSel)}
                        style={{ left: Math.round(c.pct * LANE_WIDTH) }}
                      >
                        {c.photo ? <img src={c.photo} alt="" /> : <span className={styles.g}>{c.ini}</span>}
                      </span>
                    ))}
                    {hovered ? (
                      <div
                        className={styles.prev}
                        style={{ left: Math.min(Math.round(hovered.pct * LANE_WIDTH) - 28, LANE_WIDTH - 320) }}
                      >
                        <div className={styles.pvh}>
                          <img className={styles.av24p} src={hovered.photo ?? ASSETS.john} alt="" />
                          <b>{hovered.name}</b>
                          <span className={styles.ts}>{hovered.ts}</span>
                        </div>
                        <div>
                          <span className={styles.ment}>{hovered.ment}</span>
                          {hovered.post}
                        </div>
                        <div className={styles.pvf}>
                          <span>{hovered.replies ? "1 reply" : "Comment on this moment"}</span>
                          <span className={styles.rep}>
                            <Ico d={ICONS.back} />
                            Reply
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.scrub}>
                    <span className={styles.track} />
                    <span className={styles.fill} style={{ width: progress }} />
                    <span className={styles.thd} style={{ left: progress }} />
                  </div>
                </div>
                <div className={styles.ctr}>
                  <span className={styles.mb}>{playing ? <Fic d={ICONS.pause} /> : <Fic d={ICONS.play} />}</span>
                  <span className={styles.mb}>
                    <Ico d={ICONS.rwd} />
                  </span>
                  <span className={styles.mb}>
                    <Ico d={ICONS.fwd} />
                  </span>
                  <span className={styles.time}>
                    {time} <span>/ 34:12</span>
                  </span>
                  <span className={styles.sp} />
                  <span className={styles.mb}>
                    <Ico d={ICONS.msgPlus} />
                    Comment
                  </span>
                  <span className={styles.mb}>
                    1x
                    <Ico d={ICONS.chevD} className={styles.icoS} />
                  </span>
                  <span className={styles.mb}>
                    <Ico d={ICONS.vol} />
                  </span>
                  <span className={styles.mb}>
                    <Ico d={ICONS.max} />
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.mr}>
              <div className={styles.tabs}>
                <span className={cx(styles.tab, styles.tabOn)}>
                  <Ico d={ICONS.msg} />
                  Comments
                  <span className={styles.tcnt}>3</span>
                </span>
                <span className={styles.tab}>
                  <Ico d={ICONS.notes} />
                  Summary
                </span>
                <span className={styles.tab}>
                  <Ico d={ICONS.notes} />
                  Transcript
                </span>
              </div>
              <div className={styles.cl}>
                {COMMENTS.map((c) => (
                  <article key={c.id} className={cx(styles.cmt, w.hover === c.id && styles.cmtSel)}>
                    {c.photo ? (
                      <img className={styles.av28c} src={c.photo} alt="" />
                    ) : (
                      <span className={cx(styles.av28c, styles.gini2)}>{c.ini}</span>
                    )}
                    <div className={styles.cmm}>
                      <div className={styles.cmh}>
                        <b>{c.name}</b>
                        <span className={styles.ts}>{c.ts}</span>
                        <span className={styles.ago}>{c.ago}</span>
                        <span className={styles.rep}>
                          <Ico d={ICONS.back} />
                          Reply
                        </span>
                        <span className={styles.kb}>
                          <Ico d={ICONS.dots} className={styles.dotico} />
                        </span>
                      </div>
                      <div>
                        <span className={styles.ment}>{c.ment}</span>
                        {c.post}
                      </div>
                      {c.replies ? (
                        <div className={styles.rpl}>
                          <img src={ASSETS.john} alt="" />
                          <span className={styles.blue}>1 reply</span>
                          <span className={styles.mut}>Last reply 25 min ago</span>
                        </div>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
              <div className={styles.mcomp}>
                <div className={styles.mta}>Add a comment…</div>
                <div className={styles.mtb}>
                  <span className={styles.tb}>
                    <Ico d={ICONS.smile} />
                  </span>
                  <span className={styles.tb}>
                    <Ico d={ICONS.at} />
                  </span>
                  <span className={styles.cat}>Comment at {time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* ---- Teammates' cursors ---- */}
      <div className={styles.curs}>
        {[
          { c: w.a, color: "#2563EB", label: "John · Closer", click: w.ca },
          { c: w.b, color: "#9333EA", label: "Joanna · Sales Manager", click: w.cb },
        ].map((cur) => (
          <div
            key={cur.label}
            className={styles.cur}
            style={{ transform: `translate(${cur.c.x}px, ${cur.c.y}px)`, opacity: cur.c.show ? 1 : 0 }}
          >
            {cur.click ? <span className={styles.ring} style={{ borderColor: cur.color }} /> : null}
            <svg className={styles.cursvg} viewBox="0 0 24 24" aria-hidden="true">
              <path d={CURSOR_PATH} fill={cur.color} />
            </svg>
            <span className={styles.curl} style={{ background: cur.color }}>
              {cur.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <div className={styles.fr}>
      <span className={styles.fl}>
        <Ico d={icon} />
        <span>{label}</span>
      </span>
      <span className={styles.fv}>{children}</span>
    </div>
  );
}

function AssigneeMenu({ both }: { both: boolean }) {
  return (
    <div className={styles.ddp}>
      <div className={styles.dds}>
        <div className={styles.ddi}>
          <Ico d={ICONS.search} />
          <span>Search</span>
        </div>
      </div>
      <div className={styles.ddl}>Assignee(s)</div>
      <div className={styles.ddr}>
        <span className={cx(styles.cb, styles.cbOn)}>
          <Ico d={ICONS.check} />
        </span>
        <img className={styles.av20} src={ASSETS.john} alt="" />
        <span>John Doe</span>
      </div>
      <div className={styles.ddsep} />
      <div className={cx(styles.ddr, styles.ddrHov)}>
        <span className={cx(styles.cb, both && styles.cbOn)}>{both ? <Ico d={ICONS.check} /> : null}</span>
        <img className={styles.av20} src={ASSETS.joanna} alt="" />
        <span>Joanna Reyes</span>
      </div>
      <div className={styles.ddr}>
        <span className={styles.cb} />
        <img className={styles.av20} src={ASSETS.marcus} alt="" />
        <span>Marcus Reid</span>
      </div>
      <div className={styles.ddr}>
        <span className={styles.cb} />
        <span className={cx(styles.av20, styles.gini)}>S</span>
        <span>Scott Bennett</span>
      </div>
      <div className={styles.unas}>
        <Ico d={ICONS.userMinus} />
        Unassign
      </div>
    </div>
  );
}

function ThreadEntry({ item, tip, recHover }: { item: ThreadItem; tip: boolean; recHover: boolean }) {
  switch (item) {
    case "sepY":
    case "sepT":
      return (
        <div className={styles.sep}>
          <i />
          <span>{item === "sepY" ? "Yesterday" : "Today"}</span>
          <i />
        </div>
      );
    case "act":
    case "asgn":
      return (
        <div className={styles.act}>
          <span>{item === "act" ? "Lead captured as potential" : "Assigned to John Doe"}</span>
          <i />
          <span>{item === "act" ? "October 5, 9:02 PM" : "9:02 PM"}</span>
        </div>
      );
    case "agent":
      return (
        <div className={cx(styles.msg, styles.msgOut)}>
          <div className={styles.meta}>
            <span>21:03</span>
            <Ico d={ICONS.checks} />
          </div>
          <div className={styles.auto}>
            <div className={cx(styles.bub, styles.bubOut)}>
              Hey Sara! Looks like you didn’t get to pick a time for your Strategy Call with John. Tomorrow 2:30 or
              4:15 still open — want one?
            </div>
          </div>
          <div className={styles.avc}>
            <span className={styles.agent}>
              <span className={styles.agin}>
                <img src={ASSETS.mark} alt="" />
              </span>
            </span>
            <span className={styles.badge}>
              <img src={ASSETS.wa} alt="" />
            </span>
            {tip ? (
              <div className={styles.tip}>
                Sent automatically by your iClosed AI Agent.
                <span>View automation ↗</span>
              </div>
            ) : null}
          </div>
        </div>
      );
    case "sara1":
      return (
        <div className={styles.msg}>
          <div className={styles.avc}>
            <img className={styles.av28} src={ASSETS.sara} alt="" />
            <span className={styles.badge}>
              <img src={ASSETS.wa} alt="" />
            </span>
          </div>
          <div className={styles.bub}>so glad you texted! got pulled away halfway through. 2:30 works</div>
          <div className={styles.meta}>
            <span>21:05</span>
          </div>
        </div>
      );
    case "booked":
      return (
        <div className={styles.ev}>
          <div className={styles.evh}>
            <span className={styles.evdot} />
            <b>Strategy Call booked</b>
            <span className={styles.mut}>by</span>
            <img className={styles.av16} src={ASSETS.john} alt="" />
            <b>John Doe</b>
            <span className={styles.evr}>
              <Ico d={ICONS.ccheck} className={styles.ok} />
              <span className={cx(styles.mut, styles.m5)}>Confirmed by</span>
              <b>Sara Mitchell</b>
              <span className={styles.evdiv} />
              <span className={styles.mut}>9:06 PM</span>
              <Ico d={ICONS.chevR} className={styles.chev} />
            </span>
          </div>
        </div>
      );
    case "rec":
      return (
        <div className={styles.ev}>
          <div className={styles.evh}>
            <img className={styles.zi} src={ASSETS.zoom} alt="" />
            <b>Zoom recording available</b>
            <span className={styles.evr}>
              <span className={styles.mut}>Today, 2:30 PM</span>
              <Ico d={ICONS.chevD} className={styles.chev} />
            </span>
          </div>
          <div className={styles.recb}>
            <img className={styles.thumb} src={ASSETS.closerThumb} alt="" />
            <div className={styles.rect}>
              <span>Tue Oct 6, 2:30 PM – 3:04 PM</span>
              <b>John Doe with Sara Mitchell • Strategy Call</b>
            </div>
            <span className={cx(styles.vrec, recHover && styles.vrecHov)}>
              <Fic d={ICONS.play} />
              View recording
            </span>
          </div>
        </div>
      );
    case "email":
      return (
        <div className={cx(styles.msg, styles.msgOut)}>
          <div className={styles.meta}>
            <span>15:12</span>
            <Ico d={ICONS.checks} />
          </div>
          <div className={cx(styles.bub, styles.bubOut, styles.mail)}>
            <div className={styles.msub}>Your Scaling Accelerator onboarding link</div>
            <div className={styles.mfrom}>Joanna Reyes &lt;joanna@iclosed.io&gt; › Sara Mitchell</div>
            <div className={styles.mdiv} />
            <div>
              Great call today, Sara! Here’s your secure link to lock in your spot:{" "}
              <span className={styles.lnk}>buy.stripe.com/eVa288</span>
            </div>
          </div>
          <div className={styles.avc}>
            <img className={styles.av28} src={ASSETS.joanna} alt="" />
            <span className={styles.badge}>
              <img src={ASSETS.gmail} alt="" />
            </span>
          </div>
        </div>
      );
    case "paid":
      return (
        <div className={styles.ev}>
          <div className={styles.evh}>
            <span className={styles.paytile}>
              <Ico d={ICONS.dollar} />
            </span>
            <b>Payment received</b>
            <b className={styles.green}>$5,000</b>
            <span className={styles.evr}>
              <span className={styles.mut}>3:41 PM</span>
              <Ico d={ICONS.chevR} className={styles.chev} />
            </span>
          </div>
        </div>
      );
  }
}
