import styles from "./logo-wall.module.css";

const IMG = "/sites/iclosed/images";

/** `w`/`h` are each mark's design box: the logo is contained within it. */
const LOGOS = [
  { alt: "mindeo", src: `${IMG}/6be55177057c.avif`, w: 91, h: 18.98 },
  { alt: "SamCart", src: `${IMG}/2bceb971e809.avif`, w: 102, h: 30 },
  { alt: "Instantly", src: `${IMG}/logo-wall-instantly.svg`, w: 96, h: 18 },
  { alt: "HYROS", src: `${IMG}/71c577f62bfe.avif`, w: 96, h: 20.03 },
  { alt: "Whop", src: `${IMG}/c29f8fe36e8c.png`, w: 99, h: 17 },
  { alt: "Vidalytics", src: `${IMG}/logo-wall-vidalytics.svg`, w: 105, h: 15 },
  { alt: "wetrade", src: `${IMG}/62704cf3861d.avif`, w: 109, h: 18.95 },
] as const;

export function LogoWall() {
  return (
    <div className={styles.outer} data-section="logo-wall">
      <div className={styles.band}>
        <div className={styles.wrap}>
          <div className={styles.row}>
            {LOGOS.map((logo) => (
              <div key={logo.alt} className={styles.cell}>
                <img
                  className={styles.logo}
                  src={logo.src}
                  alt={logo.alt}
                  style={{ maxWidth: logo.w, maxHeight: logo.h }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
