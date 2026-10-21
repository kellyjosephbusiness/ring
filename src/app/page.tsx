import { Audience } from "@/components/sites/ringondemand/audience/audience";
import { postGridItem } from "@/components/sites/ringondemand/blog/post-grid";
import { CallSources } from "@/components/sites/ringondemand/call-sources/call-sources";
import { Faq } from "@/components/sites/ringondemand/faq/faq";
import { HOME_FAQ } from "@/components/sites/ringondemand/faq/faq-content";
import { FinalCta } from "@/components/sites/ringondemand/final-cta/final-cta";
import { GENERAL_CTA } from "@/components/sites/ringondemand/final-cta/general-cta";
import { GettingStarted } from "@/components/sites/ringondemand/getting-started/getting-started";
import { Hero } from "@/components/sites/ringondemand/hero/hero";
import { HowItWorks } from "@/components/sites/ringondemand/how-it-works/how-it-works";
import { Industries } from "@/components/sites/ringondemand/industries/industries";
import { LinkGrid } from "@/components/sites/ringondemand/page-kit/link-grid";
import { Rails } from "@/components/sites/ringondemand/rails/rails";
import { Reporting } from "@/components/sites/ringondemand/reporting/reporting";
import { GENERAL_STATS, Results } from "@/components/sites/ringondemand/results/results";
import { SiteFooter } from "@/components/sites/ringondemand/site-footer/site-footer";
import { HOME_META } from "@/components/sites/ringondemand/seo/home-meta";
import { pageMetadata } from "@/components/sites/ringondemand/seo/page-metadata";
import { SiteHeader } from "@/components/sites/ringondemand/site-header/site-header";
import { POSTS } from "@/content/blog/posts";

import styles from "./page.module.css";

export const metadata = pageMetadata({ ...HOME_META, path: "/" });

/** Homepage: what RingOnDemand does across legal and insurance, the buyer
 * FAQ and the latest posts. The legal copy doc's MVA page, pricing and FAQ
 * live on /legal/mva. */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className={styles.main}>
        <Hero />
        <Industries />
        <HowItWorks />
        <GettingStarted />
        <Reporting />
        <Audience />
        <CallSources />
        <Results
          heading="Trusted by the largest insurance and legal organizations in the US"
          stats={GENERAL_STATS}
        />
        <Faq heading="Questions buyers ask us" items={HOME_FAQ} />
        <LinkGrid
          heading={{
            id: "blog-heading",
            eyebrow: "Blog",
            heading: { lead: "Guides from", accent: "the blog" },
            sub: "How MVA live transfers, signed cases and insurance calls work, and how to sell your calls.",
          }}
          items={POSTS.slice(0, 3).map(postGridItem)}
        />
        <FinalCta {...GENERAL_CTA} />
        <Rails />
      </main>
      <SiteFooter />
    </>
  );
}
