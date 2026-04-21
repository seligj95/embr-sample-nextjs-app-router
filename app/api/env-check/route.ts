export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    EMBR_SAMPLE_ENV_PROBE: process.env.EMBR_SAMPLE_ENV_PROBE ?? null,
    NODE_ENV: process.env.NODE_ENV ?? null,
    PORT: process.env.PORT ?? null,
    timestamp: new Date().toISOString(),
  });
}
