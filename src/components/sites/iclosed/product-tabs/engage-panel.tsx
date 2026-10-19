"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { IMG, VIDEO } from "./assets";
import {
  CALL_COMMENTS,
  CHANNELS,
  ICON,
  LANE_WIDTH,
  OTHER_ROWS,
  PREVIEWS,
  RECORDING_SECONDS,
  STATUSES,
  THREAD,
  clock,
  type ThreadItem,
} from "./engage-data";
import {
  ENGAGE_LAST_STEP,
  ENGAGE_PAUSE_VISIBLE,
  ENGAGE_START_DELAY,
  ENGAGE_START_VISIBLE,
  ENGAGE_STEPS,
  engageStateAt,
  type EngageFrame,
} from "./engage-script";
import styles from "./engage-panel.module.css";
import { useReducedMotion } from "./use-reduced-motion";
import { cx } from "./utils";

/* "Engage": the iClosed Unified Inbox as a rigid 1308 x 720 app window. The
   storyboard in engage-script.ts plays through once per tab dwell (and loops
   if the tab is held): Sara's row arrives, the AI agent texts her, she books,
   the call recording opens and plays, her status and assignee change, Joanna
   emails the payment link and Sara pays. It waits until 60% of the window is
   on screen, and pauses below 15%. Reduced motion shows the final frame. */

const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

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

const stageLabel = (stage: EngageFrame["stage"]) =>
  stage === "won" ? "Won" : stage === "booked" ? "Booked" : "New Lead";

