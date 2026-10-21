import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PracticeAreaPage } from "@/components/sites/ringondemand/legal/practice-area-page";
import {
  PRACTICE_AREAS,
  getPracticeArea,
} from "@/components/sites/ringondemand/legal/practice-areas";
import { pageMetadata } from "@/components/sites/ringondemand/seo/page-metadata";

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
  return pageMetadata({ ...area.meta, path: `/legal/${area.slug}` });
}

export default async function LegalAreaPage({ params }: LegalAreaPageProps) {
  const { area: slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) notFound();
  return <PracticeAreaPage area={area} />;
}
