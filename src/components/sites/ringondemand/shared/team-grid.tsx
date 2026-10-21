import { Building2, UserRound } from "lucide-react";

import { LinkGrid } from "../page-kit/link-grid";
import { SITE, TEAM } from "../seo/site";

/** The company page and the team on LinkedIn, in the page kit's link grid. */
export function TeamGrid({ id }: { id: string }) {
  return (
    <LinkGrid
      heading={{
        id,
        eyebrow: "Team",
        heading: { lead: "The people behind", accent: "RingOnDemand" },
        sub: "Find us and the team on LinkedIn.",
      }}
      items={[
        {
          href: SITE.profiles.linkedin,
          icon: Building2,
          title: SITE.name,
          body: "Our company page.",
          more: "View on LinkedIn",
        },
        ...Object.values(TEAM).map((member) => ({
          href: member.linkedin,
          icon: UserRound,
          title: member.name,
          body: member.role,
          more: "View on LinkedIn",
        })),
      ]}
    />
  );
}