export function EngagePanel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videos = useRef<HTMLVideoElement[]>([]);
  const playStart = useRef(0);
  const stepDueAt = useRef<number | null>(null);

  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [mostlyVisible, setMostlyVisible] = useState(false);
  const [visible, setVisible] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const reduced = useReducedMotion();

  const frame = engageStateAt(reduced ? ENGAGE_LAST_STEP : step);
  const videoPlaying = frame.modal && frame.playing && !reduced;

  const collectVideo = useCallback((el: HTMLVideoElement | null) => {
    if (el && !videos.current.includes(el)) videos.current.push(el);
  }, []);

  // Advance the storyboard. Each hold is measured from when the step was due
  // (not from when React got round to committing it), so render time does not
  // pile up over the 34 steps; a pause restarts the current hold in full.
  useEffect(() => {
    if (!started || !visible || reduced) {
      stepDueAt.current = null;
      return;
    }
    const fireAt = (stepDueAt.current ?? performance.now()) + ENGAGE_STEPS[step].d;
    const id = window.setTimeout(
      () => {
        stepDueAt.current = fireAt;
        setStep((s) => (s + 1) % ENGAGE_STEPS.length);
      },
      Math.max(0, fireAt - performance.now()),
    );
    return () => window.clearTimeout(id);
  }, [step, started, visible, reduced]);

  // How much of the window is on screen (relative to the viewport for a
  // window taller than it).
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setStarted(true), 0);
      return () => window.clearTimeout(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        const box = Math.min(entry.boundingClientRect.height, entry.rootBounds?.height ?? window.innerHeight);
        const ratio = box > 0 ? entry.intersectionRect.height / box : 0;
        setVisible(ratio >= ENGAGE_PAUSE_VISIBLE);
        setMostlyVisible(ratio >= ENGAGE_START_VISIBLE);
      },
      { threshold: THRESHOLDS },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  // Start 400ms after the window is 60% in view.
  useEffect(() => {
    if (started || !mostlyVisible) return;
    const id = window.setTimeout(() => setStarted(true), ENGAGE_START_DELAY);
    return () => window.clearTimeout(id);
  }, [mostlyVisible, started]);

  // The two call tiles play (muted) only while the recording modal is playing;
  // the player clock counts real seconds meanwhile.
  useEffect(() => {
    videos.current = videos.current.filter((v) => v.isConnected);
    videos.current.forEach((v) => {
      v.muted = true;
      if (videoPlaying) {
        if (v.paused) v.play().catch(() => {});
      } else if (!v.paused) {
        v.pause();
      }
    });
    if (!videoPlaying) return;
    playStart.current = Date.now();
    const id = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - playStart.current) / 1000));
    }, 250);
    return () => {
      window.clearInterval(id);
      setElapsed(0);
    };
  }, [videoPlaying, frame.modal]);

  const seconds = videoPlaying ? elapsed : 0;
  const time = clock(seconds);
  const progress = `${Math.min(100, (seconds / RECORDING_SECONDS) * 100).toFixed(2)}%`;
  const [prevTime, prevText, prevOut] = PREVIEWS[frame.prev];
  const statusDot = frame.status === "hot" ? "#EF4444" : "#F59E0B";
  const hovered = CALL_COMMENTS.find((c) => c.id === frame.hover);
  const typingLabel = frame.aiTyping ? "iClosed AI is typing" : frame.typing ? `${frame.typing} is typing` : "";
  const items = THREAD.slice(0, frame.n);

  return (
    <div className={cx(styles.root, !started && !reduced && styles.held)} ref={rootRef} aria-hidden="true">
      <section className={styles.list}>
        <div className={styles.lh}>
          <span className={styles.brand}>
            <img src={IMG.logo} alt="" />
            Unified Inbox
          </span>
        </div>
        <div className={styles.rows}>
          <div className={cx(styles.rw, frame.rowNew && styles.rwNew)}>
            <div className={cx(styles.row, styles.rowSel, frame.rowNew && styles.rowNew)}>
              <img className={styles.av24} src={IMG.sara} alt="" />
              <div className={styles.rmain}>
                <div className={styles.rtop}>
                  <span className={styles.rname}>Sara Mitchell</span>
                  <span className={styles.recov}>
                    <Fic d={ICON.bolt} />
                    Recovered
                  </span>
                  <span className={styles.rtime}>{prevTime}</span>
                </div>
                <div className={styles.rprev}>
                  {prevOut ? <Ico d={ICON.back} /> : null}
                  <span className={styles.rtxt}>{prevText}</span>
                </div>
              </div>
            </div>
          </div>
          {OTHER_ROWS.map((row) => (
            <div className={styles.rw} key={row.name + row.time}>
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
                    {row.out ? <Ico d={ICON.back} /> : null}
                    <span className={styles.rtxt}>{row.prev}</span>
                    {row.unread ? <span className={styles.unread}>{row.unread}</span> : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.chat}>
        <header className={styles.head}>
          <div className={styles.hl}>
            <span className={styles.lead}>Sara Mitchell</span>
            <span className={styles.life}>
              <span className={styles.lifeA}>
                {frame.stage === "won" ? (
                  <Ico d={ICON.trophy} className={styles.stWon} />
                ) : frame.stage === "booked" ? (
                  <Ico d={ICON.calCheck} className={styles.stBooked} />
                ) : (
                  <Ico d={ICON.userPlus} className={styles.stLead} />
                )}
                <span>{stageLabel(frame.stage)}</span>
              </span>
              <span className={styles.lifeB}>
                <Ico d={ICON.chevR} />
              </span>
            </span>
          </div>
          <span className={cx(styles.asg, frame.dd && styles.asgOpen)}>
            <img src={IMG.john} alt="" />
            <span>{frame.asg === 2 ? "John & Joanna" : "John Doe"}</span>
            <Ico d={ICON.chevD} />
          </span>
          {frame.dd ? <AssigneeMenu frame={frame} /> : null}
        </header>

        <div className={styles.thread}>
          {items.map((item) => (
            <div className={styles.it} key={item}>
              <ThreadEntry item={item} frame={frame} />
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

        <Composer frame={frame} />
      </section>

      <ContactPanel frame={frame} statusDot={statusDot} />

      <aside className={styles.rail}>
        <span className={cx(styles.rb, styles.rbOn)}>
          <Ico d={ICON.user} />
        </span>
        <span className={styles.rb}>
          <Ico d={ICON.phone} />
        </span>
        <span className={styles.rb}>
          <Ico d={ICON.note} />
        </span>
        <span className={styles.rb}>
          <Ico d={ICON.video} />
        </span>
      </aside>

      {frame.modal ? (
        <RecordingModal
          frame={frame}
          playing={videoPlaying}
          time={time}
          progress={progress}
          hovered={hovered}
          collectVideo={collectVideo}
        />
      ) : null}

      <div className={styles.curs}>
        {[
          { c: frame.a, color: "#2563EB", label: "John · Closer", click: frame.ca },
          { c: frame.b, color: "#9333EA", label: "Joanna · Sales Manager", click: frame.cb },
        ].map((cur) => (
          <div
            className={styles.cur}
            key={cur.label}
            style={{ transform: `translate(${cur.c.x}px, ${cur.c.y}px)`, opacity: cur.c.show ? 1 : 0 }}
          >
            {cur.click ? <span className={styles.ring} style={{ borderColor: cur.color }} /> : null}
            <svg className={styles.cursvg} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2 1.5V19l4.8-4.4 3.1 7 3.2-1.4-3-6.9h6.4z" fill={cur.color} />
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

function AssigneeMenu({ frame }: { frame: EngageFrame }) {
  return (
    <div className={styles.ddp}>
      <div className={styles.dds}>
        <div className={styles.ddi}>
          <Ico d={ICON.search} />
          <span>Search</span>
        </div>
      </div>
      <div className={styles.ddl}>Assignee(s)</div>
      <div className={styles.ddr}>
        <span className={cx(styles.cb, styles.cbOn)}>
          <Ico d={ICON.check} />
        </span>
        <img className={styles.av20} src={IMG.john} alt="" />
        <span>John Doe</span>
      </div>
      <div className={styles.ddsep} />
      <div className={cx(styles.ddr, styles.ddrHov)}>
        <span className={cx(styles.cb, frame.asg === 2 && styles.cbOn)}>
          {frame.asg === 2 ? <Ico d={ICON.check} /> : null}
        </span>
        <img className={styles.av20} src={IMG.joanna} alt="" />
        <span>Joanna Reyes</span>
      </div>
      <div className={styles.ddr}>
        <span className={styles.cb} />
        <img className={styles.av20} src={IMG.marcus} alt="" />
        <span>Marcus Reid</span>
      </div>
      <div className={styles.ddr}>
        <span className={styles.cb} />
        <span className={cx(styles.av20, styles.gini)}>S</span>
        <span>Scott Bennett</span>
      </div>
      <div className={styles.unas}>
        <Ico d={ICON.userMinus} />
        Unassign
      </div>
    </div>
  );
}

function ThreadEntry({ item, frame }: { item: ThreadItem; frame: EngageFrame }) {
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
            <Ico d={ICON.checks} />
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
                <img src={IMG.mark} alt="" />
              </span>
            </span>
            <span className={styles.badge}>
              <img src={IMG.whatsapp} alt="" />
            </span>
            {frame.tip ? (
              <div className={styles.tip}>
                Sent automatically by your iClosed AI Agent.<span>View automation ↗</span>
              </div>
            ) : null}
          </div>
        </div>
      );
    case "sara1":
      return (
        <div className={styles.msg}>
          <div className={styles.avc}>
            <img className={styles.av28} src={IMG.sara} alt="" />
            <span className={styles.badge}>
              <img src={IMG.whatsapp} alt="" />
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
            <img className={styles.av16} src={IMG.john} alt="" />
            <b>John Doe</b>
            <span className={styles.evr}>
              <Ico d={ICON.ccheck} className={styles.ok} />
              <span className={cx(styles.mut, styles.m5)}>Confirmed by</span>
              <b>Sara Mitchell</b>
              <span className={styles.evdiv} />
              <span className={styles.mut}>9:06 PM</span>
              <Ico d={ICON.chevR} className={styles.chev} />
            </span>
          </div>
        </div>
      );
    case "rec":
      return (
        <div className={styles.ev}>
          <div className={styles.evh}>
            <img className={styles.zi} src={IMG.zoom} alt="" />
            <b>Zoom recording available</b>
            <span className={styles.evr}>
              <span className={styles.mut}>Today, 2:30 PM</span>
              <Ico d={ICON.chevD} className={styles.chev} />
            </span>
          </div>
          <div className={styles.recb}>
            <img className={styles.thumb} src={IMG.closerThumb} alt="" />
            <div className={styles.rect}>
              <span>Tue Oct 6, 2:30 PM – 3:04 PM</span>
              <b>John Doe with Sara Mitchell • Strategy Call</b>
            </div>
            <span className={cx(styles.vrec, frame.recHover && styles.vrecHov)}>
              <Fic d={ICON.play} />
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
            <Ico d={ICON.checks} />
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
            <img className={styles.av28} src={IMG.joanna} alt="" />
            <span className={styles.badge}>
              <img src={IMG.gmail} alt="" />
            </span>
          </div>
        </div>
      );
    case "paid":
      return (
        <div className={styles.ev}>
          <div className={styles.evh}>
            <span className={styles.paytile}>
              <Ico d={ICON.dollar} />
            </span>
            <b>Payment received</b>
            <b className={styles.green}>$5,000</b>
            <span className={styles.evr}>
              <span className={styles.mut}>3:41 PM</span>
              <Ico d={ICON.chevR} className={styles.chev} />
            </span>
          </div>
        </div>
      );
  }
}

const COMPOSER_TOOLS = [ICON.smile, ICON.mic, ICON.upload, ICON.variable, ICON.template, ICON.note, ICON.chevR];

function Composer({ frame }: { frame: EngageFrame }) {
  return (
    <div className={styles.comp}>
      <div className={styles.cr1}>
        <span className={cx(styles.chan, frame.chanDD && styles.chanOpen)}>
          {frame.chan === "email" ? (
            <>
              <img src={IMG.gmail} alt="" />
              Email
              <i>· sara.mitchell@gmail.com</i>
            </>
          ) : (
            <>
              <img src={IMG.whatsapp} alt="" />
              WhatsApp
              <i>· +1 415 902 9123</i>
            </>
          )}
          <Ico d={ICON.chevU} />
        </span>
      </div>
      {frame.chanDD ? (
        <div className={styles.chm}>
          <div className={styles.chl}>Reply via</div>
          {CHANNELS.map((ch) => (
            <div className={cx(styles.chr, frame.chHov === ch.id && styles.chrHov)} key={ch.id}>
              <img src={ch.icon} alt="" />
              <span>{ch.label}</span>
              <i>{ch.sub}</i>
              {frame.chan === ch.id ? <Ico d={ICON.check} /> : null}
            </div>
          ))}
        </div>
      ) : null}
      <div className={styles.ed}>
        {frame.compText ? (
          <span className={styles.typed}>
            Here’s your secure link to lock in your spot: <span className={styles.lnk}>buy.stripe.com/eVa288</span>
          </span>
        ) : (
          <span className={styles.ph}>Use &apos;#&apos; for templates, &apos;$&apos; for variables</span>
        )}
      </div>
      <div className={styles.cr3}>
        {COMPOSER_TOOLS.map((d) => (
          <span className={styles.tb} key={d}>
            <Ico d={d} />
          </span>
        ))}
        <span className={styles.cnt}>{frame.compText ? "67/2000 characters" : "0/2000 characters"}</span>
        <span className={cx(styles.send, frame.compText && styles.sendOn)}>
          <Ico d={ICON.send} />
          Send
        </span>
      </div>
    </div>
  );
}

function ContactPanel({ frame, statusDot }: { frame: EngageFrame; statusDot: string }) {
  return (
    <aside className={styles.np}>
      <div className={styles.nph}>
        <span>Contact details</span>
        <span className={styles.npx}>
          <Ico d={ICON.x} />
        </span>
      </div>
      <div className={styles.ctabs}>
        <span className={cx(styles.ctab, styles.ctabOn)}>
          <Ico d={ICON.listd} />
          Details
        </span>
        <span className={styles.ctab}>
          <Ico d={ICON.help} />
          Invitee questions
        </span>
        <span className={styles.cexp}>
          <Ico d={ICON.expand} />
        </span>
      </div>
      <div className={styles.cbody}>
        <div className={styles.csec}>
          <Ico d={ICON.chevD} />
          Basic details
        </div>
        <div className={styles.fields}>
          <div className={styles.fr}>
            <span className={styles.fl}>
              <Ico d={ICON.cal} />
              <span>Last Call Book From</span>
            </span>
            <span className={styles.fv}>
              <span className={styles.evbar} />
              <span className={styles.t}>Strategy Call</span>
            </span>
          </div>
          <Field icon={ICON.mail} label="Email" value="sara.mitchell@gmail.com" />
          <Field icon={ICON.phone} label="Phone number" value="+1 415 902 9123" />
          <div className={cx(styles.fr, frame.statusDD && styles.frHov)}>
            <span className={styles.fl}>
              <Ico d={ICON.status} />
              <span>Status</span>
            </span>
            <span className={styles.fv}>
              <span className={styles.sdot8} style={{ background: statusDot }} />
              <span className={styles.t}>{frame.status === "hot" ? "Hot lead" : "Warm"}</span>
              <Ico d={ICON.chevD} />
            </span>
            {frame.statusDD ? (
              <div className={styles.sdd}>
                {STATUSES.map((s) => (
                  <div className={cx(styles.sdr, frame.stHov && s.id === "hot" && styles.sdrHov)} key={s.id}>
                    <span className={styles.sdot8} style={{ background: s.dot }} />
                    <span>{s.label}</span>
                    {s.id === frame.status ? <Ico d={ICON.check} /> : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className={styles.fr}>
            <span className={styles.fl}>
              <Ico d={ICON.user} />
              <span>Closer owner</span>
            </span>
            <span className={styles.fv}>
              <img className={styles.av18} src={IMG.john} alt="" />
              <span className={styles.t}>John Doe</span>
            </span>
          </div>
          <Field icon={ICON.stairs} label="Contact stage" value={stageLabel(frame.stage)} />
          <div className={styles.fr}>
            <span className={styles.fl}>
              <Ico d={ICON.user} />
              <span>Setter owner</span>
            </span>
            <span className={styles.fv}>
              <span className={cx(styles.t, styles.dash)}>--</span>
            </span>
          </div>
        </div>
        <div className={styles.showall}>
          Show all values
          <Ico d={ICON.chevD} />
        </div>
      </div>
    </aside>
  );
}

function Field({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className={styles.fr}>
      <span className={styles.fl}>
        <Ico d={icon} />
        <span>{label}</span>
      </span>
      <span className={styles.fv}>
        <span className={styles.t}>{value}</span>
      </span>
    </div>
  );
}

type RecordingModalProps = {
  frame: EngageFrame;
  playing: boolean;
  time: string;
  progress: string;
  hovered: (typeof CALL_COMMENTS)[number] | undefined;
  collectVideo: (el: HTMLVideoElement | null) => void;
};

function RecordingModal({ frame, playing, time, progress, hovered, collectVideo }: RecordingModalProps) {
  return (
    <div className={styles.mbk}>
      <div className={styles.mod}>
        <div className={styles.mh}>
          <img src={IMG.zoom} alt="" />
          <b>Zoom recording</b>
          <span className={styles.bdg}>
            <Ico d={ICON.video} />
            Video
          </span>
          <span className={styles.mhr}>
            <span className={styles.obtn}>
              <Ico d={ICON.link} />
              Copy recording link
            </span>
            <span className={styles.xbtn}>
              <Ico d={ICON.x} />
            </span>
          </span>
        </div>

        <div className={styles.ml}>
          <div className={styles.mt}>
            <h3>Strategy Call — Sara Mitchell</h3>
            <span className={styles.mavs}>
              <img className={styles.av36} src={IMG.john} alt="" />
              <img className={cx(styles.av36, styles.av36R)} src={IMG.sara} alt="" />
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
                  className={styles.v}
                  ref={collectVideo}
                  src={VIDEO.closerLoop}
                  poster={IMG.closerPoster}
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
                <span className={styles.tag}>John Doe</span>
              </div>
              <div className={styles.tile}>
                <video
                  className={styles.v}
                  ref={collectVideo}
                  src={VIDEO.leadLoop}
                  poster={IMG.leadPoster}
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
                <span className={styles.tag}>Sara Mitchell</span>
              </div>
              {playing ? null : (
                <span className={styles.play}>
                  <Fic d={ICON.play} />
                </span>
              )}
            </div>

            <div className={styles.tl}>
              <div className={styles.lane}>
                {CALL_COMMENTS.map((c) => (
                  <span
                    className={cx(styles.mk, frame.hover === c.id && styles.mkSel)}
                    style={{ left: Math.round(c.pct * LANE_WIDTH) }}
                    key={c.id}
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
                      <img className={styles.av24p} src={hovered.photo ?? IMG.john} alt="" />
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
                        <Ico d={ICON.back} />
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
              <span className={styles.mb}>{playing ? <Fic d={ICON.pause} /> : <Fic d={ICON.play} />}</span>
              <span className={styles.mb}>
                <Ico d={ICON.rwd} />
              </span>
              <span className={styles.mb}>
                <Ico d={ICON.fwd} />
              </span>
              <span className={styles.time}>
                {time} <span>/ 34:12</span>
              </span>
              <span className={styles.sp} />
              <span className={styles.mb}>
                <Ico d={ICON.msgPlus} />
                Comment
              </span>
              <span className={styles.mb}>
                1x
                <Ico d={ICON.chevD} className={styles.icoS} />
              </span>
              <span className={styles.mb}>
                <Ico d={ICON.vol} />
              </span>
              <span className={styles.mb}>
                <Ico d={ICON.max} />
              </span>
            </div>
          </div>
        </div>

        <div className={styles.mr}>
          <div className={styles.tabs}>
            <span className={cx(styles.tab, styles.tabOn)}>
              <Ico d={ICON.msg} />
              Comments
              <span className={styles.tcnt}>3</span>
            </span>
            <span className={styles.tab}>
              <Ico d={ICON.notes} />
              Summary
            </span>
            <span className={styles.tab}>
              <Ico d={ICON.notes} />
              Transcript
            </span>
          </div>
          <div className={styles.cl}>
            {CALL_COMMENTS.map((c) => (
              <article className={cx(styles.cmt, frame.hover === c.id && styles.cmtSel)} key={c.id}>
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
                      <Ico d={ICON.back} />
                      Reply
                    </span>
                    <span className={styles.kb}>
                      <Ico d={ICON.dots} className={styles.dotico} />
                    </span>
                  </div>
                  <div>
                    <span className={styles.ment}>{c.ment}</span>
                    {c.post}
                  </div>
                  {c.replies ? (
                    <div className={styles.rpl}>
                      <img src={IMG.john} alt="" />
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
                <Ico d={ICON.smile} />
              </span>
              <span className={styles.tb}>
                <Ico d={ICON.at} />
              </span>
              <span className={styles.cat}>Comment at {time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
