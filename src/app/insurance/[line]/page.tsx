import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InsuranceLinePage } from "@/components/sites/ringondemand/insurance/insurance-line-page";
import {
  INSURANCE_LINES,
  getInsuranceLine,
} from "@/components/sites/ringondemand/insurance/insurance-lines";
import { pageMetadata } from "@/components/sites/ringondemand/seo/page-metadata";

interface InsuranceLinePageProps {
  params: Promise<{ line: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return INSURANCE_LINES.map((line) => ({ line: line.slug }));
}

export async function generateMetadata({ params }: InsuranceLinePageProps): Promise<Metadata> {
  const { line: slug } = await params;
  const line = getInsuranceLine(slug);
  if (!line) return {};
  return pageMetadata({ ...line.meta, path: `/insurance/${line.slug}` });
}

export default async function InsuranceLineRoute({ params }: InsuranceLinePageProps) {
  const { line: slug } = await params;
  const line = getInsuranceLine(slug);
  if (!line) notFound();
  return <InsuranceLinePage line={line} />;
}
