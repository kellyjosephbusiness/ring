const IMG = "/sites/iclosed/images";

export type Review = {
  /** Quote text before the underlined run (opening quote mark included). */
  pre: string;
  /** Bold, underlined run. */
  bold: string;
  /** Quote text after the run (closing quote mark included). */
  post: string;
  name: string;
  role: string;
  /** Photo; without one the card shows an initials tile. */
  avatar?: string;
};

export const REVIEWS: readonly Review[] = [
  {
    pre: "“",
    bold: "By far the best call booking software",
    post: " and it’s not even close. Blows Calendly out of the water.”",
    name: "Alex Becker",
    role: "CEO, Hyros.com",
    avatar: `${IMG}/30b2ec10355a.webp`,
  },
  {
    pre: "“iClosed is everything you would want in a calendar ",
    bold: "but 10× better for sales teams.",
    post: "”",
    name: "Sam Queen",
    role: "CRO, Sendblue",
    avatar: `${IMG}/062bfaa2ee43.webp`,
  },
  {
    pre: "“Everyone doing ",
    bold: "high-ticket sales funnels is using iClosed.",
    post: "”",
    name: "Hunter Dickson",
    role: "Whop.com",
    avatar: `${IMG}/a0924f01ae81.webp`,
  },
  {
    pre: "“We literally ",
    bold: "8x our lead generation",
    post: ", just by capturing leads before they even book.”",
    name: "Leila Belmahi",
    role: "Marinersbow.com",
    avatar: `${IMG}/195b65748cc7.webp`,
  },
  {
    pre: "“",
    bold: "Anyone doing high-ticket funnels",
    post: " should be using iClosed.”",
    name: "Ethan Bence",
    role: "4080marketing.com",
    avatar: `${IMG}/7c5378a65695.webp`,
  },
  {
    pre: "“I saw my ",
    bold: "calls almost triple in 1 week",
    post: ", without spending my budget on Ads.”",
    name: "Juliette Chanu",
    role: "Meta ads expert",
  },
  {
    pre: "“We’ve been using iClosed for over a year now and pulled in ",
    bold: "$129k JUST from the extra leads",
    post: ".”",
    name: "Kevin Godawski",
    role: "Performance Coaching",
  },
  {
    pre: "“We are ",
    bold: "capturing 2x more leads",
    post: " and my ads are performing better than ever.”",
    name: "George Linf",
    role: "go.wetrade.io",
  },
  {
    pre: "“iClosed finally offers the possibility of having ",
    bold: "real clarity on your Sales KPIs",
    post: ".”",
    name: "Alec Henry",
    role: "CEO, Entrepreneurs.com",
  },
];

export const STAR_ICON = `${IMG}/testimonials-star.svg`;
export const VERIFIED_ICON = `${IMG}/testimonials-verified.svg`;
