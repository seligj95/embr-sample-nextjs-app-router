import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Embr pings this endpoint every minute per docs/embr-yaml-capabilities.md.
// Keep it dependency-free: no DB call, no cache call — just a liveness probe.
// If you want readiness semantics (DB reachable, cache reachable, etc.),
// add a separate /api/ready and point healthCheck.path at it instead.
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
