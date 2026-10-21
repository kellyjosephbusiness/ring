/** Structured data for search engines and AI answer engines, as a native
 * script tag (Next's JSON-LD guide). `<` is escaped so content can never close
 * the tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
