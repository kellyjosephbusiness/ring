import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/** Share images (Open Graph / X cards) for every route, in the closing band's
 * navy with the white logo and the page's two-line headline. Each route's
 * opengraph-image file calls renderOgImage with its own copy. */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const ROOT = process.cwd();
const FONTS = join(ROOT, "src/components/sites/ringondemand/seo/fonts");
const BRAND = join(ROOT, "public/sites/ringondemand");

interface Assets {
  poppins: Buffer;
  inter: Buffer;
  interMedium: Buffer;
  logo: string;
  mark: string;
}

let assets: Promise<Assets> | undefined;

/** Fonts and logos, read once per build. ImageResponse takes TTF, not the
 * site's WOFF2, hence the converted copies in ./fonts. */
function loadAssets(): Promise<Assets> {
  assets ??= Promise.all([
    readFile(join(FONTS, "poppins-500.ttf")),
    readFile(join(FONTS, "inter-400-latin.ttf")),
    readFile(join(FONTS, "inter-500-latin.ttf")),
    readFile(join(BRAND, "brand/logo-white.svg")),
    readFile(join(BRAND, "meta/favicon.svg")),
  ]).then(([poppins, inter, interMedium, logo, mark]) => ({
    poppins,
    inter,
    interMedium,
    logo: `data:image/svg+xml;base64,${logo.toString("base64")}`,
    mark: `data:image/svg+xml;base64,${mark.toString("base64")}`,
  }));
  return assets;
}

export interface OgImageInput {
  eyebrow: string;
  /** One or two lines; the second takes the blue accent, as on the page. */
  headline: readonly [string, string?];
  /** Small line along the bottom. */
  footer?: string;
}

export async function renderOgImage({
  eyebrow,
  headline,
  footer = "Screened inbound calls and live transfers",
}: OgImageInput): Promise<ImageResponse> {
  const { poppins, inter, interMedium, logo, mark } = await loadAssets();
  const [lead, accent] = headline;
  const length = lead.length + (accent?.length ?? 0);
  const fontSize = length > 70 ? 50 : length > 48 ? 58 : 66;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
          backgroundColor: "#05091a",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(28, 100, 242, 0.42) 0%, rgba(28, 100, 242, 0) 55%), linear-gradient(180deg, #0a1329 0%, #05091a 100%)",
          color: "#ffffff",
          fontFamily: "Inter",
        }}
      >
        <img
          src={mark}
          width={360}
          height={360}
          alt=""
          style={{ position: "absolute", right: -20, bottom: -40, opacity: 0.16 }}
        />
        <div style={{ display: "flex" }}>
          <img src={logo} width={308} height={40} alt="RingOnDemand" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexGrow: 1,
            maxWidth: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Inter Medium",
              fontSize: 22,
              letterSpacing: 2.4,
              textTransform: "uppercase",
              color: "#76a9fa",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 22,
              fontFamily: "Poppins",
              fontSize,
              lineHeight: 1.18,
              letterSpacing: -1,
            }}
          >
            <span>{lead}</span>
            {accent ? <span style={{ color: "#76a9fa" }}>{accent}</span> : null}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 28,
            borderTop: "1px solid rgba(255, 255, 255, 0.14)",
            fontSize: 22,
            color: "rgba(255, 255, 255, 0.72)",
          }}
        >
          <span>{footer}</span>
          <span style={{ fontFamily: "Inter Medium", color: "#ffffff" }}>ringondemand.com</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Poppins", data: poppins, weight: 500, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
        { name: "Inter Medium", data: interMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
