import { IMG } from "./assets";
import styles from "./measure-panel.module.css";
import { cx } from "./utils";

/* "Measure": the iClosed analytics dashboard. Static markup; the cards fade
   up and the bars grow on mount (CSS), so it replays every time the tab
   opens. */

const KPIS = [
  { key: "recovered", label: "Recovered pipeline", value: "$233,540", delta: "22.5%", highlight: true },
  { key: "speed", label: "Speed to lead", value: "1m 48s", delta: "21%" },
  { key: "extra", label: "Extra calls booked", value: "214", delta: "21%" },
];

const NAV_TOP = [IMG.navHome, IMG.navCalendar, IMG.navGrid, IMG.navUsers, IMG.navMessage];
const NAV_ACTIVE = IMG.navGrid;
const NAV_BOTTOM = [IMG.navIntegrations, IMG.navSettings];

const FUNNEL = [
  {
    label: "No. of views",
    value: "2,123",
    graph: "funnelGraphViews",
    viewBox: "0 0 91.3124 105.009",
    d: "M91.3124 10.901L0 0V105.009H91.3124V10.901Z",
  },
  {
    label: "Contacts",
    value: "1,281",
    graph: "funnelGraphContacts",
    viewBox: "0 0 91.3124 93.5953",
    d: "M91.3124 34.7466L0 0V93.5953H91.3124V34.7466Z",
  },
  {
    label: "Calls created",
    value: "648",
    graph: "funnelGraphCalls",
    viewBox: "0 0 91.3124 58.5922",
    d: "M91.3124 0H0V58.5922H91.3124V0Z",
  },
] as const;

const CALL_BARS = [57.4, 76.1, 67.3, 86.1, 80.5, 97.1, 90.5, 105.9, 99.3, 119.2, 130.2, 145.7];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CALLS_Y: [string, number][] = [
  ["1.5k", 7.6],
  ["1k", 44.13],
  ["500", 80.66],
  ["250", 117.19],
  ["0", 154.47],
];
const CALLS_GRID = [7.6, 44.13, 80.66, 117.19];

const STATS = [
  { key: "closing", title: "Closing %", subtitle: "Based on Won deals", value: "65%" },
  { key: "engagement", title: "Engagement %", subtitle: "Based on Won & Deposit", value: "56%" },
  { key: "showup", title: "Show up %", subtitle: "Based on call outcome", value: "72%" },
];

const SALES_Y: [string, number][] = [
  ["30k", 0.4],
  ["20k", 33.63],
  ["10k", 66.85],
  ["0", 100.06],
];
const SALES_GRID = [0, 33.23, 66.45, 99.68];
const SALES_POINTS: [number, number][] = [
  [34.2422, 87.5078],
  [76.0937, 71.5281],
  [111.858, 63.9187],
  [146.1, 57.0703],
  [184.908, 54.0265],
  [224.476, 50.9828],
  [282.308, 43.3734],
  [319.594, 28.9156],
  [353.075, 15.9797],
  [389.6, 9.13124],
  [427.647, 3.04375],
];
const SALES_STATS = [
  { value: "$21,000", count: "12", label: "WON" },
  { value: "$2,240", count: "4", label: "Deposits" },
  { value: "$1,880", count: "4", label: "Recurring" },
];

const RANGES = ["Day", "Week", "Month", "Quarter", "Year"];

