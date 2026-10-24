import type { MDXContent } from "mdx/types";

import { FinalCta } from "../final-cta/final-cta";
import { GENERAL_CTA } from "../final-cta/general-cta";
import { Divider } from "../page-kit/divider";
import { Eyebrow } from "../page-kit/eyebrow";
import { PageShell } from "../page-shell/page-shell";
import { JsonLd } from "../seo/json-ld";
import { breadcrumbList } from "../seo/schema";
import prose from "../blog/prose.module.css";
import styles from "./policy-page.module.css";

interface PolicyPageProps {
  title: string;
  path: string;
  /** ISO date the text last changed. */
  updatedAt: string;
  Body: MDXContent;
}

/** A policy (privacy, terms): title and date over the blog's reading column.
 * It ends with the booking band like every page, since the header's "Book a
 * call" button jumps to it. */
export function PolicyPage({ title, path, updatedAt, Body }: PolicyPageProps) {
  const updated = new Date(`${updatedAt}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <PageShell>
      <JsonLd data={breadcrumbList([{ name: title, path }])} />
      <article className={styles.article}>
        <header className={styles.header}>
          <Eyebrow>Policies</Eyebrow>
          <h1 className={styles.h1}>{title}</h1>
          <p className={styles.updated}>
            Last updated <time dateTime={updatedAt}>{updated}</time>
          </p>
        </header>
        <Divider />
        <div className={styles.body}>
          <div className={prose.prose}>
            <Body />
          </div>
        </div>
      </article>
      <FinalCta {...GENERAL_CTA} />
    </PageShell>
  );
}
