import { Fragment } from "react";

import { START_FREE_URL } from "../links";
import { PipelineBand } from "./pipeline-band";
import { STEPS } from "./pipeline.data";
import styles from "./pipeline.module.css";

/** Dashed elbow dropping from an outer step card and turning toward the centre. */
function ConnectorElbow({ side }: { side: "left" | "right" }) {
  const width = side === "left" ? 429.816 : 441.768;
  const d =
    side === "left"
      ? "M0.5 0V38.8379C0.5 47.6745 7.66344 54.8379 16.5 54.8379H415.669C423.206 54.8379 429.316 60.9481 429.316 68.4854"
      : "M0.5 0V38.8379C0.5 47.6745 7.66344 54.8379 16.5 54.8379H427.621C435.158 54.8379 441.268 60.9481 441.268 68.4854";
  return (
    <svg
      className={styles.connectorSvg}
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} 68.4854`}
      fill="none"
      aria-hidden="true"
    >
      <path className={styles.dash} d={d} stroke="#76A9FA" strokeDasharray="6 6" />
    </svg>
  );
}

/** Centre run with the arrowhead that points into the pill. */
function ConnectorStem() {
  return (
    <svg
      className={styles.connectorSvg}
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      viewBox="0 0 5.7735 98.3955"
      fill="none"
      aria-hidden="true"
    >
      <path className={styles.dash} d="M2.88675 0V90.3955" stroke="#76A9FA" strokeDasharray="6 6" />
      <path d="M2.88675 98.3955L5.7735 93.3955H0L2.88675 98.3955Z" fill="#76A9FA" />
    </svg>
  );
}

function PipelineCopy() {
  return (
    <div className={styles.copy}>
      <p className={styles.eyebrow}>Built for high-ticket closers</p>
      <h2 className={styles.heading}>
        The money’s already
        <br className={styles.brMobile} aria-hidden="true" /> in
        <br className={styles.brDesktop} aria-hidden="true" /> your funnel.
        <br />
        <span className={styles.headingAccent}>Plug in. Take it back.</span>
      </h2>
      <p className={styles.subcopy}>
        One embed on the funnel you already run. Not making more money becomes the hard part.
      </p>
      <a className={styles.cta} href={START_FREE_URL}>
        Recover my pipeline →
      </a>
      <p className={styles.note}>Live in under 10 minutes · No rebuild · Works on top of your funnel</p>
    </div>
  );
}

function PipelineSteps() {
  return (
    <div className={styles.bottom}>
      <div className={styles.steps}>
        {STEPS.map((step, index) => (
          <Fragment key={step.num}>
            {index > 0 ? (
              <span className={styles.plus} aria-hidden="true">
                +
              </span>
            ) : null}
            <div className={styles.step}>
              <p className={styles.stepNum}>{step.num}</p>
              <div className={styles.stepText}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <div className={styles.connectors} aria-hidden="true">
        <div className={styles.connectorLeft}>
          <ConnectorElbow side="left" />
        </div>
        <div className={styles.connectorRight}>
          <ConnectorElbow side="right" />
        </div>
        <div className={styles.connectorMid}>
          <ConnectorStem />
        </div>
      </div>
      <div className={styles.pillRow}>
        <div className={styles.pill}>
          <span className={styles.pillLabel}>SAME TRAFFIC. MORE PROFIT.</span>
        </div>
      </div>
    </div>
  );
}

export function Pipeline() {
  return (
    <div className={styles.outer} data-section="pipeline">
      <div className={styles.base}>
        <PipelineBand copy={<PipelineCopy />} bottom={<PipelineSteps />} />
      </div>
    </div>
  );
}
