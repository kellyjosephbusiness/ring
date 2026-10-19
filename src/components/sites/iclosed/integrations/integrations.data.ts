const IMG = "/sites/iclosed/images";

/** Top ticker (travels left): WhatsApp, Messenger, Instagram, Sendblue, Linq,
 * Twilio, JustCall, Gmail, Outlook, HubSpot, ActiveCampaign, Google Calendar,
 * Zapier, Slack. */
export const TICKER_ONE: readonly string[] = [
  "2047bed0501e",
  "f0a91240b956",
  "8a7e8ca1b3be",
  "35288fa2df59",
  "7b3882fb5c50",
  "38a9bef3a0ae",
  "7b22a80e64b9",
  "a4f67455d438",
  "495d3bfc295c",
  "7546144437a0",
  "f67d4cfd60d4",
  "630943d8e4df",
  "4e249ad19e9d",
  "69891d4a5a95",
].map((hash) => `${IMG}/${hash}.webp`);

/** Bottom ticker (travels right): Stripe, Close, Google Ads, HighLevel, Make,
 * Zoom, Pipedrive, HYROS, flame, Meta, M logo, nodes, Webhooks. */
export const TICKER_TWO: readonly string[] = [
  "9a20a70290da",
  "465f09a123a3",
  "975d8bc2e682",
  "ab65f46f8ce6",
  "685db77dd7c2",
  "87c921ee5aa2",
  "1ed30e6a68f9",
  "7db8ce77af96",
  "e50e16c0597f",
  "901cada70e64",
  "abcf3829b9df",
  "373356728376",
  "7afa6b45e731",
].map((hash) => `${IMG}/${hash}.webp`);

/** Each track holds this many copies of its icon list and travels by half of
 * them, so the loop restarts on an identical frame at any viewport width. */
export const PASSES = [0, 1, 2, 3] as const;

export type Partner = {
  name: "Zapier" | "HYROS" | "HighLevel" | "Stripe";
  body: string;
};

export const PARTNERS: readonly Partner[] = [
  { name: "Zapier", body: "Connected to 6000+ other integrations without technical knowledge." },
  { name: "HYROS", body: "Track and optimize ad platforms with sales data in real time." },
  { name: "HighLevel", body: "Trigger GHL sequences from scheduled calls and outcomes." },
  { name: "Stripe", body: "Track deal closed and close rate from new incoming payment." },
];

export const LOGOS = {
  zapierMark: `${IMG}/integrations-zapier-mark.svg`,
  zapierWord: `${IMG}/integrations-zapier-word.svg`,
  hyros: `${IMG}/9473e5d05789.webp`,
  highLevelMark: `${IMG}/e52c709e7c55.webp`,
  highLevelWord: `${IMG}/integrations-highlevel-word.svg`,
  stripe: `${IMG}/integrations-stripe.svg`,
} as const;
