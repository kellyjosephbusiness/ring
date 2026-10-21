import { blogListing } from "@/components/sites/ringondemand/blog/blog-schema";
import { postGridItem, postMeta } from "@/components/sites/ringondemand/blog/post-grid";
import { FinalCta } from "@/components/sites/ringondemand/final-cta/final-cta";
import { GENERAL_CTA } from "@/components/sites/ringondemand/final-cta/general-cta";
import { getPracticeArea } from "@/components/sites/ringondemand/legal/practice-areas";
import { Divider } from "@/components/sites/ringondemand/page-kit/divider";
import { FeatureRow } from "@/components/sites/ringondemand/page-kit/feature-row";
import { LinkGrid } from "@/components/sites/ringondemand/page-kit/link-grid";
import { PageHero } from "@/components/sites/ringondemand/page-kit/page-hero";
import { CriteriaCard } from "@/components/sites/ringondemand/page-kit/visuals";
import { PageShell } from "@/components/sites/ringondemand/page-shell/page-shell";
import { JsonLd } from "@/components/sites/ringondemand/seo/json-ld";
import { pageMetadata } from "@/components/sites/ringondemand/seo/page-metadata";
import { breadcrumbList } from "@/components/sites/ringondemand/seo/schema";
import { POSTS, postHref } from "@/content/blog/posts";

import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Blog: MVA Live Transfers, Pay-Per-Call and Selling Calls | RingOnDemand",
  description:
    "Guides for personal injury firms, insurance agencies and call publishers: MVA live transfers, pre-signed cases, insurance calls and how to sell pay-per-call traffic.",
  path: "/blog",
});

/** The blog index: the lead MVA guide, then every other post. */
export default function BlogPage() {
  const mva = getPracticeArea("mva");
  const featured = POSTS.find((post) => post.topic === "mva") ?? POSTS[0];
  const rest = POSTS.filter((post) => post !== featured);

  return (
    <PageShell>
      <JsonLd data={blogListing(POSTS)} />
      <JsonLd data={breadcrumbList([{ name: "Blog", path: "/blog" }])} />
      <PageHero
        eyebrow="Blog"
        headline={["Pay-Per-Call Guides for", "Law Firms, Agencies and Publishers"]}
        sub="How MVA live transfers, pre-signed cases and insurance calls work, and how to sell your calls, from the team that runs the ads and screens every caller."
      />
      <Divider />
      <FeatureRow
        eyebrow="Featured guide"
        heading={{ lead: featured.title }}
        body={
          <>
            <p>{featured.description}</p>
            <p className={styles.meta}>{postMeta(featured)}</p>
          </>
        }
        cta={{ label: "Read the guide", href: postHref(featured) }}
        visual={mva ? <CriteriaCard label={mva.navLabel} checks={mva.checks} /> : null}
      />
      <Divider />
      <LinkGrid
        heading={{
          id: "all-posts-heading",
          eyebrow: "All posts",
          heading: { lead: "More", accent: "guides" },
          sub: "For personal injury firms, insurance agencies and call publishers.",
        }}
        items={rest.map(postGridItem)}
      />
      <FinalCta {...GENERAL_CTA} />
    </PageShell>
  );
}
