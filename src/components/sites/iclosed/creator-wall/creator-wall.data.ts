const IMG = "/sites/iclosed/images";

export type Creator = {
  name: string;
  /** Second line under the name (handle, company, follower count). */
  sub?: string;
  /** Category chip in the card's top-left corner. */
  tag?: string;
  photo: string;
};

/** Top row — travels left. Entries are verbatim from the live page,
 * including the cards whose name slot carries a category. */
export const ROW_ONE: readonly Creator[] = [
  { name: "Matt Par", sub: "850k followers", photo: `${IMG}/3536b997dc8b.avif` },
  { name: "Alex Becker", sub: "Hyros.com", tag: "SaaS", photo: `${IMG}/d66cb156787d.avif` },
  { name: "Hunter Dickinson", sub: "Whop.com", tag: "SaaS", photo: `${IMG}/3ec6689d0bb4.avif` },
  { name: "Daniel Dalen", tag: "Info", photo: `${IMG}/b2dd04c824df.avif` },
  { name: "Joel Elster", sub: "Nomadic Closers", tag: "Agency", photo: `${IMG}/03ffa0afd086.avif` },
  { name: "Agency", photo: `${IMG}/72c464852e18.avif` },
  {
    name: "Sam Queen",
    sub: "Chief Revenue Officer - Sendblue",
    tag: "SaaS",
    photo: `${IMG}/26400d310739.avif`,
  },
  { name: "Tony Matusiak", sub: "Founder - Mentor.me", tag: "SaaS", photo: `${IMG}/d7db837ad749.avif` },
  { name: "Sasha Karabut", sub: "Ecomcapital.com", tag: "INFO", photo: `${IMG}/c131558f1056.avif` },
  { name: "Max Kramer", sub: "coachedbytripp.com", tag: "INFO", photo: `${IMG}/ccc3e91a3d6c.avif` },
];

/** Bottom row — travels right. */
export const ROW_TWO: readonly Creator[] = [
  { name: "SaaS", sub: "Founder - Educate.io", photo: `${IMG}/a0760c508199.avif` },
  { name: "Juliette C.", sub: "Ads-with-juliette.com", tag: "Info", photo: `${IMG}/beb560a65222.avif` },
  { name: "Matt Gray", sub: "Founder & CEO - Founder OS", tag: "Info", photo: `${IMG}/792c38b375c4.avif` },
  { name: "Leila Belmahi", sub: "Marinersbow.com", tag: "Agency", photo: `${IMG}/734454b15da2.avif` },
  { name: "Antonio Monteiro", sub: "@antoniomonteiroai", tag: "Info", photo: `${IMG}/10c617b28cfe.avif` },
  { name: "Jordan Platten", sub: "CEO - Affluent Academy", tag: "Info", photo: `${IMG}/686a50a41c4f.avif` },
  { name: "Mikael Dia", sub: "CEO - Funnelytics.io", tag: "SaaS", photo: `${IMG}/600218efc9c4.avif` },
  { name: "Ethan Bence", sub: "4080marketing.com", tag: "CRO", photo: `${IMG}/30ad1c378469.avif` },
  { name: "Tom Rozee", sub: "CEO - Rozee Digital Ltd", photo: `${IMG}/0f5ec6e3dfa3.avif` },
  { name: "Ambro di Pilato ", sub: "Netrevenue.io", tag: "Info", photo: `${IMG}/666fb1fe215e.avif` },
];

export const VERIFIED_BADGE = `${IMG}/creator-wall-verified.svg`;
