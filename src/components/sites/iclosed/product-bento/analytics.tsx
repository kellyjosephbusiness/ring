"use client";

import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";
import { useId } from "react";

import { useCountUp } from "./bento-hooks";
import styles from "./analytics.module.css";

const PERIODS = ["Day", "Week", "Month", "Quarter", "Year"] as const;
type Period = (typeof PERIODS)[number];

const ICON_CALENDAR =
  "M2.68055 2.34548V1.00521M5.36111 2.34548V1.00521M2.34548 3.68576H5.69618M1.67535 7.03645H6.36632C6.54405 7.03645 6.7145 6.96585 6.84018 6.84018C6.96585 6.7145 7.03645 6.54405 7.03645 6.36632V2.34548C7.03645 2.16775 6.96585 1.9973 6.84018 1.87163C6.7145 1.74595 6.54405 1.67535 6.36632 1.67535H1.67535C1.49761 1.67535 1.32716 1.74595 1.20149 1.87163C1.07581 1.9973 1.00521 2.16775 1.00521 2.34548V6.36632C1.00521 6.54405 1.07581 6.7145 1.20149 6.84018C1.32716 6.96585 1.49761 7.03645 1.67535 7.03645Z";
const ICON_PHONE =
  "M1.20149 1.20149C1.07581 1.32716 1.00521 1.49761 1.00521 1.67535V2.01042C1.00521 4.78613 3.25553 7.03645 6.03125 7.03645H6.36632C6.54405 7.03645 6.7145 6.96585 6.84018 6.84018C6.96585 6.7145 7.03645 6.54405 7.03645 6.36632V5.26762C7.03647 5.19727 7.01434 5.1287 6.97321 5.07162C6.93207 5.01455 6.87402 4.97187 6.80727 4.94964L5.3018 4.44771C5.22529 4.42228 5.14218 4.42528 5.06771 4.45618C4.99324 4.48708 4.9324 4.54379 4.89637 4.61591L4.51774 5.37217C3.69731 5.00147 3.04019 4.34435 2.6695 3.52392L3.42575 3.1453C3.49787 3.10926 3.55459 3.04843 3.58548 2.97396C3.61638 2.89948 3.61939 2.81637 3.59395 2.73986L3.09202 1.2344C3.06981 1.1677 3.02718 1.10968 2.97017 1.06855C2.91317 1.02742 2.84467 1.00526 2.77437 1.00521H1.67535C1.49761 1.00521 1.32716 1.07581 1.20149 1.20149Z";
const ICON_X_CIRCLE =
  "M3.35069 4.69097L4.02083 4.02083M4.02083 4.02083L4.69097 3.35069M4.02083 4.02083L3.35069 3.35069M4.02083 4.02083L4.69097 4.69097M7.03645 4.02083C7.03645 4.41685 6.95845 4.80899 6.8069 5.17486C6.65535 5.54073 6.43323 5.87317 6.1532 6.1532C5.87317 6.43323 5.54073 6.65535 5.17486 6.8069C4.80899 6.95845 4.41685 7.03645 4.02083 7.03645C3.62481 7.03645 3.23267 6.95845 2.8668 6.8069C2.50093 6.65535 2.16849 6.43323 1.88846 6.1532C1.60844 5.87317 1.38631 5.54073 1.23476 5.17486C1.08321 4.80899 1.00521 4.41685 1.00521 4.02083C1.00521 3.22104 1.32292 2.454 1.88846 1.88846C2.454 1.32292 3.22104 1.00521 4.02083 1.00521C4.82062 1.00521 5.58766 1.32292 6.1532 1.88846C6.71874 2.454 7.03645 3.22104 7.03645 4.02083Z";

/** Sales-breakdown line chart: point positions in the 430.69×101.534 plot. */
const SALES_POINTS = [
  [34.24, 87.5],
  [76.09, 71.53],
  [111.86, 63.92],
  [146.1, 57.07],
  [184.9, 54.03],
  [224.48, 50.98],
  [282.31, 43.37],
  [319.59, 28.92],
  [353.08, 15.98],
  [389.6, 9.13],
  [427.65, 3.04],
] as const;

/** Strategy-call outcomes per bar: [gray, red, blue] stack heights in px. */
const STRATEGY_BARS = [
  [5, 13, 45],
  [9, 8, 30],
  [4, 6, 30],
  [2, 5, 50],
  [2, 15, 38],
  [1, 3, 28],
] as const;

/** No-sale reasons per bar: stack heights in px, light → dark blue. */
const NOSALE_COLORS = ["#c3ddfd", "#a4cafe", "#76a9fa", "#3f83f8", "#1e429f"] as const;
const NOSALE_BARS = [
  [11, 13, 12, 14, 12.725],
  [8.042, 15.279, 9.248, 18.496, 15.681],
  [23.321, 11.258, 16.887, 4.423],
  [15.279, 12.465, 12.062, 20.506],
  [20.908, 11.258, 12.465, 9.248],
  [17.29, 24.125, 6.433, 9.248],
] as const;

const indexVar = (i: number) => ({ "--i": i }) as CSSProperties;

