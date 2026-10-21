import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import styles from "@/components/sites/ringondemand/blog/prose.module.css";

/** Site links go through next/link; in-page anchors (#book-a-call) and other
 * sites stay plain links, the latter opening in a new tab. */
function Anchor({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...rest} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

/** Tables scroll sideways on phones instead of widening the page. */
function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className={styles.tableWrap}>
      <table {...props} />
    </div>
  );
}

const components: MDXComponents = {
  a: Anchor,
  table: Table,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
