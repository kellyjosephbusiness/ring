import { Audience } from "@/components/sites/ringondemand/audience/audience";
import { CallSources } from "@/components/sites/ringondemand/call-sources/call-sources";
import { FinalCta } from "@/components/sites/ringondemand/final-cta/final-cta";
import { GENERAL_CTA } from "@/components/sites/ringondemand/final-cta/general-cta";
import { GettingStarted } from "@/components/sites/ringondemand/getting-started/getting-started";
import { Hero } from "@/components/sites/ringondemand/hero/hero";
import { HowItWorks } from "@/components/sites/ringondemand/how-it-works/how-it-works";
import { Industries } from "@/components/sites/ringondemand/industries/industries";
import { Rails } from "@/components/sites/ringondemand/rails/rails";
import { Reporting } from "@/components/sites/ringondemand/reporting/reporting";
import { GENERAL_STATS, Results } from "@/components/sites/ringondemand/results/results";
import { SiteFooter } from "@/components/sites/ringondemand/site-footer/site-footer";
import { SiteHeader } from "@/components/sites/ringondemand/site-header/site-header";

import styles from "./page.module.css";

/** Homepage: what RingOnDemand does across legal and insurance. The legal
 * copy doc's MVA page, pricing and FAQ live on /legal/mva. */
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
        <FinalCta {...GENERAL_CTA} />
        <Rails />
      </main>
      <SiteFooter />
    </>
  );
}
