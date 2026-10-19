import styles from "./use-cases.module.css";

const IMG = "/sites/iclosed/images";

const PILLS = ["VSL", "Webinar", "Challenge", "Paid social", "Demo & trial"] as const;

type Person = { name: string; src: string };

type UseCase = {
  title: string;
  body: string;
  badgeDark: string;
  badgeBlue: string;
  /** Roster faces, or `null` for the SaaS card, which shows brand marks. */
  faces: readonly Person[] | null;
};

const USE_CASES: readonly UseCase[] = [
  {
    title: "Coaches & Consultants",
    body: "Recover application leads who drop before booking, and only spend your hour on calls worth taking.",
    badgeDark: "VSL & Application",
    badgeBlue: "Funnels",
    faces: [
      { name: "Max Kramer", src: `${IMG}/fb76fb251757.webp` },
      { name: "Tony Matusiak", src: `${IMG}/8350d8f3db1c.webp` },
      { name: "Iman Gadzhi", src: `${IMG}/56b99576e1f4.webp` },
    ],
  },
  {
    title: "Agencies",
    body: "Book more qualified calls per ad dollar for every client — and prove the lift with revenue-per-call data.",
    badgeDark: "Paid-Traffic",
    badgeBlue: "Funnels",
    faces: [
      { name: "Leila Belmahi", src: `${IMG}/aba8a01555ea.webp` },
      { name: "Ethan Bence", src: `${IMG}/b80a1f9fac84.webp` },
      { name: "Mikael Dia", src: `${IMG}/b4d75e6cfa49.webp` },
    ],
  },
  {
    title: "Info & Creators",
    body: "Turn webinar and challenge drop-offs into booked calls, with every real buyer in front of a closer.",
    badgeDark: "Webinar &",
    badgeBlue: "Challenge Funnels",
    faces: [
      { name: "Matt Par", src: `${IMG}/28fd84e35d97.webp` },
      { name: "Sasha Karabut", src: `${IMG}/94a41775c746.webp` },
      { name: "Tom Rozee", src: `${IMG}/6a8c26d6ca49.webp` },
    ],
  },
  {
    title: "SaaS",
    body: "Route every demo request to the right rep, and recover the leads who drop before they book.",
    badgeDark: "Demo &",
    badgeBlue: "Trial Funnels",
    faces: null,
  },
];

function BrandMarks() {
  return (
    <div className={styles.cardFaces}>
      <span className={`${styles.faceRing} ${styles.isLogo}`}>
        <img
          className={`${styles.logoMark} ${styles.isHyros}`}
          src={`${IMG}/728f6a7f9247.webp`}
          alt="HYROS"
        />
      </span>
      <span className={`${styles.faceRing} ${styles.isLogo}`}>
        <img className={styles.logoMark} src={`${IMG}/use-cases-sendblue-mark.svg`} alt="Sendblue" />
      </span>
    </div>
  );
}

export function UseCases() {
  return (
    <div className={styles.outer} data-section="use-cases">
      <div className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.head}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              BUILT AROUND YOUR OFFER
            </p>
            <div className={styles.headText}>
              <h2 className={styles.heading}>
                Coaches, agencies, creators - <br />
                <span className={styles.headingAccent}>Plug in. Take it back.</span>
              </h2>
              <p className={styles.subcopy}>
                If you sell a high-ticket offer, iClosed plugs into the funnel you already run.
              </p>
              <ul className={styles.pills}>
                {PILLS.map((pill) => (
                  <li key={pill} className={styles.pill}>
                    {pill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.cards}>
            {USE_CASES.map((useCase) => (
              <article key={useCase.title} className={styles.card}>
                {useCase.faces ? (
                  <div className={styles.cardFaces}>
                    {useCase.faces.map((person) => (
                      <span key={person.name} className={styles.faceRing}>
                        <img className={styles.face} src={person.src} alt={person.name} />
                      </span>
                    ))}
                  </div>
                ) : (
                  <BrandMarks />
                )}
                <h3 className={styles.cardTitle}>{useCase.title}</h3>
                <p className={styles.cardText}>{useCase.body}</p>
                <p className={styles.cardBadge}>
                  {useCase.badgeDark}{" "}
                  <span className={styles.cardBadgeAccent}>{useCase.badgeBlue}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
