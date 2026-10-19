import { Audience } from "@/components/sites/ringondemand/audience/audience";
import { CallSources } from "@/components/sites/ringondemand/call-sources/call-sources";
import { Faq } from "@/components/sites/ringondemand/faq/faq";
import { FinalCta } from "@/components/sites/ringondemand/final-cta/final-cta";
import { GettingStarted } from "@/components/sites/ringondemand/getting-started/getting-started";
import { Hero } from "@/components/sites/ringondemand/hero/hero";
import { HowItWorks } from "@/components/sites/ringondemand/how-it-works/how-it-works";
import { Offers } from "@/components/sites/ringondemand/offers/offers";
import { Pricing } from "@/components/sites/ringondemand/pricing/pricing";
import { Rails } from "@/components/sites/ringondemand/rails/rails";
import { Reporting } from "@/components/sites/ringondemand/reporting/reporting";
import { Results } from "@/components/sites/ringondemand/results/results";
import { Screening } from "@/components/sites/ringondemand/screening/screening";
import { SiteFooter } from "@/components/sites/ringondemand/site-footer/site-footer";
import { SiteHeader } from "@/components/sites/ringondemand/site-header/site-header";

import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className={styles.main}>
        <Hero />
        <Offers />
        <HowItWorks />
        <Screening />
        <GettingStarted />
        <Reporting />
        <Audience />
        <CallSources />
        <Results />
        <Pricing />
        <Faq />
        <FinalCta />
        <Rails />
      </main>
      <SiteFooter />
    </>
  );
}