export function MeasurePanel() {
  return (
    <div className={styles.panel} data-shot="">
      <div className={styles.window}>
        <Sidebar />
        <div className={styles.topbar}>
          <img className={styles.topbarIcon} src={IMG.navCalendar} alt="" />
          <span className={styles.topbarTitle}>Analytics</span>
        </div>

        <div className={styles.kpis}>
          {KPIS.map((kpi) => (
            <div className={cx(styles.kpi, kpi.highlight && styles.kpiHighlight)} key={kpi.key}>
              <div className={styles.kpiTop}>
                <div className={styles.kpiLabel}>{kpi.label}</div>
                <div className={styles.kpiValue}>{kpi.value}</div>
              </div>
              <div className={styles.kpiMeta}>
                <div className={styles.kpiBadge}>
                  <img src={IMG.arrowUpGreen} alt="" />
                  <span>{kpi.delta}</span>
                </div>
                <span className={styles.kpiPeriod}>Lifetime</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.row2}>
          <div className={styles.funnelCard}>
            <CardHead
              icon={IMG.cardCalendar}
              title="Scheduling funnel"
              subtitle="No. of scheduler views, contacts captured, calls created & their conversion rates."
            />
            <FunnelBody />
          </div>
          <div className={styles.callsCard}>
            <CardHead
              icon={IMG.cardPhone}
              title="Calls created breakdown"
              subtitle="Shows the amount of calls created during specific time frame"
              toggleActive="Month"
            />
            <div className={styles.callsBody}>
              <div className={styles.callsInner}>
                <div className={styles.callsYaxis}>
                  {CALLS_Y.map(([label, top]) => (
                    <span className={styles.callsYlabel} style={{ top: `${top - 7.6}px` }} key={label}>
                      {label}
                    </span>
                  ))}
                </div>
                <div className={styles.callsPlotcol}>
                  <div className={styles.callsPlot}>
                    {CALLS_GRID.map((top) => (
                      <div className={styles.callsGridline} style={{ top: `${top}px` }} key={top} />
                    ))}
                    <div className={styles.callsBars}>
                      {CALL_BARS.map((h, i) => (
                        <div className={styles.callsBar} style={{ height: `${h}px` }} key={i} />
                      ))}
                    </div>
                  </div>
                  <div className={styles.callsXaxis}>
                    {MONTHS.map((m) => (
                      <span className={styles.callsXlabel} key={m}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.row3}>
          {STATS.map((stat) => (
            <div className={styles.statCard} key={stat.key}>
              <div className={styles.cardHead}>
                <div className={styles.statHeadRow}>
                  <div className={styles.cardHeadLeft}>
                    <img className={styles.cardHeadIcon} src={IMG.cardDiscount} alt="" />
                    <span className={styles.cardHeadTitle}>{stat.title}</span>
                    <img className={styles.cardHeadInfo} src={IMG.infoCircle} alt="" />
                  </div>
                </div>
                <div className={styles.cardHeadSub}>{stat.subtitle}</div>
              </div>
              <div className={styles.statBody}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statBadge}>
                  <img src={IMG.arrowUpSolid} alt="" />
                  <span>32%</span>
                </div>
                <div className={styles.statPeriod}>Last 30 days</div>
              </div>
            </div>
          ))}
          <div className={styles.salesCard}>
            <CardHead
              icon={IMG.cardDollar}
              title="Sales breakdown"
              subtitle="Shows the revenue you have made based on the deals added"
              toggleActive="Month"
            />
            <SalesBody />
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <img src={IMG.logo} alt="" />
      </div>
      <div className={styles.sidebarNav}>
        <div className={styles.sidebarTop}>
          {NAV_TOP.map((icon) => (
            <div className={styles.navItem} key={icon}>
              <div className={cx(styles.navLink, icon === NAV_ACTIVE && styles.navLinkActive)}>
                <img src={icon} alt="" />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.sidebarBottom}>
          {NAV_BOTTOM.map((icon) => (
            <div className={styles.navItem} key={icon}>
              <div className={styles.navLink}>
                <img src={icon} alt="" />
              </div>
            </div>
          ))}
          <div className={styles.sidebarAvatarWrap}>
            <div className={styles.sidebarAvatarBox}>
              <img className={styles.sidebarAvatar} src={IMG.sidebarAvatar} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type CardHeadProps = { icon: string; title: string; subtitle: string; toggleActive?: string };

function CardHead({ icon, title, subtitle, toggleActive }: CardHeadProps) {
  return (
    <div className={styles.cardHead}>
      <div className={styles.cardHeadRow}>
        <div className={styles.cardHeadLeft}>
          <img className={styles.cardHeadIcon} src={icon} alt="" />
          <span className={styles.cardHeadTitle}>{title}</span>
          <img className={styles.cardHeadInfo} src={IMG.infoCircle} alt="" />
        </div>
        <div className={styles.cardHeadRight}>
          {toggleActive ? (
            <div className={styles.toggle}>
              {RANGES.map((range) => (
                <div className={cx(styles.toggleSeg, range === toggleActive && styles.toggleSegActive)} key={range}>
                  {range}
                </div>
              ))}
            </div>
          ) : null}
          <div className={styles.playBtn}>
            <img src={IMG.playOutline} alt="" />
          </div>
        </div>
      </div>
      <div className={styles.cardHeadSub}>{subtitle}</div>
    </div>
  );
}

function FunnelBody() {
  return (
    <div className={styles.funnelBody}>
      <div className={styles.funnelChart}>
        <div className={styles.funnelCols}>
          <div className={styles.funnelDivider} />
          {FUNNEL.map((col) => (
            <FunnelColumn col={col} key={col.label} />
          ))}
        </div>
        <div className={styles.funnelSteps}>
          {[1, 2, 3].map((n) => (
            <div className={styles.funnelStep} key={n}>
              <div className={styles.funnelStepCircleWrap}>
                <div className={styles.funnelStepCircle}>{n}</div>
              </div>
              <div className={styles.funnelStepLine} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.funnelRates}>
        <div className={styles.funnelRate}>
          <div className={styles.funnelRateValue}>60%</div>
          <div className={styles.funnelRateLabel}>Conversion to contacts</div>
        </div>
        <div className={styles.funnelRate}>
          <div className={styles.funnelRateValue}>30%</div>
          <div className={styles.funnelRateLabel}>Conversion to calls created</div>
        </div>
      </div>
    </div>
  );
}

function FunnelColumn({ col }: { col: (typeof FUNNEL)[number] }) {
  return (
    <>
      <div className={styles.funnelCol}>
        <div className={styles.funnelColData}>
          <div className={styles.funnelColLabel}>{col.label}</div>
          <div className={styles.funnelColValue}>{col.value}</div>
        </div>
        <div className={cx(styles.funnelGraph, styles[col.graph])}>
          {col.graph === "funnelGraphContacts" ? (
            <div className={styles.funnelBarContacts}>
              <div className={styles.funnelBarContactsTop} />
              <div className={styles.funnelBarContactsBottom} />
            </div>
          ) : (
            <div className={col.graph === "funnelGraphViews" ? styles.funnelBarViews : styles.funnelBarCalls} />
          )}
          <svg className={styles.funnelArea} viewBox={col.viewBox} preserveAspectRatio="none" fill="none">
            <path d={col.d} fill="#EBF5FF" />
          </svg>
        </div>
      </div>
      <div className={styles.funnelDivider} />
    </>
  );
}

function SalesBody() {
  return (
    <div className={styles.salesBody}>
      <div className={styles.salesInner}>
        <div className={styles.salesYaxis}>
          {SALES_Y.map(([label, top]) => (
            <span className={styles.salesYlabel} style={{ top: `${top - 7.6}px` }} key={label}>
              {label}
            </span>
          ))}
        </div>
        <div className={styles.salesPlotcol}>
          <div className={styles.salesPlot}>
            {SALES_GRID.map((top) => (
              <div className={styles.salesGridline} style={{ top: `${top}px` }} key={top} />
            ))}
            <svg
              className={styles.salesSvg}
              viewBox="0 0 430.69 101.534"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient
                  id="productTabsSalesArea"
                  x1="214.204"
                  y1="3.15309"
                  x2="214.204"
                  y2="142.219"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1C64F2" stopOpacity="0.15" />
                  <stop offset="0.998978" stopColor="#1C64F2" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M428.408 101.205V2.28281L351.537 15.9172L282.057 43.476L214.056 51.5987L144.872 57.4005L77.1666 71.0349L0 101.205H428.408Z"
                fill="url(#productTabsSalesArea)"
              />
              <path
                d="M0.380469 100.824L76.8546 71.1476L145.719 57.4507L214.965 51.7437L282.308 43.7539L318.833 29.6765L352.694 15.5992L377.044 11.7945L408.243 6.0875L428.408 2.66328"
                stroke="#233876"
                strokeWidth="1.52187"
              />
              {SALES_POINTS.map(([x, y], i) => (
                <circle cx={x} cy={y} r="3.04375" fill="#233876" key={i} />
              ))}
            </svg>
          </div>
          <div className={styles.salesXaxis}>
            {MONTHS.map((m) => (
              <span className={styles.salesXlabel} key={m}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.salesStats}>
        <div className={cx(styles.salesStat, styles.salesStatRevenue)}>
          <div className={styles.salesStatValue}>$25,120</div>
          <div className={styles.salesStatSub}>
            <span className={styles.salesStatLabel}>Total Revenue</span>
          </div>
        </div>
        {SALES_STATS.map((stat) => (
          <div className={styles.salesStat} key={stat.label}>
            <div className={styles.salesStatValue}>{stat.value}</div>
            <div className={styles.salesStatSub}>
              <span className={styles.salesStatCount}>{stat.count}</span>
              <span className={styles.salesStatLabel}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
