/** Destinations shared across the iClosed clone. Only the homepage is cloned,
 * so every other page on the source keeps pointing at www.iclosed.io. */
export const SITE_ORIGIN = "https://www.iclosed.io";

export const START_FREE_URL =
  "https://app.iclosed.io/campaign?plan_hash=6ab1b544-5e20-420e-8f21-c3d3a5ed59ea_7_91_7_1_68_StartupMonth";

export const LOGIN_URL = "https://app.iclosed.io/auth/login";

/** Resolves a source-relative path ("./pricing", "/results") to the live site. */
export function sourceUrl(path: string): string {
  const clean = path.replace(/^\.\//, "/").replace(/^([^/])/, "/$1");
  return clean === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${clean}`;
}
