import { llmsFull } from "@/components/sites/ringondemand/seo/llms";

export const dynamic = "force-static";

/** The whole site as one Markdown file, for AI assistants. */
export async function GET() {
  return new Response(await llmsFull(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