function HeaderIcon({ d }: { d: string }) {
  return (
    <svg
      className={styles.ico}
      viewBox="0 0 8.04166 8.04166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={d} stroke="#111928" strokeWidth="0.603125" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PeriodToggle({ active }: { active: Period }) {
  return (
    <div className={styles.tog}>
      <div className={styles.togInner}>
        {PERIODS.map((period) => (
          <div key={period} className={clsx(styles.togSeg, period === active && styles.togSegActive)}>
            {period}
          </div>
        ))}
      </div>
    </div>
  );
}

function PanelHeader({ icon, title, sub, period }: { icon: string; title: string; sub: string; period: Period }) {
  return (
    <div className={styles.hd}>
      <div className={styles.hdRow}>
        <div className={styles.hdLeft}>
          <HeaderIcon d={icon} />
          <span className={styles.hdTitle}>{title}</span>
        </div>
        <PeriodToggle active={period} />
      </div>
      <div className={styles.hdSub}>{sub}</div>
    </div>
  );
}

function MiniChart({ ticks, bars }: { ticks: readonly string[]; bars: ReactNode }) {
  return (
    <div className={styles.body}>
      <div className={styles.miniChart}>
        <div className={clsx(styles.yaxis, styles.miniYaxis)}>
          {ticks.map((tick) => (
            <span key={tick} className={styles.ylbl}>
              {tick}
            </span>
          ))}
        </div>
        <div className={styles.miniPlotcol}>
          <div className={styles.miniPlot}>
            <div className={styles.grid}>
              {ticks.map((tick) => (
                <span key={tick} />
              ))}
            </div>
            <div className={styles.miniBars}>{bars}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Card 4 — "Your CMO & sales manager won’t believe it!": an analytics
 * dashboard whose panels, bars, line and counters build in over ~2.5s. */
export function AnalyticsGraphic({ play = false }: { play?: boolean }) {
  const areaId = `${useId()}anSalesArea`;
  const views = useCountUp(play, 2123, { delay: 500, duration: 900 });
  const contacts = useCountUp(play, 1281, { delay: 650, duration: 900 });
  const calls = useCountUp(play, 648, { delay: 800, duration: 900 });
  const toContacts = useCountUp(play, 60, { delay: 1100, duration: 800, suffix: "%" });
  const toCalls = useCountUp(play, 30, { delay: 1250, duration: 800, suffix: "%" });
  const revenue = useCountUp(play, 25120, { delay: 1400, duration: 800, prefix: "$" });
  const won = useCountUp(play, 21000, { delay: 1500, duration: 800, prefix: "$" });
  const deposits = useCountUp(play, 2240, { delay: 1600, duration: 800, prefix: "$" });
  const recurring = useCountUp(play, 1880, { delay: 1700, duration: 800, prefix: "$" });

  const salesChips = [
    { value: revenue, label: "Total Revenue" },
    { value: won, count: "12", label: "WON" },
    { value: deposits, count: "4", label: "Deposits" },
    { value: recurring, count: "4", label: "Recurring" },
  ];

  return (
    <div className={clsx(styles.root, play && styles.isPlay)}>
      <div className={styles.window}>
        <div className={styles.navbar}>
          <span className={styles.navtitle}>Analytics</span>
        </div>

        {/* Scheduling funnel */}
        <div className={clsx(styles.card, styles.cardFunnel)}>
          <div className={clsx(styles.hd, styles.hdTight)}>
            <div className={styles.hdRow}>
              <div className={styles.hdLeft}>
                <HeaderIcon d={ICON_CALENDAR} />
                <span className={styles.hdTitle}>Scheduling funnel</span>
              </div>
            </div>
            <div className={styles.hdSub}>Shows the conversion to contacts created and calls created</div>
          </div>
          <div className={styles.fnBody}>
            <div className={styles.fnChart}>
              <div className={styles.fnCols}>
                <div className={styles.fnDiv} />
                <div className={styles.fnCol}>
                  <div className={styles.fnData}>
                    <div className={styles.fnLabel}>No. of views</div>
                    <div className={styles.fnValue}>{views}</div>
                  </div>
                  <div className={clsx(styles.fnGraph, styles.fnGraphViews)}>
                    <div className={styles.fnBarViews} />
                    <svg className={styles.fnArea} viewBox="0 0 91.3124 105.009" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M91.3124 10.901L0 0V105.009H91.3124V10.901Z" fill="#EBF5FF" />
                    </svg>
                  </div>
                </div>
                <div className={styles.fnDiv} />
                <div className={styles.fnCol}>
                  <div className={styles.fnData}>
                    <div className={styles.fnLabel}>Contacts</div>
                    <div className={styles.fnValue}>{contacts}</div>
                  </div>
                  <div className={clsx(styles.fnGraph, styles.fnGraphContacts)}>
                    <div className={styles.fnBarContacts}>
                      <div className={styles.fnBarContactsTop} />
                      <div className={styles.fnBarContactsBot} />
                    </div>
                    <svg className={styles.fnArea} viewBox="0 0 91.3124 93.5953" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M91.3124 34.7466L0 0V93.5953H91.3124V34.7466Z" fill="#EBF5FF" />
                    </svg>
                  </div>
                </div>
                <div className={styles.fnDiv} />
                <div className={styles.fnCol}>
                  <div className={styles.fnData}>
                    <div className={styles.fnLabel}>Calls created</div>
                    <div className={styles.fnValue}>{calls}</div>
                  </div>
                  <div className={clsx(styles.fnGraph, styles.fnGraphCalls)}>
                    <div className={styles.fnBarCalls} />
                    <svg className={styles.fnArea} viewBox="0 0 91.3124 58.5922" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M91.3124 0H0V58.5922H91.3124V0Z" fill="#EBF5FF" />
                    </svg>
                  </div>
                </div>
                <div className={styles.fnDiv} />
              </div>
            </div>
            <div className={styles.fnRates}>
              <div className={styles.fnRate}>
                <div className={styles.fnRateVal}>{toContacts}</div>
                <div className={styles.fnRateLbl}>Conversion to contacts</div>
              </div>
              <div className={styles.fnRate}>
                <div className={styles.fnRateVal}>{toCalls}</div>
                <div className={styles.fnRateLbl}>Conversion to calls created</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sales breakdown */}
        <div className={clsx(styles.card, styles.cardSales)}>
          <PanelHeader
            icon={ICON_X_CIRCLE}
            title="Sales breakdown"
            sub="Shows the conversion to contacts created and calls created"
            period="Day"
          />
          <div className={styles.body}>
            <div className={styles.slChart}>
              <div className={clsx(styles.yaxis, styles.slYaxis)}>
                {["30k", "20k", "10k", "0"].map((tick) => (
                  <span key={tick} className={styles.ylbl}>
                    {tick}
                  </span>
                ))}
              </div>
              <div className={styles.slPlot}>
                <div className={styles.grid}>
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <svg className={styles.slSvg} viewBox="0 0 430.69 101.534" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <defs>
                    <linearGradient id={areaId} x1="214.204" y1="3.15" x2="214.204" y2="142.2" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1C64F2" stopOpacity="0.15" />
                      <stop offset="1" stopColor="#1C64F2" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    className={styles.slArea}
                    d="M428.408 101.205V2.28281L351.537 15.9172L282.057 43.476L214.056 51.5987L144.872 57.4005L77.1666 71.0349L0 101.205H428.408Z"
                    fill={`url(#${areaId})`}
                  />
                  <path
                    className={styles.slLine}
                    pathLength={1}
                    d="M0.380469 100.824L76.8546 71.1476L145.719 57.4507L214.965 51.7437L282.308 43.7539L318.833 29.6765L352.694 15.5992L377.044 11.7945L408.243 6.0875L428.408 2.66328"
                    stroke="#233876"
                    strokeWidth="2"
                  />
                  {SALES_POINTS.map(([cx, cy], i) => (
                    <circle key={cx} className={styles.slDot} cx={cx} cy={cy} r="3.04" fill="#233876" style={indexVar(i)} />
                  ))}
                </svg>
              </div>
            </div>
            <div className={styles.slChips}>
              {salesChips.map((chip, i) => (
                <div key={chip.label} className={clsx(styles.slChip, i === 0 && styles.slChipRev)} style={indexVar(i)}>
                  <div className={styles.slChipVal}>{chip.value}</div>
                  <div className={styles.slChipSub}>
                    {chip.count ? <span className={styles.slChipCount}>{chip.count}</span> : null}
                    <span className={styles.slChipLbl}>{chip.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategy call outcomes */}
        <div className={clsx(styles.card, styles.cardStrategy)}>
          <PanelHeader
            icon={ICON_PHONE}
            title="Strategy Call Outcomes"
            sub="Shows how many Strategy Calls have been converted to Sales or No Sales"
            period="Week"
          />
          <MiniChart
            ticks={["400", "300", "200", "100", "0"]}
            bars={STRATEGY_BARS.map(([gray, red, blue], i) => (
              <div key={i} className={styles.miniBar} style={indexVar(i)}>
                <span className={styles.stGray} style={{ height: `${gray}px` }} />
                <span className={styles.stRed} style={{ height: `${red}px` }} />
                <span className={styles.stBlue} style={{ height: `${blue}px` }} />
              </div>
            ))}
          />
        </div>

        {/* No sale reasons */}
        <div className={clsx(styles.card, styles.cardNosale)}>
          <PanelHeader icon={ICON_X_CIRCLE} title="No Sale reasons" sub="Shows a breakdown of No Sale reasons" period="Week" />
          <MiniChart
            ticks={["100", "75", "50", "25", "0"]}
            bars={NOSALE_BARS.map((stack, i) => (
              <div key={i} className={styles.miniBar} style={indexVar(i)}>
                {stack.map((h, j) => (
                  <span key={j} style={{ height: `${h}px`, background: NOSALE_COLORS[j] }} />
                ))}
              </div>
            ))}
          />
        </div>
      </div>
    </div>
  );
}
