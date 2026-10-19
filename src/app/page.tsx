import { ApiSection } from "@/components/sites/iclosed/api/api";
import { CaseStudies } from "@/components/sites/iclosed/case-studies/case-studies";
import { CreatorWall } from "@/components/sites/iclosed/creator-wall/creator-wall";
import { FinalCta } from "@/components/sites/iclosed/final-cta/final-cta";
import { Hero } from "@/components/sites/iclosed/hero/hero";
import { Integrations } from "@/components/sites/iclosed/integrations/integrations";
import { LogoWall } from "@/components/sites/iclosed/logo-wall/logo-wall";
import { Pipeline } from "@/components/sites/iclosed/pipeline/pipeline";
import { ProductBento } from "@/components/sites/iclosed/product-bento/product-bento";
import { Rails } from "@/components/sites/iclosed/rails/rails";
import { ProductTabs } from "@/components/sites/iclosed/product-tabs/product-tabs";
import { SiteFooter } from "@/components/sites/iclosed/site-footer/site-footer";
import { SiteHeader } from "@/components/sites/iclosed/site-header/site-header";
import { TestimonialStrip } from "@/components/sites/iclosed/testimonial-strip/testimonial-strip";
import { Testimonials } from "@/components/sites/iclosed/testimonials/testimonials";
import { UnifiedInbox } from "@/components/sites/iclosed/unified-inbox/unified-inbox";
import { UseCases } from "@/components/sites/iclosed/use-cases/use-cases";

import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className={styles.main}>
        <Hero />
        <TestimonialStrip />
        <LogoWall />
        <ProductTabs />
        <CreatorWall />
        <Pipeline />
        <ProductBento />
        <UnifiedInbox />
        <UseCases />
        <Integrations />
        <ApiSection />
        <Testimonials />
        <CaseStudies />
        <FinalCta />
        <Rails />
      </main>
      <SiteFooter />
    </>
  );
}
