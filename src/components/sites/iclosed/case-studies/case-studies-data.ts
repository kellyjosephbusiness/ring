import { sourceUrl } from "../links";

export type CaseStudy = {
  /** Case-study slug on iclosed.io (/case-studies/<slug>). */
  slug: string;
  org: string;
  name: string;
  quote: string;
  metrics: [stat: string, label: string][];
  photo: { src: string; srcSet: string };
};

const IMG = "/sites/iclosed/images";

/** Rail order as served by the source CMS. */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "stratus-digital",
    org: "Stratus Digital",
    name: "Ali Mustafa",
    quote: "“There’s not really anything else on the market with the same functionality.”",
    metrics: [
      ["−50%", "Cost per lead"],
      ["$30", "Per booked call"],
    ],
    photo: {
      src: `${IMG}/97c8355c6163.avif`,
      srcSet: `${IMG}/6340125745d6.avif 512w, ${IMG}/97c8355c6163.avif 1024w, ${IMG}/c229cf1143b9.avif 1788w`,
    },
  },
  {
    slug: "advertising-co",
    org: "The Advertising Co.",
    name: "George Clements",
    quote: "“If you’re running ads in the agency space and you’re not using iClosed, you’re leaving money on the table.”",
    metrics: [
      ["0 → $100K", "Profit / mo in 3 months"],
      ["$300-400", "Saved / month"],
    ],
    photo: {
      src: `${IMG}/768c0589b645.avif`,
      srcSet: `${IMG}/e9b90289dc83.avif 512w, ${IMG}/768c0589b645.avif 1024w, ${IMG}/67c84cebc357.avif 1800w`,
    },
  },
  {
    slug: "kodara",
    org: "Kodara",
    name: "Lucas Tyson",
    quote: "“Could you run a sales team without iClosed? Absolutely. But it’s literally just leaving money on the table.”",
    metrics: [
      ["Same", "Performance, new ad account"],
      ["~12", "Deals saved from cancelling"],
    ],
    photo: {
      src: `${IMG}/53afb129ef73.avif`,
      srcSet: `${IMG}/e3a30ace65a0.avif 512w, ${IMG}/53afb129ef73.avif 1024w, ${IMG}/772a0b4bcc04.avif 1935w`,
    },
  },
  {
    slug: "realscout",
    org: "RealScout",
    name: "Seth Price",
    quote: "“Capturing the folks who don’t complete the form is huge for us, because we can retarget them.”",
    metrics: [
      ["3×", "Qualified contacts"],
      ["2×", "Sales-qualified leads"],
    ],
    photo: {
      src: `${IMG}/acf4e385b9b1.avif`,
      srcSet: `${IMG}/3aca32731c2b.avif 512w, ${IMG}/acf4e385b9b1.avif 1024w, ${IMG}/f57cea81f8d2.avif 1842w`,
    },
  },
  {
    slug: "les-copywriters",
    org: "Les Copywriters",
    name: "Joseph Atallah",
    quote: "“Without clear data, you can’t scale a business.”",
    metrics: [
      ["€10M+", "Generated since 2021"],
      ["Zero", "Wasted slot"],
    ],
    photo: {
      src: `${IMG}/7a303985d6dc.avif`,
      srcSet: `${IMG}/82b75798a0b5.avif 512w, ${IMG}/7a303985d6dc.avif 740w`,
    },
  },
  {
    slug: "bluehackers",
    org: "BlueHackers",
    name: "Fran Rizzato",
    quote: "“Try it. You recover your investment in less than a month, in two weeks if you sell high-ticket.”",
    metrics: [
      ["6-figures", "Recovered from lost leads"],
      ["2 weeks", "To recover your investment"],
    ],
    photo: {
      src: `${IMG}/2bdc660a53d5.avif`,
      srcSet: `${IMG}/a48f18f54aeb.avif 512w, ${IMG}/2bdc660a53d5.avif 1024w, ${IMG}/7d4600f28cc8.avif 2048w`,
    },
  },
  {
    slug: "ecom-business-club",
    org: "Ecom Business Club",
    name: "Jisk Hogenboom",
    quote:
      "“Calls matter, but everything that happens before the call, if you can capture that too, that’s super valuable.”",
    metrics: [
      ["$10-30K+", "From recovered leads"],
      ["Pre-call", "Everything captured"],
    ],
    photo: {
      src: `${IMG}/8e17add84b21.avif`,
      srcSet: `${IMG}/0f96a75dec39.avif 512w, ${IMG}/8e17add84b21.avif 1024w, ${IMG}/80675b03acfe.avif 2048w`,
    },
  },
  {
    slug: "advizz",
    org: "Advizz",
    name: "Pierre Chenu",
    quote: "“iClosed is by far the best solution on the market, especially for the sales side.”",
    metrics: [
      ["≈20% → ≈40%", "Close rate, team-wide"],
      ["~2×", "Booking rate"],
    ],
    photo: {
      src: `${IMG}/4bcbb46231a6.avif`,
      srcSet: `${IMG}/ba0f40ab2394.avif 512w, ${IMG}/4bcbb46231a6.avif 1024w, ${IMG}/858926b18c79.avif 2048w`,
    },
  },
  {
    slug: "wealthy-expat",
    org: "Wealthy Expat",
    name: "Rafael Cintron",
    quote:
      "“There are a lot of scheduler options out there, but this one just works really well, and I love being able to manage all my leads in one place.”",
    metrics: [
      ["2,953", "Leads captured"],
      ["$10-15K", "From one recovered lead"],
    ],
    photo: {
      src: `${IMG}/a0c175ea4681.avif`,
      srcSet: `${IMG}/278a6f4f97aa.avif 512w, ${IMG}/a0c175ea4681.avif 1024w, ${IMG}/ecd95a8c2c99.avif 2048w`,
    },
  },
  {
    slug: "limitless-nation",
    org: "Limitless Nation",
    name: "Samuel Micko",
    quote: "“If you want to run a high-ticket book-a-call funnel, there’s no better tool than iClosed.”",
    metrics: [
      ["11.7×", "ROAS"],
      ["40", "Calls in one month"],
    ],
    photo: {
      src: `${IMG}/eb9bb4a077f3.avif`,
      srcSet: `${IMG}/b12fefcd6715.avif 512w, ${IMG}/eb9bb4a077f3.avif 1024w, ${IMG}/93922372d493.avif 1672w`,
    },
  },
];

export const caseStudyHref = (slug: string) => sourceUrl(`./case-studies/${slug}`);

export const READ_LABEL = "Read case study →";
