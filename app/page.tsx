import Link from "next/link";
import { HydrationCanary } from "./components/HydrationCanary";

// Force dynamic rendering so this page proves SSR-per-request on Embr.
// Without this Next 15 would static-render a page that has no request-
// dependent inputs, which wouldn't exercise the SSR runtime.
export const dynamic = "force-dynamic";

export default async function Home() {
  const renderedAt = new Date().toISOString();
  const nonce = Math.random().toString(36).slice(2, 10);

  return (
    <>
      <h1>Embr × Next.js (App Router)</h1>
      <p>
        This page is a React Server Component rendered at request time. Refresh
        and watch the timestamp + nonce change — that's proof that Embr is
        running the Node.js runtime per request, not serving static HTML.
      </p>

      <section style={card}>
        <h2>Request-time SSR</h2>
        <p>
          <strong>Rendered at:</strong> <code>{renderedAt}</code>
        </p>
        <p>
          <strong>Nonce:</strong> <code>{nonce}</code>
        </p>
      </section>

      <section style={card}>
        <h2>Hydration canary</h2>
        <p>
          The counter below is a client component. If the number increments
          when you click, React successfully hydrated the SSR tree.
        </p>
        <HydrationCanary />
      </section>

      <section style={card}>
        <h2>Explore</h2>
        <ul>
          <li>
            <Link href="/streaming">/streaming</Link> — Suspense-streamed RSC
            (tests whether the YARP proxy streams or buffers)
          </li>
          <li>
            <Link href="/isr">/isr</Link> — ISR with <code>revalidate = 30</code>
          </li>
          <li>
            <Link href="/api/health">/api/health</Link> — Embr health check
            target
          </li>
        </ul>
      </section>
    </>
  );
}

const card: React.CSSProperties = {
  background: "#141821",
  border: "1px solid #232936",
  borderRadius: 10,
  padding: "1rem 1.25rem",
  margin: "1rem 0",
};
