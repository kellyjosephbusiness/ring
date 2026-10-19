import type { ReactNode } from "react";

import { Rails } from "../rails/rails";
import { SiteFooter } from "../site-footer/site-footer";
import { SiteHeader } from "../site-header/site-header";
import styles from "./page-shell.module.css";

/** Header, rails and footer around an interior page. Page heroes carry their
 * own offset under the fixed header, so `main` adds none. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className={styles.main}>
        {children}
        <Rails />
      </main>
      <SiteFooter />
    </>
  );
}
