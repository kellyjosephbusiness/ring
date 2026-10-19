import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PracticeAreaPage } from "@/components/sites/ringondemand/legal/practice-area-page";
import {
  PRACTICE_AREAS,
  getPracticeArea,
} from "@/components/sites/ringondemand/legal/practice-areas";

interface LegalAreaPageProps {
  params: Promise<{ area: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PRACTICE_AREAS.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({ params }: LegalAreaPageProps): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) return {};
  return {
    title: area.meta.title,
    description: area.meta.description,
    alternates: { canonical: `/legal/${area.slug}` },
    openGraph: { type: "website", title: area.meta.title, description: area.meta.description },
    twitter: { card: "summary", title: area.meta.title, description: area.meta.description },
  };
}

export default async function LegalAreaPage({ params }: LegalAreaPageProps) {
  const { area: slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) notFound();
  return <PracticeAreaPage area={area} />;
}
