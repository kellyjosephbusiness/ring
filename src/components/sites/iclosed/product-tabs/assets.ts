/** Images and video the four panels draw. The source embeds every one of these
 * as a data URI in its ProductTabs module; they are served from `public/`
 * here. Files shared with other sections keep their hashed names. */
const DIR = "/sites/iclosed/images/product-tabs";

export const IMG = {
  // People
  sara: "/sites/iclosed/images/cb0cdba17d18.webp",
  john: "/sites/iclosed/images/c9a927e9bead.webp",
  joanna: `${DIR}/avatar-joanna.webp`,
  marcus: `${DIR}/avatar-marcus.webp`,
  jess: "/sites/iclosed/images/d07318c9e978.webp",
  jannice: "/sites/iclosed/images/16999a637b5d.webp",
  alex: "/sites/iclosed/images/79e419168921.webp",
  sidebarAvatar: `${DIR}/sidebar-avatar.webp`,

  // iClosed marks
  logo: `${DIR}/iclosed-logo.svg`,
  mark: `${DIR}/iclosed-mark.svg`,

  // Qualify & Route
  checkCircle: `${DIR}/check-circle.svg`,
  flagUs: `${DIR}/flag-us.svg`,
  chevronDown: `${DIR}/chevron-down.svg`,
  chevronLeft: `${DIR}/chevron-left.svg`,
  globe: `${DIR}/globe.svg`,
  metaPixel: `${DIR}/meta-pixel.svg`,
  mailDelivered: `${DIR}/mail-delivered.svg`,
  users: `${DIR}/users.svg`,

  // Measure
  infoCircle: `${DIR}/info-circle.svg`,
  playOutline: `${DIR}/play-outline.svg`,
  navHome: `${DIR}/nav-home.svg`,
  navCalendar: `${DIR}/nav-calendar.svg`,
  navGrid: `${DIR}/nav-grid.svg`,
  navUsers: `${DIR}/nav-users.svg`,
  navMessage: `${DIR}/nav-message.svg`,
  navIntegrations: `${DIR}/nav-integrations.svg`,
  navSettings: `${DIR}/nav-settings.svg`,
  arrowUpGreen: `${DIR}/arrow-up-green.svg`,
  arrowUpSolid: `${DIR}/arrow-up-solid.svg`,
  cardCalendar: `${DIR}/card-calendar.svg`,
  cardPhone: `${DIR}/card-phone.svg`,
  cardDiscount: `${DIR}/card-discount.svg`,
  cardDollar: `${DIR}/card-dollar.svg`,

  // Engage (channels, apps, call recording)
  zoom: `${DIR}/zoom.svg`,
  whatsapp: `${DIR}/whatsapp.svg`,
  imessage: `${DIR}/imessage.svg`,
  twilio: `${DIR}/twilio.svg`,
  gmail: `${DIR}/gmail.svg`,
  instagram: `${DIR}/instagram.svg`,
  messenger: `${DIR}/messenger.svg`,
  closerPoster: `${DIR}/closer-poster.webp`,
  closerThumb: `${DIR}/closer-thumb.webp`,
  leadPoster: `${DIR}/lead-poster.webp`,

  // AI Agent (connector logos + agent marks)
  logoMetaAds: `${DIR}/logo-meta-ads.webp`,
  logoStripe: `${DIR}/logo-stripe.webp`,
  logoGmail: `${DIR}/logo-gmail.webp`,
  logoHubspot: `${DIR}/logo-hubspot.webp`,
  logoGoogleAds: `${DIR}/logo-google-ads.webp`,
  logoSlack: `${DIR}/logo-slack.webp`,
  agentClaude: `${DIR}/agent-claude.svg`,
  agentOpenai: `${DIR}/agent-openai.svg`,
  agentCursor: `${DIR}/agent-cursor.svg`,
} as const;

export const VIDEO = {
  closerLoop: "/sites/iclosed/video/product-tabs-closer-loop.mp4",
  leadLoop: "/sites/iclosed/video/product-tabs-lead-loop.mp4",
} as const;

/** Claude, Codex (OpenAI) and Cursor, in the order the tab and the chat draw them. */
export const AGENT_MARKS = [
  { src: IMG.agentClaude, invert: false },
  { src: IMG.agentOpenai, invert: true },
  { src: IMG.agentCursor, invert: true },
] as const;
