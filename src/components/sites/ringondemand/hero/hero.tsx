import { START_FREE_URL } from "../links";
import styles from "./hero.module.css";

const IMG = "/sites/iclosed/images";

const FACES = [
  { name: "Iman Gadzhi", src: `${IMG}/04ec1e6d694d.webp` },
  { name: "Alex Becker", src: `${IMG}/d7a1bc5c82b5.webp` },
  { name: "Hunter Dickinson", src: `${IMG}/9172b0f19880.webp` },
  { name: "Jordan Platten", src: `${IMG}/32d741a86b8d.webp` },
  { name: "Matt Gray", src: `${IMG}/dee7b247b94a.webp` },
  { name: "Daniel Dalen", src: `${IMG}/2720d47181b5.webp` },
  { name: "Matt Par", src: `${IMG}/279447db60f5.webp` },
  { name: "Padraig Jordan", src: `${IMG}/6cd0a2fb2e77.webp` },
] as const;

const HEADLINE_LINE_1 = "Triple your leads with";

function Star() {
  return (
    <svg className={styles.star} width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M11.9988 17L6.12099 20.5902L7.71909 13.8906L2.48828 9.40983L9.35381 8.85942L11.9988 2.5L14.6439 8.85942L21.5094 9.40983L16.2786 13.8906L17.8767 20.5902L11.9988 17Z"
        fill="#EAAA45"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className={styles.root} data-section="hero">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowGhost} aria-hidden="true">
                {HEADLINE_LINE_1}
              </span>
              <span className={styles.eyebrowText}>
                Only 3 out of 10 leads book from your scheduler
              </span>
            </p>
            <div className={styles.text}>
              <h1 className={styles.h1}>
                <span>{HEADLINE_LINE_1}</span>
                <span>
                  {" "}
                  <br className={styles.h1Break} />
                  <span className={styles.nowrap}>high-converting</span> Scheduler
                </span>
              </h1>
              <p className={styles.sub}>
                iClosed is the conversion-first scheduler that recovers drop-offs and follows up in
                the right channel to maximize profit.
              </p>
            </div>
            <div className={styles.ctaGroup}>
              <a className={styles.cta} href={START_FREE_URL} target="_blank">
                Start for free →
              </a>
              <p className={styles.micro}>7-day free trial - cancel anytime</p>
            </div>
            <div className={styles.proof}>
              <div className={styles.faces}>
                {FACES.map((face) => (
                  <span key={face.name} className={styles.face} data-name={face.name}>
                    <img className={styles.faceImg} src={face.src} alt={face.name} />
                  </span>
                ))}
              </div>
              <p className={styles.rating}>
                <img className={styles.g2} src={`${IMG}/da84388f60e1.webp`} alt="G2" />
                <span className={styles.stars} aria-hidden="true">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </span>
                <b className={styles.ratingStrong}>5/5 on G2</b>
              </p>
            </div>
          </div>
          <div className={styles.visual}>
            <img
              className={styles.shot}
              src={`${IMG}/fb6236a5cf2d.webp`}
              alt="iClosed scheduler capturing a lead, with a customer testimonial"
              width={990}
              height={977}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
