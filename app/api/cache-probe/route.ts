export const dynamic = "force-dynamic";

export function GET() {
  const now = new Date().toISOString();
  return new Response(
    JSON.stringify({
      renderedAt: now,
      note: "If Front Door is honoring s-maxage, repeated requests within 60s should return the same renderedAt and include an Age header.",
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}
