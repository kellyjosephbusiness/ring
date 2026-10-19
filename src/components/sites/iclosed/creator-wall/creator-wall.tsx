import type { CSSProperties } from "react";

import { START_FREE_URL } from "../links";
import { ROW_ONE, ROW_TWO, VERIFIED_BADGE, type Creator } from "./creator-wall.data";
import styles from "./creator-wall.module.css";

/** Each card adds this many seconds to its row's loop, so both rows travel at
 * the same pixels-per-second whatever their card count (10 cards → 60s). */
const SECONDS_PER_CARD = 6;

function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <div className={styles.card}>
      <img className={styles.photo} src={creator.photo} alt="" />
      {creator.tag ? <span className={styles.tag}>{creator.tag}</span> : null}
      <div className={styles.meta}>
        <span className={styles.name}>
          {creator.name}
          <img className={styles.tick} src={VERIFIED_BADGE} alt="" aria-hidden="true" />
        </span>
        {creator.sub ? <span className={styles.sub}>{creator.sub}</span> : null}
      </div>
    </div>
  );
}

/** One marquee row: the card list rendered twice back to back. The tracks
 * translate by exactly one copy (plus the gap between copies), so the loop
 * restarts on an identical frame. */
function MarqueeRow({ creators, direction }: { creators: readonly Creator[]; direction: "left" | "right" }) {
  const rowStyle = { "--duration": `${creators.length * SECONDS_PER_CARD}s` } as CSSProperties;
  return (
    <div
      className={`${styles.row} ${direction === "left" ? styles.rowLeft : styles.rowRight}`}
      style={rowStyle}
      aria-hidden="true"
    >
      {[0, 1].map((copy) => (
        <div key={copy} className={styles.track}>
          {creators.map((creator) => (
            <CreatorCard key={`${copy}-${creator.name}-${creator.photo}`} creator={creator} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CreatorWall() {
  return (
    <div className={styles.outer} data-section="creator-wall">
      <div className={styles.band}>
        <div className={styles.wrap}>
          <div className={styles.root}>
            <div className={styles.headingGroup}>
              <h2 className={styles.heading}>
                You already follow them. <br />
                <span className={styles.headingAccent}>They already run on iClosed.</span>
              </h2>
              <p className={styles.subcopy}>
                The coaches, agencies and closing teams you recognize from your feed run their funnels here — and
                book more of the leads they paid for.
              </p>
            </div>
            <div className={styles.rows}>
              <MarqueeRow creators={ROW_ONE} direction="left" />
              <MarqueeRow creators={ROW_TWO} direction="right" />
            </div>
            <div className={styles.ctaRow}>
              <a className={styles.cta} href={START_FREE_URL}>
                Start for free →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
