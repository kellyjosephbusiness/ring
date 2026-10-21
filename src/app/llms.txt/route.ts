import { llmsIndex } from "@/components/sites/ringondemand/seo/llms";

export const dynamic = "force-static";

/** https://llmstxt.org: the site index for AI assistants. */
export function GET() {
  return new Response(llmsIndex(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
