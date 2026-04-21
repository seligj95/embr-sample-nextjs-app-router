import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function SlowPanel({
  label,
  delayMs,
}: {
  label: string;
  delayMs: number;
}) {
  await new Promise((r) => setTimeout(r, delayMs));
  return (
    <div style={panel}>
      <strong>{label}</strong> ready after {delayMs} ms at{" "}
      <code>{new Date().toISOString()}</code>
    </div>
  );
}

export default function StreamingPage() {
  return (
    <>
      <h1>Streaming RSC</h1>
      <p>
        Each panel below is an async server component wrapped in its own
        <code>&lt;Suspense&gt;</code> boundary. Next.js streams them as they
        resolve. If Embr's YARP proxy buffers the whole response, you'll see
        everything arrive at once after ~2.5 s. If it streams, panels will
        appear progressively.
      </p>

      <Suspense fallback={<div style={panel}>Panel A — loading…</div>}>
        <SlowPanel label="Panel A" delayMs={500} />
      </Suspense>
      <Suspense fallback={<div style={panel}>Panel B — loading…</div>}>
        <SlowPanel label="Panel B" delayMs={1500} />
      </Suspense>
      <Suspense fallback={<div style={panel}>Panel C — loading…</div>}>
        <SlowPanel label="Panel C" delayMs={2500} />
      </Suspense>
    </>
  );
}

const panel: React.CSSProperties = {
  background: "#141821",
  border: "1px solid #232936",
  borderRadius: 10,
  padding: "1rem 1.25rem",
  margin: "0.75rem 0",
};
